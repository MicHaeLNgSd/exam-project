const db = require('../models');
const CONSTANTS = require('../constants');
const {
  CONTEST_STATUS_ACTIVE,
  CONTEST_STATUS_PENDING,
  CONTEST_STATUS_FINISHED,
} = CONSTANTS;

module.exports.createWhereForAllContests = (
  typeIndex,
  contestId,
  industry,
  awardSort,
  statuses = [CONTEST_STATUS_ACTIVE, CONTEST_STATUS_FINISHED]
) => {
  const where = {
    status: {
      [db.Sequelize.Op.or]: statuses,
    },
  };
  if (typeIndex) where.contestType = getPredicateTypes(typeIndex);
  if (contestId) where.id = contestId;
  if (industry) where.industry = industry;

  const order = [];
  if (awardSort) order.push(['prize', awardSort]);
  order.push(['id', 'desc']);

  return { where, order };
};

function getPredicateTypes(index) {
  return { [db.Sequelize.Op.or]: [types[index].split(',')] };
}

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];
