const { GenericAspect } = require('../models/aspects');

async function editAspect (req, res) {
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

    const updatedAspect = await GenericAspect.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          aspectType,
          visibility,
          timePeriodStart,
          timePeriodEnd
        }
      },
      { new: true }
    );
    res.status(201).json({ aspect: updatedAspect });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addEntryToAspect (req, res) {
  try {
    const { id, entryId } = req.params;

    const updatedAspect = await GenericAspect.findByIdAndUpdate(
      id,
      { $push: { entries: entryId } },
      { new: true }
    );
    res.status(201).json({ aspect: updatedAspect });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function removeEntryFromAspect (req, res) {
  try {
    const { id, entryId } = req.params;

    const updatedAspect = await GenericAspect.findByIdAndUpdate(
      id,
      { $pull: { entries: entryId } },
      { new: true }
    );
    res.status(201).json({ aspect: updatedAspect });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  editAspect,
  addEntryToAspect,
  removeEntryFromAspect
};