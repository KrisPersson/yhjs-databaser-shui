const {
  insertNewChannel,
  getChannelName,
  removeChannel,
  getAllChannels,
  getChannelOwnerID,
} = require('../models/channels.model');

async function addNewChannel(request, response) {
  try {
    const { owner_ID, name } = request.body;
    const channelName = await getChannelName(name);
    if (!channelName) {
      insertNewChannel(owner_ID, name);
      response
        .status(200)
        .json({ success: true, message: 'New channel successfully created!' });
    } else {
      response
        .status(404)
        .json({ success: false, message: 'Channel already exists' });
    }
  } catch (error) {
    response.status(404).json({ success: false, message: error.message });
  }
}

async function getChannels(request, response) {
  try {
    const channels = await getAllChannels();
    response.status(200).json({ success: true, result: channels });
  } catch (error) {
    response
      .status(404)
      .json({ success: false, error: 'Something went wrong' });
  }
}

async function deleteChannel(request, response) {
  try {
    const { name } = request.body;
    const requestID = +request.params.owner_ID;
    const channelName = await getChannelName(name);
    const channelOwnerID = await getChannelOwnerID(requestID);
    if (channelOwnerID && channelName) {
      removeChannel(channelOwnerID.owner_ID, channelName.name);
      response
        .status(200)
        .json({ success: true, message: 'Channel successfully deleted!' });
    } else {
      response
        .status(404)
        .json({ success: false, message: 'Channel could not be deleted' });
    }
  } catch (error) {
    response
      .status(404)
      .json({ success: false, error: 'Something went wrong' });
  }
}
module.exports = { addNewChannel, getChannels, deleteChannel };
