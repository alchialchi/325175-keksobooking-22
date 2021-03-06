import { isEscEvent } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const messageSuccess = successTemplate.cloneNode(true);
const messageError = errorTemplate.cloneNode(true);
const buttonClose = messageError.querySelector('.error__button');

const onEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removeMessage();
  }
};

const handleClick = (evt) => {
  evt.preventDefault();
  removeMessage();
};

const showMessage = (message) => {
  message.classList.remove('hidden');
  message.style.zIndex = '9999999';
  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', onEscKeydown);
  document.body.appendChild(message);
};

const showSuccessMessage = () => {
  showMessage(messageSuccess);
};

const showErrorMessage = () => {
  showMessage(messageError);
  buttonClose.addEventListener('click', handleClick);
};

const removeMessage = () => {
  document.removeEventListener('click', handleClick);
  document.removeEventListener('keydown', onEscKeydown);

  if (messageSuccess) {
    messageSuccess.classList.add('hidden');
  }

  messageError.classList.add('hidden');
  buttonClose.removeEventListener('click', handleClick);
};

export { showSuccessMessage, showErrorMessage }
