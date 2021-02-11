const validateMinMax = (min, max) => {
  if (min > max || min < 0) {
    throw 'Wrong function arguments. Minimum value must be 0 or positive and lower or equal to maximum';
  }
}

// The examples are taken from https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getInclusiveRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  validateMinMax(min, max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getFloatingRandomNumber = (min, max, floatingPoint) => {
  validateMinMax(min, max);

  const randomNumber = (Math.random() * (max - min + 1)) + min;

  return randomNumber.toFixed(floatingPoint);
};

const getRandomArrayElement = (elemets) => {
  return elemets[getInclusiveRandomNumber(0, elemets.length - 1)];
};

const getRandomNewArray = (elements) => {
  const length = getInclusiveRandomNumber(1, elements.length)
  const newArray = [];
  for (let i = 0; i < length; i++) {
    newArray.push(elements[i]);
  }
  return newArray;
};

export {
  getInclusiveRandomNumber,
  getFloatingRandomNumber,
  getRandomArrayElement,
  getRandomNewArray
};
