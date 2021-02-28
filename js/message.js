import { handleClick, onEscKeydown } from './popup.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const messageSuccess = successTemplate.cloneNode(true);
const messageError = errorTemplate.cloneNode(true);

const closeMessage = (message) => {
  message.classList.add('hidden');
  document.removeEventListener('click', handleClick(message, closeMessage));
  document.removeEventListener('keydown', onEscKeydown(message, closeMessage));
};

const showSuccessMessage = () => {
  document.body.appendChild(messageSuccess);
  messageSuccess.classList.remove('hidden');
  messageSuccess.style.zIndex = '9999999';
  document.addEventListener('click', handleClick(messageSuccess, closeMessage));
  document.addEventListener('keydown', onEscKeydown(messageSuccess, closeMessage));
};

const showErrorMessage = () => {
  const buttonClose = messageError.querySelector('.error__button');
  document.body.appendChild(messageError);
  messageError.classList.remove('hidden');
  messageError.style.zIndex = '9999999';
  buttonClose.addEventListener('click', handleClick(messageError, closeMessage));
  document.addEventListener('click', handleClick(messageError, closeMessage));
  document.addEventListener('keydown', onEscKeydown(messageError, closeMessage));
};

export { showSuccessMessage, showErrorMessage }
