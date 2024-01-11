const express = require('express');
const router = express.Router();

const {
  editAspect,
  addEntryToAspect,
  removeEntryFromAspect
} = require('../controllers/aspects');

router.put('/edit/:id', editAspect);

router.put('/aspect/add/:id/:aspectId', addEntryToAspect);

router.put('/aspect/remove/:id/:aspectId', removeEntryFromAspect);

module.exports = router;