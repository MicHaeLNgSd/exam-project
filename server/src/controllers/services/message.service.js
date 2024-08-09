const db = require('../../models');

module.exports.findMessages = async (participants) => {
  const messages = await db.Message.findAll({
    include: [
      {
        model: db.Conversation,
        where: {
          participant1: participants[0],
          participant2: participants[1],
        },
        required: true,
      },
    ],
    order: [['createdAt', 'ASC']],
    attributes: [
      'id',
      'sender',
      'body',
      'conversation',
      'createdAt',
      'updatedAt',
    ],
  });
  return messages;
};
