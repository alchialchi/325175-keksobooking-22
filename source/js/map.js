import L from 'leaflet';
import { MAIN_LATITUDE, MAIN_LONGITUDE, LOCATION_FLOAT } from './constants.js';
import { createCard } from './card.js';
import { activateForm, addressElement } from './form.js';
import { setFilteredMarkers } from './filter.js';

const MAIN_ZOOM = 10;
const MAIN_PIN_WIDTH = 52;
const PIN_WIDTH = 40;

const map = L.map('map-canvas');

const setAddress = () => {
  addressElement.value = `${MAIN_LATITUDE}, ${MAIN_LONGITUDE}`;
};

const initMap = (offers) => {
  map.on('load', () => {
    mainMarker.addTo(map);
    activateForm();
    setAddress();
    setMarkers(offers);
    setFilteredMarkers(offers);
  })
    .setView({
      lat: MAIN_LATITUDE,
      lng: MAIN_LONGITUDE,
    }, MAIN_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const markers = [];

const setMarkers = (offers) => {
  offers.forEach((offer) => {
    const offerPinIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [PIN_WIDTH, PIN_WIDTH],
      iconAnchor: [PIN_WIDTH/2, PIN_WIDTH/2],
    });

    const marker = L.marker(
      {
        lat: offer.location.lat,
        lng: offer.location.lng,
      },
      {
        icon: offerPinIcon,
      },
    );
    marker
      .addTo(map)
      .bindPopup(createCard(offer),
        {
          keepInView: true,
        })
    markers.push(marker);
  })
};

const initMainMarker = () => {
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [MAIN_PIN_WIDTH, MAIN_PIN_WIDTH],
    iconAnchor: [MAIN_PIN_WIDTH/2, MAIN_PIN_WIDTH],
  });

  const mainPinMarker = L.marker(
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
};

const mainMarker = initMainMarker();

const resetMainMarker = () => {
  mainMarker.setLatLng([MAIN_LATITUDE, MAIN_LONGITUDE])
  map.setView(new L.LatLng(MAIN_LATITUDE, MAIN_LONGITUDE), MAIN_ZOOM);
};

const removeMarkers = () => {
  markers.forEach(marker => {
    marker.remove();
  })
};

const reCreateMarkers = (offers) =>{
  removeMarkers();
  setMarkers(offers);
}

export { initMap, resetMainMarker, setAddress, removeMarkers, setMarkers, reCreateMarkers };
