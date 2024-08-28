const db = require('../../models');
const ServerError = require('../../errors/ServerError');

module.exports.findCatalogWithMagic = async (predicate, attributes) => {
  const catalog = await db.Catalog.findOne({
    where: predicate,
    attributes,
    include: [
      {
        model: db.Conversation,
        through: { attributes: [] },
      },
    ],
  });
  if (!catalog) throw new ServerError('Catalog not found');
  return catalog;
};

module.exports.findCatalogsWithMagic = async (predicate, attributes) => {
  const catalogs = await db.Catalog.findAll({
    where: predicate,
    attributes,
    include: [
      {
        model: db.Conversation,
        through: { attributes: [] },
      },
    ],
  });
  if (!catalogs) throw new ServerError('Catalogs not found');
  return catalogs;
};

module.exports.conversationsToChatsIds = (magicCatalogs, readyChatIds = []) => {
  magicCatalogs.forEach((c) => {
    if (!c.dataValues.Conversations)
      throw new ServerError('Catalogs doesn`t have Conversations');

    c.dataValues.chats = [
      ...c.dataValues.Conversations.map((conv) => conv.id),
      ...readyChatIds,
    ];
    delete c.dataValues.Conversations;
  });
};
