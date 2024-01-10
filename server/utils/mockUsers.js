const { faker } = require('@faker-js/faker');

// Function to generate mock date within a range of years
function getRandomDate (startYear, endYear) {
  const startDate = new Date(startYear, 0, 1).getTime();
  const endDate = new Date(endYear, 0, 1).getTime();
  const randomDate = new Date(startDate + Math.random() * (endDate - startDate));
  return randomDate.toISOString().split('T')[0];
}

// Function to generate mock user data
function generateMockUsers (count) {
  const users = [];
  for (let i = 0; i < count; i++) {
    const user = {
      _id: faker.string.uuid(),
      createdAt: getRandomDate(2010, 2023), // Assuming a range of 2010 to 2023 for createdAt
      updatedAt: getRandomDate(2020, 2023), // Assuming a range of 2020 to 2023 for updatedAt
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.firstName(),
      birthDate: getRandomDate(1960, 2000), // Assuming a range of 1960 to 2000 for birthDate
      // Entries: faker.datatype.number({ min: 0, max: 100 }), // Random number of entries
      // LifeAspects: [faker.datatype.uuid(), faker.datatype.uuid()] // Assuming LifeAspects as an array of IDs
    };
    users.push(user);
  }
  return users;
}

// Generating 3 mock users
const mockUsers = generateMockUsers(3);
console.log(mockUsers);
