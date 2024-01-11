const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const User = require('./models/user');

require('dotenv').config();

const MONGODB_URI = process.env.NODE_ENV === 'TEST'
  ? process.env.MONGODB_URI_TEST
  : process.env.MONGODB_URI;

console.log(`Connecting to MongoDB at ${MONGODB_URI}`);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log(`Error in connection to MongoDB: ${error.message}`);
  });

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.split('')[1], process.env.AUTH_SECRET);
      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
  }
}).then(({ url }) => {
  console.log(`LIJR Server ready at ${url}`);
});