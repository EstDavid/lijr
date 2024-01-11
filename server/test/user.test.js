const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index'); // Replace with the path to your Express app file

const User = require('../models/user');
const Entry = require('../models/entry');
const { GenericAspect } = require('../models/aspects');
const RelationshipAspect = require('../models/aspects/relationship');
const { user1, newData, entry1, aspect1 } = require('./mocks');

const api = supertest(app);

const usersApiPath = '/api/users';

beforeEach(async () => {
  // Clear the test database before each test
  await User.deleteMany({});
  await Entry.deleteMany({});
  await GenericAspect.deleteMany({});
  await RelationshipAspect.deleteMany({});
});

afterAll(async () => {
  // Disconnect from the test database after all tests
  await mongoose.disconnect();
});

describe('User Routes', () => {
  it('should add a user', async () => {
    const response = await api
      .post(usersApiPath + '/create')
      .send(user1);

    expect(response.statusCode).toBe(201);
    expect(response.body.user).toHaveProperty('_id');
    expect(response.body.user.email).toBe(user1.email);
  });

  it('should edit user details', async () => {
    const user = new User(user1);
    await user.save();
    const { firstName, birthDate } = newData;
    const response = await api
      .put(`${usersApiPath}/edit/${user._id}`)
      .send({
        firstName,
        birthDate
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toHaveProperty('_id');
    expect(response.body.user.firstName).toBe(firstName);
    expect(response.body.user.birthDate).toBe((new Date(birthDate).toISOString()));
  });

  it('should add an entry for a user', async () => {
    const user = new User(user1);
    await user.save();

    const response = await api
      .post(`${usersApiPath}/entry/${user._id}`)
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

  it('should add a life aspect for a user', async () => {
    const user = new User(user1);
    await user.save();

    const response = await api
      .post(`${usersApiPath}/aspect/${user._id}`)
      .send(aspect1);

    expect(response.statusCode).toBe(201);
    expect(response.body.user).toHaveProperty('_id');
    expect(response.body.user.lifeAspects.genericAspects.length).toBe(1);

    expect(response.body.lifeAspect).toHaveProperty('_id');
    expect(JSON.stringify(response.body.lifeAspect.user)).toEqual(JSON.stringify(user._id));
    expect(response.body.lifeAspect.title).toEqual(aspect1.title);
    expect(response.body.lifeAspect.description).toEqual(aspect1.description);
    expect(response.body.lifeAspect.aspectType).toEqual(aspect1.aspectType);
    expect(response.body.lifeAspect.visibility).toEqual('private');
    expect(response.body.lifeAspect.journaledDate).toBeUndefined();
    expect(response.body.lifeAspect.timePeriodStart).toBeUndefined();
    expect(response.body.lifeAspect.timePeriodEnd).toBeUndefined();
  });

  // Add similar tests for 'should add a life aspect for a user', 'should add a relationship for a user',
  // 'should delete an entry for a user', 'should delete a life aspect for a user', and 'should delete a relationship for a user'
});
