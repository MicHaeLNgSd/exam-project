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

//*CHAT
export const newMessage = (data) => http.post('chats/newMessage', data);
export const getDialog = (data) => http.post('chats/getChat', data);
export const getPreviewChat = () => http.post('chats/getPreview');
export const changeChatBlock = (data) => http.post('chats/blackList', data);
export const changeChatFavorite = (data) => http.post('chats/favorite', data);
export const createCatalog = (data) => http.post('chats/createCatalog', data);
export const deleteCatalog = (data) => http.post('chats/deleteCatalog', data);
export const changeCatalogName = (data) =>
  http.post('chats/updateNameCatalog', data);
export const addChatToCatalog = (data) =>
  http.post('chats/addNewChatToCatalog', data);
export const removeChatFromCatalog = (data) =>
  http.post('chats/removeChatFromCatalog', data);
export const getCatalogList = (data) => http.post('chats/getCatalogs', data);

//*REST
export const registerRequest = (data) => http.post('registration', data);
export const loginRequest = (data) => http.post('login', data);
export const getUser = () => http.post('getUser');
export const setNewOffer = (data) => http.post('setNewOffer', data);
export const setOfferStatus = (data) => http.post('setOfferStatus', data);
export const downloadContestFile = (data) =>
  http.get(`downloadFile/${data.fileName}`);
export const payMent = (data) => http.post('pay', data.formData);
export const changeMark = (data) => http.post('changeMark', data);
export const dataForContest = (data) => http.post('dataForContest', data);
export const cashOut = (data) => http.post('cashout', data);
export const updateUser = (data) => http.post('updateUser', data);
