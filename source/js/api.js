import { showAlert } from './util.js';

const API_URL = 'https://22.javascript.pages.academy/keksobooking';
const DATA_ERROR_MESSAGE = 'Не удалось загрузить данные. Попробуйте позже';

const getData = (onSuccess) => {
  fetch(`${API_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert(DATA_ERROR_MESSAGE)
      }
    })
    .then((json) => {
      onSuccess(json);
    })
    .catch(() => {
      showAlert(DATA_ERROR_MESSAGE)
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(API_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
}

export { getData, sendData };
