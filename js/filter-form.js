import { renderMarkersOnMap } from './map.js';

// Объявляем переменные
const mapFilter = document.querySelector('.map__filters');
const mapFilterElements = document.querySelectorAll('.map__filter');
const housingType = mapFilter.querySelector('#housing-type');
const housingPrice = mapFilter.querySelector('#housing-price');
const housingRooms = mapFilter.querySelector('#housing-rooms');
const housingGuests = mapFilter.querySelector('#housing-guests');
const housingFeatures = mapFilter.querySelector('#housing-features');
const housingFeaturesElements = housingFeatures.querySelectorAll('input');

// Функция проверки элементов массива на соотвествие критериям
const compareOffer = ({offer}) => {

  const getFeaturesValue = () => {
    const chosenFeaturesArray = [];
    housingFeaturesElements.forEach((element) => {
      if (element.checked) {
        chosenFeaturesArray.push(element.value);
      }
    });
    return chosenFeaturesArray;
  };

  const checkPriceRange = (price) => {
    let priceRange = '';

    if (price >= 0 && price < 10000) {
      priceRange = 'low';
    } else if (price >= 10000 && price < 50000) {
      priceRange = 'middle';
    } else {
      priceRange = 'high';
    }
    return priceRange;
  };

  const searchCriteria = {
    type: housingType.value,
    rooms: housingRooms.value,
    price: housingPrice.value,
    guests: housingGuests.value,
    features: getFeaturesValue(),
  };

  let typeAny = '';
  let roomsAny = 0;
  let priceAny = '';
  let guestsAny = 0;
  let isFeaturesInclude = true;
  const currentSearchCriteria = searchCriteria;
  const currentFeaturesCriteria = getFeaturesValue() || [];
  const offerPrice = checkPriceRange(offer.price) || '';
  const offerFeatures = offer.features || [];

  if (currentSearchCriteria.type === 'any') {
    typeAny = offer.type;
  } else {
    typeAny = currentSearchCriteria.type;
  }

  if (currentSearchCriteria.rooms === 'any') {
    roomsAny = +offer.rooms;
  } else {
    roomsAny = +currentSearchCriteria.rooms;
  }

  if (currentSearchCriteria.price === 'any') {
    priceAny = offerPrice;
  } else {
    priceAny = currentSearchCriteria.price;
  }

  if (currentSearchCriteria.guests === 'any') {
    guestsAny = +offer.guests;
  } else {
    guestsAny = +currentSearchCriteria.guests;
  }

  if (currentFeaturesCriteria.length !== 0) {
    for (let count = 0; count < currentFeaturesCriteria.length; count++) {
      if (!offerFeatures.includes(currentFeaturesCriteria[count])) {
        isFeaturesInclude = false;
        break;
      }
    }
  }

  return offer.type === typeAny && offer.rooms === roomsAny && offerPrice === priceAny && offer.guests === guestsAny && isFeaturesInclude;
}; // OK

const getFilteredData = (dataFromServer) => {
  // Внешняя логика
  renderMarkersOnMap(dataFromServer);
}; // OK

const onFilterFormChange = (callback) => {
  // Внешняя логика (или подписка на событие)
  mapFilter.addEventListener('input', callback);
  return () => {
    // деактивация формы
    mapFilter.removeEventListener('input', callback);
  };
}; // OK

const setFilterFormDefaultParameters = (dataFromServer) => {
  mapFilter.reset();
  getFilteredData(dataFromServer);
};

const activationFilterForm = (callback) => {
  // Внутренняя логика
  mapFilter.classList.remove('ad-form--disabled');
  mapFilterElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  // Внешняя логика
  callback();
}; // OK

const deactivationFilterForm = (callback) => {
  mapFilter.classList.add('ad-form--disabled');
  mapFilterElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  callback();
}; // OK

export { deactivationFilterForm, activationFilterForm, compareOffer, setFilterFormDefaultParameters, onFilterFormChange, getFilteredData };
