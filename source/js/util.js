const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = 9999;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '16px';
  alertContainer.style.fontStyle = 'Tahoma';
  alertContainer.style.color = '#ffffff';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscEvent = (evt) => {
  return evt.key === ['Escape' || 'Esc'].includes(evt.key);
};

const debounce = (cb, ms) => {
  let timer;

  return () => {
    if (timer) {
      window.clearTimeout(timer);
    }

    timer = setTimeout(() => cb(), ms)
  }
};

export {
  showAlert,
  isEscEvent,
  debounce
};
