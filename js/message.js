import { setUserFormDefaultParameters } from './user-form.js';
import { setFilterFormDefaultParameters } from './filter-form.js';
import { setMapDefaultParameters } from './map.js';

// Объявляем переменные
let errMsgContainerForGetData;
const errMsgContainerForSendData = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const buttonCloseErrMsgContainerForSendData = errMsgContainerForSendData.querySelector('.error__button');
const successMsgContainerForSendData = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

const setDefaultsParameters = (dataFromServer) => {

  const isDataNotEmpty = Object.getOwnPropertyNames(dataFromServer).length > 2;

  setUserFormDefaultParameters('all');
  setMapDefaultParameters();

  if (isDataNotEmpty) {
    setFilterFormDefaultParameters(dataFromServer);
  }
};

const closeGetDataErrMsg = () => {
  errMsgContainerForGetData.remove();
};
const onGetDataErrMsg = (evt) => {
  if (evt.key || evt.type === 'click') {
    evt.preventDefault();
    closeGetDataErrMsg();
    document.removeEventListener('keydown', onGetDataErrMsg);
    document.removeEventListener('click', onGetDataErrMsg);
  }
};
const showGetDataErrMsg = () => {
  // Переменные
  errMsgContainerForGetData = document.createElement('div');

  // Внутренняя логика
  errMsgContainerForGetData.style.zIndex = 100;
  errMsgContainerForGetData.style.position = 'absolute';
  errMsgContainerForGetData.style.left = 0;
  errMsgContainerForGetData.style.top = 0;
  errMsgContainerForGetData.style.right = 0;
  errMsgContainerForGetData.style.padding = '10px 3px';
  errMsgContainerForGetData.style.fontSize = '30px';
  errMsgContainerForGetData.style.textAlign = 'center';
  errMsgContainerForGetData.style.backgroundColor = 'red';
  errMsgContainerForGetData.textContent = 'Не удалось загрузить данные с сервера';

  document.body.append(errMsgContainerForGetData);

  // Внешняя логика
  document.addEventListener('keydown', onGetDataErrMsg);
  document.addEventListener('click', onGetDataErrMsg);
};

const closeSendDataSuccessMsg = () => {
  successMsgContainerForSendData.remove();
};
const onSendDataSuccessMsg = (evt) => {
  // Внешняя логика (или подписка на событие)
  if (evt.key === 'Escape' || evt.type === 'click') {
    closeSendDataSuccessMsg();
    document.removeEventListener('keydown', onSendDataSuccessMsg);
    document.removeEventListener('click', onSendDataSuccessMsg);
  }
};
const showSendDataSuccessMsg = (dataFromServer) => {
  // Внутренняя логика
  document.body.append(successMsgContainerForSendData);
  // Внешняя логика (или подписка на событие)
  document.addEventListener('keydown', onSendDataSuccessMsg);
  document.addEventListener('click', onSendDataSuccessMsg);
  setDefaultsParameters(dataFromServer);
};

const closeSendDataErrMsg = () => {
  // Внутренняя логика
  errMsgContainerForSendData.remove();
};
const onSendDataErrMsg = (evt) => {
  // Внешняя логика (или подписка на событие)
  if (evt.key === 'Escape' || evt.type === 'click') {
    closeSendDataErrMsg();
    buttonCloseErrMsgContainerForSendData.removeEventListener('click', onSendDataErrMsg);
    document.removeEventListener('keydown', onSendDataErrMsg);
    document.removeEventListener('click', onSendDataErrMsg);
  }
};
const showSendDataErrMsg = () => {
  // Внутренняя логика
  document.body.append(errMsgContainerForSendData);
  // Внешняя логика (или подписка на событие)
  document.addEventListener('keydown', onSendDataErrMsg);
  document.addEventListener('click', onSendDataErrMsg);
  buttonCloseErrMsgContainerForSendData.addEventListener('click', onSendDataErrMsg);
};

export { showGetDataErrMsg, showSendDataSuccessMsg, showSendDataErrMsg, setDefaultsParameters};
