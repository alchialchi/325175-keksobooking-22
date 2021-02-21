import { createOffers } from './create-data.js';
import './card.js';
import { disableForm } from './form.js';
import { initMap } from './map.js';

const OFFER_AMOUNT = 10;
const similarOffers = createOffers(OFFER_AMOUNT);

disableForm();
initMap(similarOffers);
