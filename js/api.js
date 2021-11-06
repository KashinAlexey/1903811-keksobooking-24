import { resetForm } from './form.js';
import { SEND_URL, GET_URL } from './constants.js';

// Получение данных с сервера и обработка возможных ошибок
const getData = (onSuccess, onError) => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(`Данные не загружены с сервера ${err}`);
    });
};

// Отправка данных на сервер и обработка возможных ошибок
const sendData = (onSuccess, onError, body) => {
  fetch(SEND_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        resetForm();
        onSuccess();
        return;
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .catch(() => {
      onError();
    });
};

export { getData, sendData };
