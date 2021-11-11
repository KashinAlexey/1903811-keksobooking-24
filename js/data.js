import { activationFilterForm } from './filter-form.js';
import { showGetDataErrMsg, showSendDataSuccessMsg, showSendDataErrMsg } from './message.js';
import { GET_URL, SEND_URL } from './constants.js';
import { activationUserForm } from './user-form.js';

const getData = () => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .then((dataIn) => {
      activationFilterForm(dataIn);
      activationUserForm(dataIn);
    })
    .catch(() => {
      showGetDataErrMsg();
      activationUserForm([{}]);
    });
}; // OK

const sendData = (body, dataIn) => {
  fetch(SEND_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        showSendDataSuccessMsg(dataIn);
        return;
      }

      throw new Error();
    })
    .catch(() => {
      showSendDataErrMsg();
    });
}; // OK

export { getData, sendData};
