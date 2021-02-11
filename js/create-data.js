import {
  getInclusiveRandomNumber,
  getFloatingRandomNumber,
  getRandomArrayElement,
  getRandomNewArray
} from './util.js';

// Mock data

const FEATURES = [
  'wifi',
  'diswasher',
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

const createOffer = () => {
  return {
    author: {
      avatar: `img/avatars/user0${getInclusiveRandomNumber(1, 8)}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: '{{location.x}}, {{location.y}}',
      price: `${getInclusiveRandomNumber(100, 400)} SEK`,
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
      x: getFloatingRandomNumber(35.65000, 35.70000, 5),
      y: getFloatingRandomNumber(139.70000, 139.80000, 5),
    },
  };
};

const createOffers = (quantity) => {
  return new Array(quantity).fill(null).map(createOffer);
}

export { createOffers };
