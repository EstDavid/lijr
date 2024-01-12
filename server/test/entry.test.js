const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index'); // Replace with the path to your Express app file

const User = require('../models/user');
const Entry = require('../models/entry');
const { GenericAspect } = require('../models/aspects');
const RelationshipAspect = require('../models/aspects/relationship');
const { user1, newData, entry1, entry2, aspect1 } = require('./mocks');

const api = supertest(app);

const usersApiPath = '/api/users';
const entriesApiPath = '/api/entries';

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

describe('Entry Routes', () => {
  it('should edit an Entry', async () => {
    const response = await api
      .put(`${entriesApiPath}/edit/${entry._id}`)
      .send(entry2);

    expect(response.statusCode).toBe(201);

    expect(response.body.entry.title).toEqual(entry1.title);
    expect(response.body.entry.textBody).toEqual(entry2.textBody);
    expect(response.body.entry.visibility).toEqual(entry2.visibility);
    expect(response.body.entry.journaledDate).toBe((new Date(entry2.journaledDate).toISOString()));
  });

  it('should add a life aspect to an entry and remove it', async () => {
    const response1 = await api
      .put(`${entriesApiPath}/aspect/add/${entry._id}/${aspect._id}`);

    expect(response1.statusCode).toBe(201);
    expect(response1.body.entry.lifeAspects.genericAspects.length).toBe(1);
    expect(JSON.stringify(response1.body.entry.lifeAspects.genericAspects[0])).toEqual(JSON.stringify(aspect._id));

    const response2 = await api
      .put(`${entriesApiPath}/aspect/remove/${entry._id}/${aspect._id}`);

    expect(response2.statusCode).toBe(201);
    expect(response2.body.entry.lifeAspects.genericAspects.length).toBe(0);
  });
});
