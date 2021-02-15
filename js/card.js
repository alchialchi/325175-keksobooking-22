import { createOffers } from './create-data.js';

const mapCanvas = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const propertyType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}

function checkGuests(guests) {
  return guests > 1 ? guests + ' гостей' : guests + ' гостя';
}

function checkRooms(rooms) {
  return rooms > 1 ? rooms + ' комнаты' : rooms + ' комната';
}

const cards = createOffers();

const cardListFragment = document.createDocumentFragment();

cards.forEach(({ author, offer }) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = propertyType[offer.type];
  cardElement.querySelector(
    '.popup__text--capacity',
  ).textContent = `${checkRooms(offer.rooms)} для ${checkGuests(offer.guests)}`;
  cardElement.querySelector(
    '.popup__text--time',
  ).textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  cardElement.querySelector('.popup__description').textContent = offer.description;

  const featureList = cardElement.querySelector('.popup__features');
  featureList.innerHTML = '';
  for (let i = 0; i < offer.features.length; i++) {
    const feature = document.createElement('li');
    const featureClass = `popup__feature--${offer.features[i]}`;
    feature.classList.add('popup__feature', featureClass);
    featureList.appendChild(feature);
  }

  const photoList = cardElement.querySelector('.popup__photos');
  photoList.innerHTML = '';
  for (let i = 0; i < offer.photos.length; i++) {
    const photo = cardTemplate.querySelector('.popup__photo').cloneNode(true);
    photo.src = offer.photos[i];
    photoList.appendChild(photo);
  }
  cardElement.querySelector('.popup__avatar').src = author.avatar;

  cardListFragment.appendChild(cardElement);

});

mapCanvas.appendChild(cardListFragment);
