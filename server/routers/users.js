const express = require('express');
const router = express.Router();

const {
  create,
  editUser,
  addEntryToAspect,
  addAspect,
  addRelationship,
  deleteAspect,
  deleteRelationship
} = require('../controllers/users');

// Route to add a user
router.post('/create', create);

// Route to edit user details
router.put('/edit/:id', editUser);

// Route to add an entry for a user and add it to an aspect
router.post('/entry/:id/:aspectId', addEntryToAspect);

// Route to add a life aspect for a user
router.post('/aspect/:id', addAspect);

// Route to add a relationship for a user
router.post('/relationship/:id', addRelationship);

// Route to delete a life aspect for a user
router.delete('/aspect/:id/:aspectId', deleteAspect);

// Route to delete a life aspect for a user
router.delete('/relationship/:id/:aspectId', deleteRelationship);

module.exports = router;