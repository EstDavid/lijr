const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const {
  getAspects,
  addAspect,
  addAspectAndAddToEntry,
  editAspect,
  addEntryToAspect,
  removeEntryFromAspect,
  deleteAspect
} = require('../controllers/aspects');

router.get('/', authMiddleware, getAspects);

router.post('/create', authMiddleware, addAspect);

router.post('/create/:entryId', authMiddleware, addAspectAndAddToEntry);

router.put('/:aspectId', authMiddleware, editAspect);

router.put('/add/entry/:aspectId/:entryId', authMiddleware, addEntryToAspect);

router.put('/remove/entry/:aspectId/:entryId', authMiddleware, removeEntryFromAspect);

router.delete('/:aspectId', authMiddleware, deleteAspect);

module.exports = router;