import './card.js';
import { disableForm, setFormReset, setUserFormSubmit } from './form.js';
import { initMap } from './map.js';
import { getData } from './api.js';
import { setFilterListener } from './filter.js';
import './photo.js';

disableForm();

getData(( data ) => {
  initMap(data);
  setFilterListener(data);
});

setUserFormSubmit();
setFormReset();
