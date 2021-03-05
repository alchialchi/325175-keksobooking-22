const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const messageSuccess = successTemplate.cloneNode(true);
const messageError = errorTemplate.cloneNode(true);

// Сделала правки, но баг с формой так и остался :(

const closeMessage = (message) => {
  message.classList.add('hidden');
  document.removeEventListener('click', handleClick(message));
  document.removeEventListener('keydown', onEscKeydown(message));
};

const showSuccessMessage = () => {
  document.body.appendChild(messageSuccess);
  messageSuccess.classList.remove('hidden');
  messageSuccess.style.zIndex = '9999999';
  document.addEventListener('keydown', onEscKeydown(messageSuccess));
  document.addEventListener('click', handleClick(messageSuccess));
};

const showErrorMessage = () => {
  const buttonClose = messageError.querySelector('.error__button');
  document.body.appendChild(messageError);
  messageError.classList.remove('hidden');
  messageError.style.zIndex = '9999999';
  buttonClose.addEventListener('click', handleClick(messageError));
  document.addEventListener('click', handleClick(messageError));
  document.addEventListener('keydown', onEscKeydown(messageError));
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const onEscKeydown = (message) => {
  return (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeMessage(message);
    }
  }
};

const handleClick = (message) => {
  return (evt) => {
    evt.preventDefault();
    closeMessage(message);
  }
};

export { showSuccessMessage, showErrorMessage }
