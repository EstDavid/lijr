const Entry = require('../models/entry');

async function getEntries (req, res) {
  try {
    const { userId } = req.params;

    const entries = await Entry.find(
      { user: userId }
    );
    res.status(201).json({ entries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function editEntry (req, res) {
  try {
    const { id } = req.params;
    const { title, textBody, journaledDate, visibility } = req.body;

    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
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
    const { id, aspectId } = req.params;

    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
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
    const { id, aspectId } = req.params;

    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { $pull: { 'lifeAspects.genericAspects': aspectId } },
      { new: true }
    );
    res.status(201).json({ entry: updatedEntry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getEntries,
  editEntry,
  addAspectToEntry,
  removeAspectFromEntry
};
