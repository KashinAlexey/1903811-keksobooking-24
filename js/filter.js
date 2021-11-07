const mapFilter = document.querySelector('.map__filters');
const mapFilterElements = document.querySelectorAll('.map__filter');
const housingType = mapFilter.querySelector('#housing-type');
const housingPrice = mapFilter.querySelector('#housing-price');
const housingRooms = mapFilter.querySelector('#housing-rooms');
const housingGuests = mapFilter.querySelector('#housing-guests');
const housingFeatures = mapFilter.querySelector('#housing-features');
const housingFeaturesElements = housingFeatures.querySelectorAll('input');

// Сброс формы фильтрации
const resetFilter = () => {
  mapFilter.reset(); // Сброс всей формы
};

// Деактивация формы фильтрации
const deactivationFilterForm = () => {
  mapFilter.classList.add('ad-form--disabled');
  mapFilterElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

// Активация формы фильтрации
const activationFilterForm = () => {
  mapFilter.classList.remove('ad-form--disabled');
  mapFilterElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

// Получение массива текущих значений фильтра "features"
const getFeaturesValue = () => {

  const choosenFeaturesArray = [];

  housingFeaturesElements.forEach((element) => {
    if (element.checked) {
      choosenFeaturesArray.push(element.value);
    }
  });

  return choosenFeaturesArray;
};

// Получение всех текущих критериев фильтрации
const getSearchCriteria = () => {

  const searchСriteria = {
    type: housingType.value,
    rooms: housingRooms.value,
    price: housingPrice.value,
    guests: housingGuests.value,
    features: getFeaturesValue(),
  };

  return searchСriteria;
};

// Проверка попадания цены в диапазон значений
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

// Функция проверки элементов массива на соотвествие критериям
const compareItems = ({offer}) => {

  let typeAny = '';
  let roomsAny = 0;
  let priceAny = '';
  let guestsAny = 0;
  let isFeaturesInclude = true;
  const currentSearchCriteria = getSearchCriteria();
  const currentFeaturesCriteria = getFeaturesValue();
  const offerPrice = checkPriceRange(offer.price);
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
};

// Выполнение колл-бэк функции в случае изменения значений фильтра
const checkFilterCahnge = (cb) => {
  housingType.addEventListener('change', () => {
    cb();
  });

  housingRooms.addEventListener('change', () => {
    cb();
  });

  housingPrice.addEventListener('change', () => {
    cb();
  });

  housingGuests.addEventListener('change', () => {
    cb();
  });

  housingFeatures.addEventListener('change', () => {
    cb();
  });
};

export {resetFilter, compareItems, checkFilterCahnge, activationFilterForm, deactivationFilterForm };
