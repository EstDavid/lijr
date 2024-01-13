const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Entry = require('../models/entry');
const { GenericAspect } = require('../models/aspects');
const RelationshipAspect = require('../models/aspects/relationship');

const saltRounds = 10;

const AUTH_SECRET = process.env.AUTH_SECRET;

async function create (req, res) {
  const { email, password, firstName, birthDate } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  }
  try {
    if (email === '' || password === '') throw new Error();
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ email, password: hashedPassword, firstName, birthDate });

    await newUser.save();
    const token = jwt.sign({ _id: newUser._id }, AUTH_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const token = jwt.sign({ _id: user._id }, AUTH_SECRET);
    res.status(200).send({ token });
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

async function editUser (req, res) {
  try {
    const id = req.params.id;
    const { firstName, birthDate } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { firstName, birthDate } },
      { new: true }
    );
    res.json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addAspectToEntry (req, res) {
  try {
    const { id, entryId } = req.params;

    const {
      title,
      description,
      aspectType,
      visibility,
      timePeriodStart,
      timePeriodEnd
    } = req.body;

    const aspect = new GenericAspect({
      user: id,
      title,
      description,
      aspectType,
      visibility,
      timePeriodStart,
      timePeriodEnd,
      entries: [entryId]
    });

    await aspect.save();
    const user = await User.findByIdAndUpdate(
      id,
      { $push: { 'lifeAspects.genericAspects': aspect._id } },
      { new: true }
    );
    const entry = await Entry.findByIdAndUpdate(
      entryId,
      { $push: { 'lifeAspects.genericAspects': aspect._id } },
      { new: true }
    );
    res.status(201).json({ aspect, user, entry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  create,
  login,
  editUser,
  addAspectToEntry,
};