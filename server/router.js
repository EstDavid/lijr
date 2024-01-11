const express = require('express');
const router = express.Router();

const User = require('./models/user');
const Entry = require('./models/entry');
const { GenericAspect } = require('./models/aspects');
const RelationshipAspect = require('./models/aspects/relationship');

// Route to add a user
router.post('/create', async (req, res) => {
  try {
    const { email, password, firstName, birthDate } = req.body;
    const user = new User({ email, password, firstName, birthDate });
    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to edit user details
router.put('/edit/:id', async (req, res) => {
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
});

// Route to add an entry for a user
router.post('/entry/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { entryData } = req.body;
    const entry = new Entry(entryData);
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
});

// Route to add a life aspect for a user
router.post('/aspect/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { aspectData } = req.body;
    // TODO: Refactor aspectData
    const lifeAspect = new GenericAspect(aspectData);
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
});

// Route to add a relationship for a user
router.post('/relationship/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { aspectData } = req.body;
    // TODO: Refactor aspectData
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
});

// Route to delete an entry for a user
router.delete('/entry/:id/:entryId', async (req, res) => {
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
});

// Route to delete a life aspect for a user
router.delete('/aspect/:id/:aspectId', async (req, res) => {
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
});

// Route to delete a life aspect for a user
router.delete('/relationship/:id/:aspectId', async (req, res) => {
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
});

module.exports = router;