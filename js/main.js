import './card.js';
import { disableForm, setFormReset, setUserFormSubmit } from './form.js';
import { initMap } from './map.js';
import { getData } from './api.js';

const OFFERS_AMOUNT = 10;

disableForm();

getData(( data ) => {
  initMap(data.slice(0, OFFERS_AMOUNT));
});

setUserFormSubmit();
setFormReset();
