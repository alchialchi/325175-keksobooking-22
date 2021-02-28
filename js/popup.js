import { isEscEvent } from './util.js';

export const onEscKeydown = (message, onClose) => {
  return (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      onClose(message);
    }
  }
};

export const handleClick = (message, onClose) => {
  return (evt) => {
    evt.preventDefault();
    onClose(message);
  }
};
