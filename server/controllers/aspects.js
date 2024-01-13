const { GenericAspect } = require('../models/aspects');
const Entry = require('../models/entry');
const User = require('../models/user');

async function getAspects (req, res) {
  try {
    const { _id } = req.user;

    const aspects = await GenericAspect.find(
      { user: _id }
    );
    res.status(201).json({ aspects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addAspect (req, res) {
  try {
    const { _id } = req.user;

    const {
      title,
      description,
      aspectType,
      visibility,
      timePeriodStart,
      timePeriodEnd
    } = req.body;

    const aspect = new GenericAspect({
      user: _id,
      title,
      description,
      aspectType,
      visibility,
      timePeriodStart,
      timePeriodEnd
    });

    await aspect.save();
    const user = await User.findByIdAndUpdate(
      _id,
      { $push: { 'lifeAspects.genericAspects': aspect._id } },
      { new: true }
    );
    res.status(201).json({ aspect, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addAspectAndAddToEntry (req, res) {
  try {
    const { _id } = req.user;
    const { entryId } = req.params;

    const {
      title,
      description,
      aspectType,
      visibility,
      timePeriodStart,
      timePeriodEnd
    } = req.body;

    const aspect = new GenericAspect({
      user: _id,
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
      _id,
      { $push: { 'lifeAspects.genericAspects': aspect._id } },
      { new: true }
    );
    const entry = await Entry.findOneAndUpdate(
      { _id: entryId, user: _id },
      { $push: { 'lifeAspects.genericAspects': aspect._id } },
      { new: true }
    );

    res.status(201).json({ aspect, user, entry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function editAspect (req, res) {
  try {
    const { _id } = req.user;
    const { aspectId } = req.params;

    const {
      title,
      description,
      aspectType,
      visibility,
      timePeriodStart,
      timePeriodEnd
    } = req.body;

    const updatedAspect = await GenericAspect.findOneAndUpdate(
      { _id: aspectId, user: _id },
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
    const { _id } = req.user;
    const { aspectId, entryId } = req.params;

    const updatedAspect = await GenericAspect.findOneAndUpdate(
      { _id: aspectId, user: _id },
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
    const { _id } = req.user;
    const { aspectId, entryId } = req.params;

    const updatedAspect = await GenericAspect.findOneAndUpdate(
      { _id: aspectId, user: _id },
      { $pull: { entries: entryId } },
      { new: true }
    );
    res.status(201).json({ aspect: updatedAspect });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteAspect (req, res) {
  try {
    const { _id } = req.user;
    const { aspectId } = req.params;
    await GenericAspect.findByIdAndDelete(aspectId);

    const user = await User.findByIdAndUpdate(
      _id,
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

module.exports = {
  getAspects,
  addAspect,
  addAspectAndAddToEntry,
  editAspect,
  addEntryToAspect,
  removeEntryFromAspect,
  deleteAspect
};