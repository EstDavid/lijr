const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = require('../index'); // Replace with the path to your Express app file

const User = require('../models/user');
const Entry = require('../models/entry');
const { GenericAspect } = require('../models/aspects');
const RelationshipAspect = require('../models/aspects/relationship');
const { user1, newData, entry1, aspect1, user2 } = require('./mocks');

const api = supertest(app);

const usersApiPath = '/api/users';

let user;
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
});

afterAll(async () => {
  // Disconnect from the test database after all tests
  await mongoose.disconnect();
  app.close();
});

describe('User Routes', () => {
  it('should add a user', async () => {
    const response = await api
      .post(usersApiPath + '/create')
      .send(user2);

    expect(response.statusCode).toBe(201);

    const { token, user } = response.body;

    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    expect(decoded).toHaveProperty('_id');

    expect(user).toHaveProperty('_id');
    expect(user.email).toBe(user2.email);
    expect(user.firstName).toBe(user2.firstName);
  });

  it('should hash user password', async () => {
    const response = await api
      .post(usersApiPath + '/create')
      .send(user2);

    expect(response.statusCode).toBe(201);

    const token = response.body.token;
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);

    const savedUser = await User.findById(decoded._id);

    const passwordCheck = await bcrypt.compare(user2.password, savedUser.password);
    expect(passwordCheck).toBe(true);
  });

  it('should login a user', async () => {
    const response = await api
      .post(usersApiPath + '/create')
      .send(user2);

    expect(response.statusCode).toBe(201);

    const { token, user } = response.body;

    const decoded = jwt.verify(token, process.env.AUTH_SECRET);

    const savedUser = await User.findById(decoded._id);
    expect(decoded._id).toEqual(savedUser._id.toString());

    expect(user).toHaveProperty('_id');
    expect(user.email).toBe(user2.email);
    expect(user.firstName).toBe(user2.firstName);
  });

  it('should edit user details', async () => {
    const { firstName, birthDate } = newData;
    const response = await api
      .put(`${usersApiPath}/edit`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName,
        birthDate
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toHaveProperty('_id');
    expect(response.body.user.firstName).toBe(firstName);
    expect(response.body.user.birthDate).toBe((new Date(birthDate).toISOString()));
  });
});

