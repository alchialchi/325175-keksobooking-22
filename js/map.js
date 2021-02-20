/* global L:readonly */
import { MAIN_LATITUDE, MAIN_LONGITUDE, LOCATION_FLOAT } from './create-data.js';
import { createCard } from './card.js';
import { activateForm, addressElement } from './form.js';

export const initMap = (similarOffers) => {
  const map = L.map('map-canvas').on('load', () => {
    activateForm();
    addressElement.value = `${MAIN_LATITUDE}, ${MAIN_LONGITUDE}`;
  })
    .setView({
      lat: MAIN_LATITUDE,
      lng: MAIN_LONGITUDE,
    }, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
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

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (event) => {
    const lat = event.target.getLatLng().lat;
    const lng = event.target.getLatLng().lng;
    addressElement.value = `${lat.toFixed(LOCATION_FLOAT)}, ${lng.toFixed(LOCATION_FLOAT)}`;
  });

  similarOffers.forEach(({ author, offer, location }) => {
    const offerPinIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    const lat = location.x;
    const lng = location.y;

    const offerMarker = L.marker({
      lat,
      lng,
    },
    {
      offerPinIcon,
    },
    );

    offerMarker.addTo(map).bindPopup(createCard({ author, offer }));
  });
};

