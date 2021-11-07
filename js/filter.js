const mapFilter = document.querySelector('.map__filters');
//const housingType = mapFilter.querySelector('#housing-type');
//const housingPrice = mapFilter.querySelector('#housing-price');
//const housingRooms = mapFilter.querySelector('#housing-rooms');
//const housingGuests = mapFilter.querySelector('#housing-guests');
//const housingFeatures = mapFilter.querySelector('housing-features');

const resetFilter = () => {
  mapFilter.reset(); // Сброс всей формы
};

export {resetFilter};
