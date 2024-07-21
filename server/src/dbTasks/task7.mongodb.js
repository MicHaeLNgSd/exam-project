use('shm-chat');

db.messages.aggregate([
  { $match: { body: /паровоз/i } },
  { $count: 'messageCount' },
]);
