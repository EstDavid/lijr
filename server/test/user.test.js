const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');

const api = supertest(app);

test('/ returs Hello world', async () => {
  await api
    .get('/')
    .expect(200);
  // .expect('Content-Type', /application\/json/);
});

afterAll(async () => {
  await mongoose.connection.close();
});