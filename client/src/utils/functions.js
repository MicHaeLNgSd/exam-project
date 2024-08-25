import { isEqual } from 'lodash';

/**
 * @param {Array.<object>} arrToSort
 * @param {string} param
 * @param {Array.<string>} orderArr
 * @returns new array sorted by arrToSort.param position in orderArr
 */
export const sortByArr = (arrToSort, param, orderArr) => {
  const array = [...arrToSort];
  array.sort((a, b) => orderArr.indexOf(a[param]) - orderArr.indexOf(b[param]));
  return array;
};

export const findConversationInfo = (messagesPreview, id, interlocutorId) => {
  const participants = [id, interlocutorId].sort((a, b) => a - b);

  const messagePreview = messagesPreview.find((mp) =>
    isEqual(participants, mp.participants)
  );

  if (!messagePreview) return null;

  return {
    id: messagePreview.id,
    participants: messagePreview.participants,
    blackList: messagePreview.blackList,
    favoriteList: messagePreview.favoriteList,
  };
};
