const Entry = require('../models/entry');

async function editEntry (req, res) {
  try {
    const id = req.params.id;
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
  editEntry,
  addAspectToEntry,
  removeAspectFromEntry
};
