const mongoose = require('mongoose');
const supertest = require('supertest');
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

beforeEach(async () => {
  // Clear the test database before each test
  await User.deleteMany({});
  await Entry.deleteMany({});
  await GenericAspect.deleteMany({});
  await RelationshipAspect.deleteMany({});

  user = new User(user1);
  await user.save();
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
    expect(response.body.user).toHaveProperty('_id');
    expect(response.body.user.email).toBe(user2.email);
  });

  it('should hash user password', async () => {
    const response = await api
      .post(usersApiPath + '/create')
      .send(user2);

    expect(response.statusCode).toBe(201);

    const passwordCheck = await bcrypt.compare(user2.password, response.body.user.password);
    expect(passwordCheck).toBe(true);
  });

  it('should edit user details', async () => {
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
});

describe('User entries and life aspects', () => {
  it('should add an entry for a user', async () => {
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
    const response = await api
      .post(`${usersApiPath}/aspect/${user._id}`)
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

  it('should add an entry for a user and save it to an aspect', async () => {
    const aspect = new GenericAspect({ ...aspect1, user: user._id });
    await aspect.save();

    const response = await api
      .post(`${usersApiPath}/entry/${user._id}/${aspect._id}`)
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

  it('should add a life aspect for a user and save it to an entry', async () => {
    const entry = new Entry({ ...entry1, user: user._id });
    await entry.save();

    const response = await api
      .post(`${usersApiPath}/aspect/${user._id}/${entry._id}`)
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

  it('should delete an entry for a user and remove it from the aspects linking to it', async () => {
    const aspect = new GenericAspect({ ...aspect1, user: user._id });
    await aspect.save();

    const response1 = await api
      .post(`${usersApiPath}/entry/${user._id}/${aspect._id}`)
      .send(entry1);

    expect(response1.statusCode).toBe(201);
    expect(response1.body.user.entries.length).toBe(1);
    expect(response1.body.aspect.entries.length).toBe(1);
    expect(response1.body.entry.lifeAspects.genericAspects.length).toBe(1);

    expect(JSON.stringify(response1.body.entry.user)).toEqual(JSON.stringify(user._id));
    expect(JSON.stringify(response1.body.aspect.entries[0])).toEqual(JSON.stringify(response1.body.entry._id));
    expect(JSON.stringify(response1.body.entry.lifeAspects.genericAspects[0])).toEqual(JSON.stringify(aspect._id));

    const response2 = await api
      .delete(`${usersApiPath}/entry/${user._id}/${response1.body.entry._id}`);

    const updatedAspect = await GenericAspect.findById(aspect._id);

    expect(response2.statusCode).toBe(200);
    expect(response2.body.user.entries.length).toBe(0);
    expect(updatedAspect.entries.length).toBe(0);
  });

  it('should delete an aspect for a user and remove it from the entries linking to it', async () => {
    const entry = new Entry({ ...entry1, user: user._id });
    await entry.save();

    const response1 = await api
      .post(`${usersApiPath}/aspect/${user._id}/${entry._id}`)
      .send(aspect1);

    expect(response1.statusCode).toBe(201);
    expect(response1.body.user.lifeAspects.genericAspects.length).toBe(1);
    expect(response1.body.entry.lifeAspects.genericAspects.length).toBe(1);
    expect(response1.body.aspect.entries.length).toBe(1);

    expect(JSON.stringify(response1.body.entry.user)).toEqual(JSON.stringify(user._id));
    expect(JSON.stringify(response1.body.aspect.entries[0])).toEqual(JSON.stringify(entry._id));
    expect(JSON.stringify(response1.body.entry.lifeAspects.genericAspects[0])).toEqual(JSON.stringify(response1.body.aspect._id));

    const response2 = await api
      .delete(`${usersApiPath}/aspect/${user._id}/${response1.body.aspect._id}`);

    const updatedEntry = await Entry.findById(entry._id);

    expect(response2.statusCode).toBe(200);
    expect(response2.body.user.lifeAspects.genericAspects.length).toBe(0);
    expect(updatedEntry.lifeAspects.genericAspects.length).toBe(0);
  });
});
