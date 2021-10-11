import {getRandomFloatInclusive, getRandomIntegerInclusive, getNewRandomArray} from './util';

// Массивы, описывающие возможные варианты некоторых значений для ключевых полей объекта (объявления об аренде)
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const СHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

// Функция, возвращающая новый объект (объявление об аренде) определенной структуры
const createSimilarObject = () => {
  const location = {
    lat: getRandomFloatInclusive(35.65000, 35.70000, 5),
    lng: getRandomFloatInclusive(139.7000, 139.80000, 5),
  };
  return {
    author : {
      avatar:  `img/avatars/user${(`0${getRandomIntegerInclusive(1, 10)}`).slice(-2)}.png`,
    }, // Добавить 0 перед 01, 02 ...
    offer : {
      title: 'For rent',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomIntegerInclusive(1, 1000000),
      type: TYPES[getRandomIntegerInclusive(0, TYPES.length - 1)],
      rooms: getRandomIntegerInclusive(1, 10),
      guests: getRandomIntegerInclusive(1, 10),
      checkin: СHECKINS[getRandomIntegerInclusive(0, СHECKINS.length - 1)],
      checkout: CHECKOUTS[getRandomIntegerInclusive(0, CHECKOUTS.length - 1)],
      features: getNewRandomArray(FEATURES),
      description: 'Sunny side, new renovation',
      photos: getNewRandomArray(PHOTOS),
      location: location,
    },
  };
};

export {createSimilarObject};
