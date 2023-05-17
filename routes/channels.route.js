const { Router } = require('express');
const router = Router();
const {
  addNewChannel,
  getChannels,
  deleteChannel,
} = require('../controllers/channels.controller');

router.post('/', addNewChannel);
router.get('/', getChannels);
router.delete('/:owner_ID', deleteChannel);

module.exports = { channelsRouter: router };
