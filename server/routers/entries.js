const express = require('express');
const router = express.Router();

const {
  editEntry,
  addAspectToEntry,
  removeAspectFromEntry
} = require('../controllers/entries');

router.put('/edit/:id', editEntry);

router.put('/aspect/add/:id/:aspectId', addAspectToEntry);

router.put('/aspect/remove/:id/:aspectId', removeAspectFromEntry);

module.exports = router;