const formElement = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mapFeatures = document.querySelector('.map__features');
const typeElement = formElement.querySelector('#type');
const priceElement = formElement.querySelector('#price');
const timeInElement = formElement.querySelector('#timein');
const timeOutElement = formElement.querySelector('#timeout');
const addressElement = formElement.querySelector('#address');

const minPriceTypes = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
};

typeElement.addEventListener('change', () => {
  priceElement.placeholder = minPriceTypes[typeElement.value];
  priceElement.min = minPriceTypes[typeElement.value];
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

export { addressElement, disableForm, activateForm };
