const ServerError = require('../errors/ServerError');
const db = require('../models');
const controller = require('../socketInit');
const {
  findCatalogWithMagic,
  findCatalogsWithMagic,
  conversationsToChatsIds,
} = require('./services/catalog.service');
const {
  findOrCreateConverstion,
  findConversationsByUser,
  updateConversation,
  formatConversation,
  findInterlocutors,
} = require('./services/conversation.service');
const { findMessages } = require('./services/message.service');
const { findUser } = require('./services/user.service');

module.exports.addMessage = async (req, res, next) => {
  const { recipient, messageBody, interlocutor } = req.body;
  const { userId, firstName, lastName, displayName, avatar, email } =
    req.tokenData;

  try {
    const participants = [userId, recipient].sort((a, b) => a - b);
    const conversation = await findOrCreateConverstion(participants);

    const message = await db.Message.create({
      sender: userId,
      body: messageBody,
      conversation: conversation.id,
    });
    message.dataValues.participants = participants;

    const interlocutorId = participants.find((p) => p !== userId);

    const messageData = {
      sender: userId,
      body: messageBody,
      createdAt: message.createdAt,
    };

    const preview = formatConversation(conversation, messageData);

    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        ...preview,
        interlocutor: {
          id: userId,
          firstName,
          lastName,
          displayName,
          avatar,
          email,
        },
      },
    });

    res.status(201).send({ message, preview: { ...preview, interlocutor } });
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  const { interlocutorId } = req.query;
  const { userId } = req.tokenData;

  try {
    const participants = [userId, interlocutorId].sort((a, b) => a - b);
    const messages = await findMessages(participants);
    const interlocutor = await findUser({ id: interlocutorId });

    res.send({
      messages,
      interlocutor: {
        id: interlocutor.id,
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  const { userId } = req.tokenData;
  try {
    const conversations = await findConversationsByUser(userId);

    const formattedConversations = conversations.map((c) =>
      formatConversation(c, c.Messages[0])
    );

    const interlocutors = await findInterlocutors(
      formattedConversations,
      userId
    );

    formattedConversations.forEach((c) => {
      interlocutors.forEach(({ dataValues }) => {
        const { id, firstName, lastName, displayName, avatar } = dataValues;

        if (c.participants.includes(id)) {
          c.interlocutor = { id, firstName, lastName, displayName, avatar };
        }
      });
    });

    res.send(formattedConversations);
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  const { userId } = req.tokenData;
  const { participants, blackListFlag } = req.body;

  const predicate = 'isBlackList' + (participants.indexOf(userId) + 1);
  try {
    const conversation = await updateConversation(
      predicate,
      blackListFlag,
      participants
    );

    const formattedConversation = formatConversation(conversation);

    res.send(formattedConversation);

    const interlocutorId = participants.find((p) => p !== userId);
    controller
      .getChatController()
      .emitChangeBlockStatus(interlocutorId, formattedConversation);
  } catch (err) {
    next(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  const { userId } = req.tokenData;
  const { participants, favoriteFlag } = req.body;

  const predicate = 'isFavorite' + (participants.indexOf(userId) + 1);
  try {
    const conversation = await updateConversation(
      predicate,
      favoriteFlag,
      participants
    );

    const formattedConversation = formatConversation(conversation);

    res.send(formattedConversation);
  } catch (err) {
    next(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  const { userId } = req.tokenData;
  const { catalogName, chatId } = req.body;

  try {
    const catalog = await db.Catalog.create({ userId, catalogName });

    const conversation = await db.Conversation.findByPk(chatId);
    if (!conversation) throw ServerError();

    await catalog.addConversation(conversation);

    catalog.dataValues.chats = [conversation.dataValues];

    res.status(201).send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  const { userId } = req.tokenData;
  const { catalogId } = req.params;
  const { catalogName } = req.body;

  try {
    await db.Catalog.update(
      { catalogName },
      { where: { id: catalogId, userId } }
    );

    const catalog = await findCatalogWithMagic({ id: catalogId });
    conversationsToChatsIds([catalog]);

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  const { catalogId, chatId } = req.params;
  const { userId } = req.tokenData;
  try {
    const catalog = await findCatalogWithMagic({ id: catalogId, userId });

    const chat = await db.Conversation.findByPk(chatId);
    if (!chat) throw ServerError('Chat not found');

    await catalog.addConversation(chat);

    conversationsToChatsIds([catalog], [chat.id]);

    res.status(201).send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  const { catalogId, chatId } = req.params;
  const { userId } = req.tokenData;
  try {
    const catalog = await findCatalogWithMagic({ id: catalogId, userId });

    const chat = await db.Conversation.findByPk(chatId);
    if (!chat) throw ServerError('Chat not found');

    await catalog.removeConversation(chat);

    catalog.dataValues.Conversations = catalog.dataValues.Conversations.filter(
      (conv) => conv.id !== chat.id
    );

    conversationsToChatsIds([catalog]);

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  const { catalogId } = req.params;
  const { userId } = req.tokenData;

  try {
    await db.Catalog.destroy({
      where: { id: catalogId, userId },
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  const { userId } = req.tokenData;
  try {
    const catalogs = await findCatalogsWithMagic({ userId }, [
      'id',
      'catalogName',
    ]);

    conversationsToChatsIds(catalogs);

    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};
