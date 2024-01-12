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

beforeEach(async () => {
  // Clear the test database before each test
  await User.deleteMany({});
  await Entry.deleteMany({});
  await GenericAspect.deleteMany({});
  await RelationshipAspect.deleteMany({});

  user = new User(user1);
  await user.save();

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
  it('should edit an aspect', async () => {
    const response = await api
      .put(`${aspectsApiPath}/edit/${aspect._id}`)
      .send(aspect2);

    expect(response.statusCode).toBe(201);

    expect(response.body.aspect.title).toEqual(aspect1.title);
    expect(response.body.aspect.description).toEqual(aspect2.description);
    expect(response.body.aspect.visibility).toEqual(aspect2.visibility);
    expect(response.body.aspect.timePeriodStart).toEqual((new Date(aspect2.timePeriodStart).toISOString()));
  });

  it('should add an entry to a life aspect and remove it', async () => {
    const response1 = await api
      .put(`${aspectsApiPath}/entry/add/${aspect._id}/${entry._id}`);

    expect(response1.statusCode).toBe(201);
    expect(response1.body.aspect.entries.length).toBe(1);
    expect(JSON.stringify(response1.body.aspect.entries[0])).toEqual(JSON.stringify(entry._id));

    const response2 = await api
      .put(`${aspectsApiPath}/entry/remove/${aspect._id}/${entry._id}`);

    expect(response2.statusCode).toBe(201);
    expect(response2.body.aspect.entries.length).toBe(0);
  });
});
