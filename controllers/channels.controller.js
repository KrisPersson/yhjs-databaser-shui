const {
  insertNewChannel,
  getChannelName,
  removeChannel,
  getAllChannels,
  getChannelOwnerID,
  getChannelPrimaryKey
} = require('../models/channels.model');
const { postSubscription } = require('../models/subscriptions.model');
const { getUserPrimaryKey } = require('../models/users.model');

async function addNewChannel(request, response) {
  try {
    const { owner_ID, name } = request.body;
    const userPrimaryKeyExists = await getUserPrimaryKey(owner_ID);
    const channelName = await getChannelName(name);

    if (!channelName && userPrimaryKeyExists) {
      insertNewChannel(userPrimaryKeyExists.ID, name);
      const channelPrimaryKey = await getChannelPrimaryKey(name);

      if (channelPrimaryKey) {
        postSubscription(owner_ID, channelPrimaryKey.ID);
        response.status(200).json({
          success: true,
          message: 'New channel successfully created!',
        });
      }
    } else {
      response.status(404).json({
        success: false,
        message:
          'Channel could not be added. Please check your user id or channel name',
      });
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
