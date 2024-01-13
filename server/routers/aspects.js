const express = require('express');
const router = express.Router();

const {
  getAspects,
  editAspect,
  addEntryToAspect,
  removeEntryFromAspect
} = require('../controllers/aspects');

router.get('/:userId', getAspects);

router.put('/edit/:id', editAspect);

router.put('/entry/add/:id/:entryId', addEntryToAspect);

router.put('/entry/remove/:id/:entryId', removeEntryFromAspect);

module.exports = router;