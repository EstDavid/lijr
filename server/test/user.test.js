const mongoose = require('mongoose');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const request = require('supertest');
require('dotenv').config();

const User = require('../models/user'); // Import your Mongoose User model

const typeDefs = require('../schema');
const resolvers = require('../resolvers');
const mocks = require('./mocks');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

let url;

// Connect to the test database
beforeAll(async () => {
  console.log(process.env.MONGODB_URI_TEST);
  await mongoose.connect(process.env.MONGODB_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const serverInstance = await startStandaloneServer(server, {
    listen: { port: 4003 },
    // context: async ({ req, res }) => {
    //   const auth = req ? req.headers.authorization : null;
    //   if (auth && auth.startsWith('Bearer ')) {
    //     const decodedToken = jwt.verify(auth.split('')[1], process.env.AUTH_SECRET);
    //     const currentUser = await User.findById(decodedToken.id);

    //     return { currentUser };
    //   }
    // }
  });

  url = serverInstance.url;
  console.log(`LIJR test server ready at ${url}`);
});

// Disconnect from the test database after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await server?.stop();
});

// Define your GraphQL mutation to add a user
const ADD_USER_MUTATION = `mutation AddUser($email: String!, $password: String!, $firstName: String!, $birthDate: String!) {
        addUser(email: $email, password: $password, firstName: $firstName, birthDate: $birthDate) {
          _id
          email
          password
          firstName
          birthDate
        }
      }`;

describe('Add User Mutation', () => {
  // Clear the test database before each test
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should add a user to the database', async () => {
    // Define the input for your mutation
    const user = mocks.user1;

    const queryData = {
      query: ADD_USER_MUTATION,
      variables: { ...user }
    };

    const response = await request(url).post('/').send(queryData);

    // Check if the user was added to the database
    expect(response.errors).toBeUndefined();
    expect(response.body.data?.addUser).toEqual({
      _id: expect.any(String),
      email: user.email,
      password: expect.any(String),
      firstName: user.firstName,
      birthDate: (new Date(user.birthDate).getTime()).toString()
    });

    // Check if the user exists in the database
    const userInDatabase = await User.findOne({ email: user.email });
    expect(userInDatabase).toBeTruthy();
  });
});
