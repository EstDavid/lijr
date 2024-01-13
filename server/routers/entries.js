const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const {
  getEntries,
  addEntry,
  editEntry,
  addAspectToEntry,
  removeAspectFromEntry,
  deleteEntry
} = require('../controllers/entries');

router.get('/', authMiddleware, getEntries);

router.post('/create', authMiddleware, addEntry);

router.put('/:entryId', authMiddleware, editEntry);

router.put('/add/aspect/:entryId/:aspectId', authMiddleware, addAspectToEntry);

router.put('/remove/aspect/:entryId/:aspectId', authMiddleware, removeAspectFromEntry);

router.delete('/:entryId', authMiddleware, deleteEntry);

module.exports = router;