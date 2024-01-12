const mocks = {
  user1: {
    email: 'john@example.com',
    password: 'password123',
    firstName: 'John',
    birthDate: '01-01-2024'
  },
  user2: {
    email: 'jane@example.com',
    password: 'password123',
    firstName: 'Jane',
    birthDate: '01-01-2016'
  },
  newData: {
    firstName: 'Jane',
    birthDate: '01-01-2022'
  },
  entry1: {
    title: 'My first entry',
    textBody: 'This is my first entry',
  },
  entry2: {
    textBody: 'This is my first entry. And I would like to talk about...',
    visibility: 'friends',
    journaledDate: '05-01-2024'
  },
  aspect1: {
    title: 'Getting a new job',
    description: "I've been thinking a lot lately about getting a new job \n What should I do?",
    aspectType: 'Decisions',
  }
};

module.exports = mocks;