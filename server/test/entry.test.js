const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index'); // Replace with the path to your Express app file

const User = require('../models/user');
const Entry = require('../models/entry');
const { GenericAspect } = require('../models/aspects');
const RelationshipAspect = require('../models/aspects/relationship');
const { user1, entry1, entry2, aspect1 } = require('./mocks');

const api = supertest(app);

const usersApiPath = '/api/users';
const entriesApiPath = '/api/entries';

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

describe('Entry Routes', () => {
  it('should get all entries', async () => {
    const secondEntry = new Entry({ ...entry2, title: 'This is my second Entry', user: user._id });
    await secondEntry.save();
    const thirdEntry = new Entry({ ...entry1, user: 'another-user' });
    await thirdEntry.save();
    const response = await api
      .get(`${entriesApiPath}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(201);

    expect(response.body.entries.length).toBe(2);

    expect(JSON.stringify(response.body.entries[0]._id)).toEqual(JSON.stringify(entry._id));
    expect(JSON.stringify(response.body.entries[1]._id)).toEqual(JSON.stringify(secondEntry._id));

    expect(response.body.entries[0].textBody).toEqual(entry.textBody);
    expect(response.body.entries[1].textBody).toEqual(secondEntry.textBody);
  });

  it('should add an entry for a user', async () => {
    const response = await api
      .post(`${entriesApiPath}/create`)
      .set('Authorization', `Bearer ${token}`)
      .send(entry1);

    expect(response.statusCode).toBe(201);
    expect(response.body.user).toHaveProperty('_id');
    expect(response.body.user.entries.length).toBe(1);

    expect(response.body.entry).toHaveProperty('_id');
    expect(JSON.stringify(response.body.entry.user)).toEqual(JSON.stringify(user._id));
    expect(response.body.entry.title).toEqual(entry1.title);
    expect(response.body.entry.textBody).toEqual(entry1.textBody);
    expect(response.body.entry.visibility).toEqual('private');
    expect(response.body.entry.journaledDate).toBeUndefined();
  });

  it('should edit an Entry', async () => {
    const response = await api
      .put(`${entriesApiPath}/${entry._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(entry2);

    expect(response.statusCode).toBe(201);

    expect(response.body.entry.title).toEqual(entry1.title);
    expect(response.body.entry.textBody).toEqual(entry2.textBody);
    expect(response.body.entry.visibility).toEqual(entry2.visibility);
    expect(response.body.entry.journaledDate).toBe((new Date(entry2.journaledDate).toISOString()));
  });

  it('should add an entry for a user and save it to an aspect', async () => {
    const response = await api
      .post(`${entriesApiPath}/create/${aspect._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(entry1);

    expect(response.statusCode).toBe(201);
    expect(response.body.user.entries.length).toBe(1);
    expect(response.body.aspect.entries.length).toBe(1);
    expect(response.body.entry.lifeAspects.genericAspects.length).toBe(1);

    expect(response.body.entry).toHaveProperty('_id');
    expect(JSON.stringify(response.body.entry.user)).toEqual(JSON.stringify(user._id));
    expect(JSON.stringify(response.body.aspect.entries[0])).toEqual(JSON.stringify(response.body.entry._id));
    expect(JSON.stringify(response.body.entry.lifeAspects.genericAspects[0])).toEqual(JSON.stringify(aspect._id));
    expect(response.body.entry.title).toEqual(entry1.title);
    expect(response.body.entry.textBody).toEqual(entry1.textBody);
  });

  it('should add a life aspect to an entry and remove it', async () => {
    const response1 = await api
      .put(`${entriesApiPath}/add/aspect/${entry._id}/${aspect._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response1.statusCode).toBe(201);
    expect(response1.body.entry.lifeAspects.genericAspects.length).toBe(1);
    expect(JSON.stringify(response1.body.entry.lifeAspects.genericAspects[0])).toEqual(JSON.stringify(aspect._id));

    const response2 = await api
      .put(`${entriesApiPath}/remove/aspect/${entry._id}/${aspect._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response2.statusCode).toBe(201);
    expect(response2.body.entry.lifeAspects.genericAspects.length).toBe(0);
  });
});
