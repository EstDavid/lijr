const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index'); // Replace with the path to your Express app file

const User = require('../models/user');
const Entry = require('../models/entry');
const { GenericAspect } = require('../models/aspects');
const RelationshipAspect = require('../models/aspects/relationship');
const { user1, entry1, entry2, aspect1, aspect2 } = require('./mocks');

const api = supertest(app);

const usersApiPath = '/api/users';
const aspectsApiPath = '/api/aspects';

let user;
let entry;
let aspect;
let token;

beforeEach(async () => {
  // Clear the test database before each test
  await User.deleteMany({});
  await Entry.deleteMany({});
  await GenericAspect.deleteMany({});
  await RelationshipAspect.deleteMany({});

  const response = await api
    .post(`${usersApiPath}/create`)
    .send(user1);

  token = response.body.token;

  user = await User.findOne();

  entry = new Entry({ ...entry1, user: user._id });
  await entry.save();

  aspect = new GenericAspect({ ...aspect1, user: user._id });
  await aspect.save();
});

afterAll(async () => {
  // Disconnect from the test database after all tests and close server
  await mongoose.disconnect();
  app.close();
});

describe('Aspect Routes', () => {
  it('should get all aspects', async () => {
    const secondAspect = new GenericAspect({ ...aspect2, title: 'This is my second Aspect', aspectType: 'Joy', user: user._id });
    await secondAspect.save();
    const thirdAspect = new GenericAspect({ ...aspect1, user: 'another-user' });
    await thirdAspect.save();

    const response = await api
      .get(`${aspectsApiPath}/`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(201);

    expect(response.body.aspects.length).toBe(2);

    expect(JSON.stringify(response.body.aspects[0]._id)).toEqual(JSON.stringify(aspect._id));
    expect(JSON.stringify(response.body.aspects[1]._id)).toEqual(JSON.stringify(secondAspect._id));

    expect(response.body.aspects[0].description).toEqual(aspect.description);
    expect(response.body.aspects[1].description).toEqual(secondAspect.description);
  });

  it('should add a life aspect for a user', async () => {
    const response = await api
      .post(`${aspectsApiPath}/create`)
      .set('Authorization', `Bearer ${token}`)
      .send(aspect1);

    expect(response.statusCode).toBe(201);
    expect(response.body.user).toHaveProperty('_id');
    expect(response.body.user.lifeAspects.genericAspects.length).toBe(1);

    expect(response.body.aspect).toHaveProperty('_id');
    expect(JSON.stringify(response.body.aspect.user)).toEqual(JSON.stringify(user._id));
    expect(response.body.aspect.title).toEqual(aspect1.title);
    expect(response.body.aspect.description).toEqual(aspect1.description);
    expect(response.body.aspect.aspectType).toEqual(aspect1.aspectType);
    expect(response.body.aspect.visibility).toEqual('private');
    expect(response.body.aspect.journaledDate).toBeUndefined();
    expect(response.body.aspect.timePeriodStart).toBeUndefined();
    expect(response.body.aspect.timePeriodEnd).toBeUndefined();
  });

  it('should edit an aspect', async () => {
    const response = await api
      .put(`${aspectsApiPath}/${aspect._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(aspect2);

    expect(response.statusCode).toBe(201);

    expect(response.body.aspect.title).toEqual(aspect1.title);
    expect(response.body.aspect.description).toEqual(aspect2.description);
    expect(response.body.aspect.visibility).toEqual(aspect2.visibility);
    expect(response.body.aspect.timePeriodStart).toEqual((new Date(aspect2.timePeriodStart).toISOString()));
  });

  it('should add a life aspect for a user and save it to an entry', async () => {
    const response = await api
      .post(`${aspectsApiPath}/create/${entry._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(aspect1);

    expect(response.statusCode).toBe(201);
    expect(response.body.user.lifeAspects.genericAspects.length).toBe(1);
    expect(response.body.aspect.entries.length).toBe(1);
    expect(response.body.entry.lifeAspects.genericAspects.length).toBe(1);

    expect(response.body.aspect).toHaveProperty('_id');
    expect(JSON.stringify(response.body.entry.user)).toEqual(JSON.stringify(user._id));
    expect(JSON.stringify(response.body.aspect.entries[0])).toEqual(JSON.stringify(entry._id));
    expect(JSON.stringify(response.body.entry.lifeAspects.genericAspects[0])).toEqual(JSON.stringify(response.body.aspect._id));
    expect(response.body.aspect.description).toEqual(aspect1.description);
    expect(response.body.aspect.aspectType).toEqual(aspect1.aspectType);
  });

  it('should add an entry to a life aspect and remove it', async () => {
    const response1 = await api
      .put(`${aspectsApiPath}/add/entry/${aspect._id}/${entry._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response1.statusCode).toBe(201);
    expect(response1.body.aspect.entries.length).toBe(1);
    expect(JSON.stringify(response1.body.aspect.entries[0])).toEqual(JSON.stringify(entry._id));

    const response2 = await api
      .put(`${aspectsApiPath}/remove/entry/${aspect._id}/${entry._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response2.statusCode).toBe(201);
    expect(response2.body.aspect.entries.length).toBe(0);
  });
});
