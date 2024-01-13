const express = require('express');
const router = express.Router();

const {
  getEntries,
  addEntry,
  editEntry,
  addAspectToEntry,
  removeAspectFromEntry,
  deleteEntry
} = require('../controllers/entries');

router.get('/', getEntries);

router.post('/create', addEntry);

router.put('/:entryId', editEntry);

router.put('/add/aspect/:entryId/:aspectId', addAspectToEntry);

router.put('/remove/aspect/:entryId/:aspectId', removeAspectFromEntry);

router.delete('/:entryId', deleteEntry);

module.exports = router;