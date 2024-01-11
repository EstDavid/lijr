const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index'); // Replace with the path to your Express app file

const User = require('../models/user');
const Entry = require('../models/entry');
const { GenericAspect } = require('../models/aspects');
const RelationshipAspect = require('../models/aspects/relationship');

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
      .send({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        birthDate: '1990-01-01',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.user).toHaveProperty('_id');
    expect(response.body.user.email).toBe('test@example.com');
  });

  it('should edit user details', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      birthDate: '1990-01-01',
    });
    await user.save();

    const response = await api
      .put(`${usersApiPath}/edit/${user._id}`)
      .send({
        firstName: 'Jane',
        birthDate: '1995-02-15',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toHaveProperty('_id');
    expect(response.body.user.firstName).toBe('Jane');
  });

  /*   it('should add an entry for a user', async () => {
      const user = new User({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        birthDate: '1990-01-01',
      });
      await user.save();
  
      const response = await request(app)
        .post(`/entry/${user._id}`)
        .send({
          entryData: {
            // Add entry data properties here
          },
        });
  
      expect(response.statusCode).toBe(201);
      expect(response.body.entry).toHaveProperty('_id');
      expect(response.body.user).toHaveProperty('_id');
      expect(response.body.user.entries.length).toBe(1);
    }); */

  // Add similar tests for 'should add a life aspect for a user', 'should add a relationship for a user',
  // 'should delete an entry for a user', 'should delete a life aspect for a user', and 'should delete a relationship for a user'
});
