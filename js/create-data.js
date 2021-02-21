import {
  getInclusiveRandomNumber,
  getFloatingRandomNumber,
  getRandomArrayElement,
  getRandomNewArray
} from './util.js';

// Mock data

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const PROPERTY_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHEKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECK_OUT = [
  '12:00',
  '13:00',
  '14:00',
];

const TITLES = [
  'Private room',
  'Entire apartment',
  'Entire house',
];

const DESCRIPTIONS = [
  'Bathroom is private/exclusive, but outside in the hallway.',
  'Location next to exercise trails and network of paved bicycle roads',
  'Suitable for singles/couple, business travellers and visitors to the University.',
  'Perfect place for walks and workouts along the river.',
];

const MIN_LATITUDE = 35.65000;
const MAX_LATITUDE = 35.70000;
const MIN_LONGITUDE = 139.70000;
const MAX_LONGITUDE = 139.80000;
const MAIN_LATITUDE = 35.68950;
const MAIN_LONGITUDE = 139.69171;
const LOCATION_FLOAT = 5;

const createOffer = () => {
  const locationX = getFloatingRandomNumber(MIN_LATITUDE, MAX_LATITUDE, LOCATION_FLOAT);
  const locationY = getFloatingRandomNumber(MIN_LONGITUDE, MAX_LONGITUDE, LOCATION_FLOAT);

  return {
    author: {
      avatar: `img/avatars/user0${getInclusiveRandomNumber(1, 8)}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${locationX}, ${locationY}`,
      price: getInclusiveRandomNumber(100, 400),
      type: getRandomArrayElement(PROPERTY_TYPES),
      rooms: getInclusiveRandomNumber(1, 5),
      guests: getInclusiveRandomNumber(1, 5),
      checkin: getRandomArrayElement(CHEKIN),
      checkout: getRandomArrayElement(CHECK_OUT),
      features: getRandomNewArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomNewArray(PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
};

const createOffers = (quantity) => {
  return new Array(quantity).fill(null).map(createOffer);
}

export { createOffers, MAIN_LATITUDE, MAIN_LONGITUDE, LOCATION_FLOAT };
