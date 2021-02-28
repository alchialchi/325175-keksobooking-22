import { MAIN_LATITUDE, MAIN_LONGITUDE, LOCATION_FLOAT } from './constants.js';
import { createCard } from './card.js';
import { activateForm, addressElement } from './form.js';

const MAIN_ZOOM = 10;
const MAIN_PIN_WIDTH = 52;
const PIN_WIDTH = 40;

const setAddress = () => {
  addressElement.value = `${MAIN_LATITUDE}, ${MAIN_LONGITUDE}`;
};

const map = window.L.map('map-canvas');

const initMap = (similarOffers) => {
  map.on('load', () => {
    activateForm();
    setAddress();
  })
    .setView({
      lat: MAIN_LATITUDE,
      lng: MAIN_LONGITUDE,
    }, MAIN_ZOOM);

  window.L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  similarOffers.forEach(({ author, offer, location }) => {
    const offerPinIcon = window.L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [PIN_WIDTH, PIN_WIDTH],
      iconAnchor: [PIN_WIDTH/2, PIN_WIDTH/2],
    });

    const lat = location.lat;
    const lng = location.lng;

    const offerMarker = window.L.marker({
      lat,
      lng,
    },
    {
      offerPinIcon,
    },
    );

    offerMarker.addTo(map).bindPopup(createCard({ author, offer }));
    offerMarker.on('click', function() { this.openPopup() });
  });
};

const initMainMarker = () => {
  const mainPinIcon = window.L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [MAIN_PIN_WIDTH, MAIN_PIN_WIDTH],
    iconAnchor: [MAIN_PIN_WIDTH/2, MAIN_PIN_WIDTH],
  });

  const mainPinMarker = window.L.marker(
    {
      lat: MAIN_LATITUDE,
      lng: MAIN_LONGITUDE,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.on('moveend', (evt) => {
    const coords = evt.target.getLatLng();

    const lat = coords.lat.toFixed(LOCATION_FLOAT);
    const lng = coords.lng.toFixed(LOCATION_FLOAT);

    addressElement.value = `${lat}, ${lng}`;
  });

  return mainPinMarker;
}

const mainMarker = initMainMarker();

mainMarker.addTo(map);

const resetMainMarker = () => {
  mainMarker.setLatLng([MAIN_LATITUDE, MAIN_LONGITUDE])
  map.setView(new window.L.LatLng(MAIN_LATITUDE, MAIN_LONGITUDE), MAIN_ZOOM);
}

export { initMap, resetMainMarker, setAddress };
