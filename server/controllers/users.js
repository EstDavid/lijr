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
    const accessToken = jwt.sign({ _id: newUser._id }, AUTH_SECRET);
    res.status(201).json({ accessToken });
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
    const accessToken = jwt.sign({ _id: user._id }, AUTH_SECRET);
    res.status(200).send({ accessToken });
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

async function addEntryToAspect (req, res) {
  try {
    const { id, aspectId } = req.params;

    const { title, textBody, journaledDate, visibility } = req.body;
    const entry = new Entry({
      user: id,
      title,
      textBody,
      journaledDate,
      visibility,
      lifeAspects: {
        genericAspects: [aspectId]
      }
    });
    await entry.save();
    const user = await User.findByIdAndUpdate(
      id,
      { $push: { entries: entry._id } },
      { new: true }
    );
    const aspect = await GenericAspect.findByIdAndUpdate(
      aspectId,
      { $push: { entries: entry._id } },
      { new: true }
    );
    res.status(201).json({ entry, user, aspect });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addAspect (req, res) {
  try {
    const id = req.params.id;

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
      timePeriodEnd
    });

    await aspect.save();
    const user = await User.findByIdAndUpdate(
      id,
      { $push: { 'lifeAspects.genericAspects': aspect._id } },
      { new: true }
    );
    res.status(201).json({ aspect, user });
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

async function addRelationship (req, res) {
  try {
    const id = req.params.id;
    const { aspectData } = req.body;
    // TODO: Refactor aspectData for addRelationship
    const lifeAspect = new RelationshipAspect(aspectData);
    await lifeAspect.save();
    const user = await User.findByIdAndUpdate(
      id,
      { $push: { lifeAspects: lifeAspect._id } },
      { new: true }
    );
    res.status(201).json({ lifeAspect, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteAspect (req, res) {
  try {
    const { id, aspectId } = req.params;
    await GenericAspect.findByIdAndDelete(aspectId);

    const user = await User.findByIdAndUpdate(
      id,
      { $pull: { 'lifeAspects.genericAspects': aspectId } },
      { new: true }
    );

    await Entry.updateMany(
      {},
      { $pull: { 'lifeAspects.genericAspects': aspectId } },
      { new: true }
    );

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteRelationship (req, res) {
  try {
    const { id, aspectId } = req.params;
    await RelationshipAspect.findByIdAndDelete(aspectId);
    // TODO: Delete aspect from all entries
    const user = await User.findByIdAndUpdate(
      id,
      { $pull: { lifeAspects: aspectId } },
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  create,
  login,
  editUser,
  addEntryToAspect,
  addAspect,
  addAspectToEntry,
  addRelationship,
  deleteAspect,
  deleteRelationship
};