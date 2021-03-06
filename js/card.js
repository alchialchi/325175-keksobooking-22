const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const propertyType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}

const checkGuests = (guests) => {
  const guest = guests === 1 ? 'гостя' : 'гостей';
  return `${guests} ${guest}`;
}

const checkRooms = (rooms) => {
  const room = rooms === 1 ? 'комната' : 'комнаты';
  return `${rooms} ${room}`;
}

const createCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = propertyType[card.offer.type];
  cardElement.querySelector(
    '.popup__text--capacity',
  ).textContent = `${checkRooms(card.offer.rooms)} для ${checkGuests(card.offer.guests)}`;
  cardElement.querySelector(
    '.popup__text--time',
  ).textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  const featureList = cardElement.querySelector('.popup__features');
  featureList.innerHTML = '';
  for (let i = 0; i < card.offer.features.length; i++) {
    const feature = document.createElement('li');
    const featureClass = `popup__feature--${card.offer.features[i]}`;
    feature.classList.add('popup__feature', featureClass);
    featureList.appendChild(feature);
  }

  const photoList = cardElement.querySelector('.popup__photos');
  photoList.innerHTML = '';
  for (let i = 0; i < card.offer.photos.length; i++) {
    const photo = cardTemplate.querySelector('.popup__photo').cloneNode(true);
    photo.src = card.offer.photos[i];
    photoList.appendChild(photo);
  }
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
}

export { createCard };
