import { sendData } from './api.js';
import { MAX_ROOMS_NUMBER } from './constants.js';
import { setAddress, resetMainMarker } from './map.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

const formElement = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mapFeatures = document.querySelector('.map__features');
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

titleElement.addEventListener('invalid', () => {
  if (titleElement.validity.valueMissing) {
    titleElement.setCustomValidity('Обязательное поле для заполнения')
  } else {
    titleElement.setCustomValidity('');
  }
});

titleElement.addEventListener('input', () => {
  const inputValueLength = titleElement.value.length;

  if (inputValueLength < MIN_TITLE_LENGTH) {
    titleElement.setCustomValidity(`Еще ${MAX_TITLE_LENGTH - inputValueLength} симв.`);
  } else if (inputValueLength > MAX_TITLE_LENGTH) {
    titleElement.setCustomValidity(`Удалите лишние ${inputValueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    titleElement.setCustomValidity('');
  }

  titleElement.reportValidity();
})


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

const disableForm = () => {
  formElement.classList.add('ad-form--disabled');
  formElement.querySelectorAll('.ad-form fieldset').forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  })
  mapFeatures.classList.add('map__filters--disabled');
  mapFilters.querySelectorAll('.map__filter').forEach((filter) => {
    filter.setAttribute('disabled', '');
  })
  mapFeatures.setAttribute('disabled', 'disabled');
};

const activateForm = () => {
  formElement.classList.remove('ad-form--disabled');
  formElement.querySelectorAll('.ad-form fieldset').forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  })
  addressElement.setAttribute('readonly', 'readonly');
  mapFilters.classList.remove('map__filters--disabled');
  mapFilters.querySelectorAll('.map__filter').forEach((filter) => {
    filter.removeAttribute('disabled');
  })
  mapFeatures.removeAttribute('disabled');
};

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
}

const resetForm = () => {
  formElement.reset();
  mapFilters.reset();
  resetMainMarker();
  setAddress();
}

const setFormReset = () => {
  const resetButton = formElement.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', () => {
    resetForm();
  })
};

export { addressElement, disableForm, activateForm, setUserFormSubmit, setFormReset };
