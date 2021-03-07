import { sendData } from './api.js';
import { MAX_ROOMS_NUMBER } from './constants.js';
import { setAddress, resetMainMarker } from './map.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { deactivateFilterForm, activateFilterForm, mapFilters } from './filter.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

const formElement = document.querySelector('.ad-form');
const typeElement = formElement.querySelector('#type');
const priceElement = formElement.querySelector('#price');
const timeInElement = formElement.querySelector('#timein');
const timeOutElement = formElement.querySelector('#timeout');
const addressElement = formElement.querySelector('#address');
const titleElement = formElement.querySelector('#title');
const capacityElement = formElement.querySelector('#capacity');
const roomAmountElement = formElement.querySelector('#room_number');

const minPriceTypes = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
};

// С этой функцией дальнейшая валидация не отрабатывает, ну вернее не показывается

// А так же в html у нас есть minlength="30" maxlength="100" и из-за них кастомной валидации не видно..
// Может быть оставить что-tо одно?

// titleElement.addEventListener('invalid', () => {
//   titleElement.setCustomValidity(
//     titleElement.validity.valueMissing ? 'Обязательное поле для заполнения' : '');
// });

const getMessage = (inputValueLength) => {
  if (inputValueLength < MIN_TITLE_LENGTH) {
    return `Еще ${MIN_TITLE_LENGTH - inputValueLength} симв.`;
  }

  if (inputValueLength > MAX_TITLE_LENGTH) {
    return `Удалите лишние ${inputValueLength - MAX_TITLE_LENGTH} симв.`;
  }
  return '';
}

const capacityCheck = () => {
  const roomAmount = roomAmountElement.value;
  const capacity = capacityElement.value;

  if (roomAmount === MAX_ROOMS_NUMBER && capacity !== '0') {
    capacityElement.setCustomValidity('Выберите вариант "Не для гостей"');
  } else if (roomAmount !== MAX_ROOMS_NUMBER && capacity === '0') {
    capacityElement.setCustomValidity('Выберите другой вариант');
  } else if (roomAmount < capacity) {
    capacityElement.setCustomValidity('Выберите меньшее число гостей');
  } else {
    capacityElement.setCustomValidity('');
  }
}

const disableForm = () => {
  formElement.classList.add('ad-form--disabled');
  formElement.querySelectorAll('.ad-form fieldset').forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });
  deactivateFilterForm();
};

const activateForm = () => {
  formElement.classList.remove('ad-form--disabled');
  formElement.querySelectorAll('.ad-form fieldset').forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
  addressElement.setAttribute('readonly', 'readonly');
  activateFilterForm();
};

const resetForm = () => {
  formElement.reset();
  mapFilters.reset();
  resetMainMarker();
  setAddress();
}

const setUserFormSubmit = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        showSuccessMessage();
        resetForm();
      },
      () => showErrorMessage(),
      new FormData(evt.target),
    );
  });
};

const setFormReset = () => {
  const resetButton = formElement.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  })
};

capacityElement.addEventListener('change', () => {
  capacityCheck();
})

roomAmountElement.addEventListener('change', () => {
  capacityCheck();
})

typeElement.addEventListener('change', () => {
  priceElement.placeholder = minPriceTypes[typeElement.value];
  priceElement.min = minPriceTypes[typeElement.value];
});

titleElement.addEventListener('input', () => {
  titleElement.setCustomValidity(getMessage(titleElement.value.length));
  titleElement.reportValidity();
});

priceElement.addEventListener('input', () => {
  const priceValue = priceElement.value;
  priceElement.min = minPriceTypes[typeElement.value];

  if (priceValue > MAX_PRICE) {
    priceElement.setCustomValidity(`Цена не может быть больше чем ${MAX_PRICE}`);
  } else if (priceValue < priceElement.min) {
    priceElement.setCustomValidity(`Стоимость не должна быть меньше чем ${priceElement.min}`);
  } else {
    priceElement.setCustomValidity('');
  }
});

timeInElement.addEventListener('change', () => {
  timeOutElement.value = timeInElement.value;
});

timeOutElement.addEventListener('change', () => {
  timeInElement.value = timeOutElement.value;
});

export { addressElement, disableForm, activateForm, setUserFormSubmit, setFormReset };
