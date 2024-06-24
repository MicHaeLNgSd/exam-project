import http from '../interceptor';

//*USERS
export const registerRequest = (data) => http.post('user/registration', data);
export const loginRequest = (data) => http.post('user/login', data);
export const payMent = (data) => http.post('user/pay', data.formData);
export const cashOut = (data) => http.post('user/cashout', data);
export const getUser = () => http.get('user');
export const getUserTransactions = () => http.get('user/transactions');
export const updateUser = (data) => http.put('user', data);
export const changeMark = (data) => http.put('user/changeMark', data);

//*CONTESTS
export const getCustomersContests = (data) =>
  http.get(`contests/customers`, { params: { ...data } });
export const getActiveContests = (data) =>
  http.get(`contests`, { params: { ...data } });
export const getContestById = ({ contestId }) =>
  http.get(`contests/${contestId}`);
export const updateContest = (data) =>
  http.put(`contests/${data.get('contestId')}`, data);

export const dataForContest = (data) => http.post('contests/data', data);
export const downloadContestFile = ({ fileName }) =>
  http.get(`contests/files/${fileName}`);

//*OFFERS
export const setNewOffer = (data) => http.post('offers/', data);
export const setOfferStatus = (data) => http.put('offers/', data);

//*CHATS
export const newMessage = (data) => http.post('chats/newMessage', data);
export const changeChatBlock = (data) => http.post('chats/blackList', data);
export const changeChatFavorite = (data) => http.post('chats/favorite', data);
export const getDialog = (data) => http.get('chats/', { params: { ...data } });
export const getPreviewChat = () => http.get('chats/preview');

//*CHATS/CATALOGS
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
