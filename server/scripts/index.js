require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { GenericAspect } = require('../models/aspects');
const Entry = require('../models/entry');
const { journalEntries, user1 } = require('./mockData');
const mongoose = require('mongoose');

let user;

mongoose.set('strictQuery', false);

const MONGODB_URI = process.env.MONGODB_URI_TEST;

const clearDatabase = async () => {
  console.log(`Connecting to MongoDB at ${MONGODB_URI}`);

  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.log(`Error in connection to MongoDB: ${error.message}`);
    });


  try {
    await User.deleteMany({});
    await GenericAspect.deleteMany({});
    await Entry.deleteMany({});
    console.log('Previous database deleted');
  } catch (error) {
    console.error('Error deleting database', error);
  }
};

const createUser = async () => {
  try {
    const hashedPassword = await bcrypt.hash(user1.password, 10);
    user = new User({ ...user1, password: hashedPassword });
    await user.save();
    console.log('User created successfully.');
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

const createJournalEntries = async () => {
  const entries = journalEntries.map(entry => {
    return { ...entry, user: user._id };
  });
  try {
    await Entry.insertMany(entries);
  } catch (error) {
    console.error('Error creating entries:', error);
  }
};

(async () => {
  await clearDatabase();
  await createUser();
  await createJournalEntries();
  await mongoose.disconnect();
  process.exit();
})();
