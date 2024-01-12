const User = require('../models/user');
const Entry = require('../models/entry');
const { GenericAspect } = require('../models/aspects');
const RelationshipAspect = require('../models/aspects/relationship');

async function createUser (req, res) {
  try {
    const { email, password, firstName, birthDate } = req.body;
    const user = new User({ email, password, firstName, birthDate });
    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

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

async function addEntry (req, res) {
  try {
    const id = req.params.id;
    const { title, textBody, journaledDate, visibility } = req.body;
    const entry = new Entry({
      user: id,
      title,
      textBody,
      journaledDate,
      visibility
    });
    await entry.save();
    const user = await User.findByIdAndUpdate(
      id,
      { $push: { entries: entry._id } },
      { new: true }
    );
    res.status(201).json({ entry, user });
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

async function deleteEntry (req, res) {
  try {
    const { id, entryId } = req.params;
    await Entry.findByIdAndDelete(entryId);
    const user = await User.findByIdAndUpdate(
      id,
      { $pull: { entries: entryId } },
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteAspect (req, res) {
  try {
    const { id, aspectId } = req.params;
    await GenericAspect.findByIdAndDelete(aspectId);
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
  createUser,
  editUser,
  addEntry,
  addEntryToAspect,
  addAspect,
  addAspectToEntry,
  addRelationship,
  deleteEntry,
  deleteAspect,
  deleteRelationship
};