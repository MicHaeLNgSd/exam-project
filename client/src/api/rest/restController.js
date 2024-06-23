import http from '../interceptor';

//*CONTEST
export const getCustomersContests = (data) =>
  http.get(`contests/customers`, { params: { ...data } });
// limit, offset, typeIndex, contestId, industry, awardSort, ownEntries,
export const getActiveContests = (data) =>
  http.get(`contests`, { params: { ...data } });
export const getContestById = ({ contestId }) =>
  http.get(`contests/${contestId}`);
export const updateContest = (data) =>
  http.put(`contests/${data.get('contestId')}`, data);

export const dataForContest = (data) =>
  http.post('contests/dataForContest', data);
export const downloadContestFile = (data) =>
  http.get(`contests/downloadFile/${data.fileName}`);
export const setNewOffer = (data) => http.post('contests/setNewOffer', data);
export const setOfferStatus = (data) =>
  http.post('contests/setOfferStatus', data);

//*CHAT
export const newMessage = (data) => http.post('chats/newMessage', data);
export const changeChatBlock = (data) => http.post('chats/blackList', data);
export const changeChatFavorite = (data) => http.post('chats/favorite', data);
export const getDialog = (data) => http.get('chats/', { params: { ...data } });
export const getPreviewChat = () => http.get('chats/preview');

//*CHAT/CATALOG
export const createCatalog = (data) => http.post('chats/catalogs', data);
export const getCatalogList = (data) =>
  http.get('chats/catalogs', { params: { ...data } });

export const changeCatalogName = ({ catalogId, ...data }) =>
  http.put(`chats/catalogs/${catalogId}`, data);
export const deleteCatalog = ({ catalogId, ...data }) =>
  http.delete(`chats/catalogs/${catalogId}`, data);

export const addChatToCatalog = ({ catalogId, chatId }) =>
  http.post(`chats/catalogs/${catalogId}/chat-items/${chatId}`);
export const removeChatFromCatalog = ({ catalogId, chatId }) =>
  http.delete(`chats/catalogs/${catalogId}/chat-items/${chatId}`);

//*USER
export const registerRequest = (data) => http.post('users/registration', data);
export const loginRequest = (data) => http.post('users/login', data);
export const getUser = () => http.get('users/id');
export const getUserTransactions = () => http.get('users/id/transactions');
export const payMent = (data) => http.post('users/pay', data.formData);
export const changeMark = (data) => http.post('users/changeMark', data);
export const updateUser = (data) => http.post('users/updateUser', data);
export const cashOut = (data) => http.post('users/cashout', data);
