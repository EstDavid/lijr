const { v1: uuid } = require('uuid');
const User = require('./models/user');

let users = [
  {
    _id: '9c66cf0b-64e0-4de9-aade-03dc7f74a4ea',
    createdAt: '2012-10-20',
    updatedAt: '2021-08-05',
    email: 'Blaise_Donnelly35@gmail.com',
    password: '0ytZZin8xekQi3F',
    firstName: 'Phoebe',
    birthDate: '1962-01-11'
  },
  {
    _id: 'fd28a33b-63e7-47c7-8a5f-e9e156d3d6ff',
    createdAt: '2013-02-17',
    updatedAt: '2020-09-11',
    email: 'Lorenz46@yahoo.com',
    password: 'htw5IMGqcMb_puW',
    firstName: 'Otha',
    birthDate: '1991-03-12'
  },
  {
    _id: '37b51089-01e0-415e-8c17-f5360c068681',
    createdAt: '2010-06-27',
    updatedAt: '2022-08-08',
    email: 'Isadore60@hotmail.com',
    password: 'kahEr26eVE0uN2d',
    firstName: 'Sonia',
    birthDate: '1967-05-09'
  }
];

// TODO: Add error handling as in https://fullstackopen.com/en/part8/graph_ql_server#error-handling

const resolvers = {
  Query: {
    userCount: async () => await User.collection.countDocuments(),
    getUserById: async (root, args) => await users.findById(args.userId),
  },
  Mutation: {
    addUser: async (root, args) => {
      const newUser = new User({ ...args });
      return newUser.save();
    }
  }
};

module.exports = resolvers;