import { showSendDataSuccessMsg, showSendDataErrMsg } from './message.js';
import { GET_URL, SEND_URL } from './constants.js';

const getData = (onSuccessGetData, onErrorGetData) => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .then((dataFromServer) => {
      onSuccessGetData(dataFromServer);
    })
    .catch(() => {
      onErrorGetData();
    });
}; // OK

const sendData = (body, dataFromServer) => {
  fetch(SEND_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        showSendDataSuccessMsg(dataFromServer);
        return;
      }

      throw new Error();
    })
    .catch(() => {
      showSendDataErrMsg();
    });
}; // OK

export { getData, sendData };
