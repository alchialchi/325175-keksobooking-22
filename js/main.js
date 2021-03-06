import './card.js';
import { disableForm, setFormReset, setUserFormSubmit } from './form.js';
import { initMap } from './map.js';
import { getData } from './api.js';

disableForm();

getData(( data ) => {
  initMap(data);
});

setUserFormSubmit();
setFormReset();
