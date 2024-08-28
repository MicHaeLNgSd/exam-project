const ServerError = require('../../errors/ServerError');
const db = require('../../models');

module.exports.findOrCreateConverstion = async (participants) => {
  const [conversation] = await db.Conversation.findOrCreate({
    where: {
      participant1: participants[0],
      participant2: participants[1],
    },
    defaults: {
      participant1: participants[0],
      participant2: participants[1],
      isBlackList1: false,
      isBlackList2: false,
      isFavorite1: false,
      isFavorite2: false,
    },
  });
  return conversation;
};

module.exports.findConversationsByUser = async (userId) => {
  const conversations = await db.Conversation.findAll({
    where: {
      [db.Sequelize.Op.or]: [
        { participant1: userId },
        { participant2: userId },
      ],
    },
    include: [
      {
        model: db.Message,
        as: 'Messages',
        order: [['createdAt', 'DESC']],
        limit: 1,
      },
    ],
  });
  return conversations;
};

module.exports.updateConversation = async (predicate, value, participants) => {
  const [updatedCount, [updatedConversation]] = await db.Conversation.update(
    { [predicate]: value },
    {
      where: {
        participant1: participants[0],
        participant2: participants[1],
      },
      returning: true,
    }
  );

  if (!updatedCount) {
    throw new ServerError('conversations with this data dont exist');
  }

  return updatedConversation;
};

/**
 * @param {Conversation} conversation instance of conversation
 * @param {{ sender:number, body:string, createdAt:date }} messageInfo object with message data. If exist adds optional params to return
 * @returns {{id:number,participants:[number,number],blackList:[boolean,boolean], favoriteList:[boolean,boolean], sender?:number, text?:string, createAt?:date}} formatted conversation
 *
 */
module.exports.formatConversation = (conversation, messageInfo = {}) => {
  const {
    id,
    participant1,
    participant2,
    isBlackList1,
    isBlackList2,
    isFavorite1,
    isFavorite2,
  } = conversation;

  const shortData = {
    id,
    participants: [participant1, participant2],
    blackList: [isBlackList1, isBlackList2],
    favoriteList: [isFavorite1, isFavorite2],
  };

  if (messageInfo) {
    const { sender, body, createdAt } = messageInfo;

    const messageData = {
      sender,
      text: body,
      createAt: createdAt,
    };

    return { ...shortData, ...messageData };
  }

  return shortData;
};

module.exports.findInterlocutors = async (conversations, userId) => {
  const interlocutorsIds = conversations.map((c) =>
    c.participants.find((p) => p !== userId)
  );

  const interlocutors = await db.User.findAll({
    where: { id: interlocutorsIds },
    attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
  });

  return interlocutors;
};
