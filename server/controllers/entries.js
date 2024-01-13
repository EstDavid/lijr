const { GenericAspect } = require('../models/aspects');
const Entry = require('../models/entry');
const User = require('../models/user');

async function getEntries (req, res) {
  try {
    const { _id } = req.user;

    const entries = await Entry.find(
      { user: _id }
    );
    res.status(201).json({ entries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addEntry (req, res) {
  try {
    const { _id } = req.user;
    const { title, textBody, journaledDate, visibility } = req.body;
    const entry = new Entry({
      user: _id,
      title,
      textBody,
      journaledDate,
      visibility
    });
    await entry.save();
    const user = await User.findByIdAndUpdate(
      _id,
      { $push: { entries: entry._id } },
      { new: true }
    );
    res.status(201).json({ entry, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function editEntry (req, res) {
  try {
    const { _id } = req.user;
    const { entryId } = req.params;
    const { title, textBody, journaledDate, visibility } = req.body;

    const updatedEntry = await Entry.findOneAndUpdate(
      { _id: entryId, user: _id },
      { $set: { title, textBody, journaledDate, visibility } },
      { new: true }
    );
    res.status(201).json({ entry: updatedEntry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addAspectToEntry (req, res) {
  try {
    const { _id } = req.user;
    const { entryId, aspectId } = req.params;

    const updatedEntry = await Entry.findOneAndUpdate(
      { _id: entryId, user: _id },
      { $push: { 'lifeAspects.genericAspects': aspectId } },
      { new: true }
    );
    res.status(201).json({ entry: updatedEntry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function removeAspectFromEntry (req, res) {
  try {
    const { _id } = req.user;
    const { entryId, aspectId } = req.params;

    const updatedEntry = await Entry.findOneAndUpdate(
      { _id: entryId, user: _id },
      { $pull: { 'lifeAspects.genericAspects': aspectId } },
      { new: true }
    );
    res.status(201).json({ entry: updatedEntry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteEntry (req, res) {
  try {
    const { _id } = req.user;
    const { entryId } = req.params;

    await Entry.findOneAndDelete({ _id: entryId, user: _id });

    const user = await User.findByIdAndUpdate(
      id,
      { $pull: { entries: entryId } },
      { new: true }
    );

    await GenericAspect.updateMany(
      {},
      { $pull: { entries: entryId } },
      { new: true }
    );

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getEntries,
  addEntry,
  editEntry,
  addAspectToEntry,
  removeAspectFromEntry,
  deleteEntry
};
