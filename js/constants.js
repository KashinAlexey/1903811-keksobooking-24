// Количество генерируемых объектов
const SIMILAR_OBJECT_COUNT = 10;

// Маскимальное количество загружаемых фото жилья
const MAX_PHOTO_COUNT = 10;

// Предельные значения кол-ва символов поля описания объявления
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

// Предельные значения цены за ночь
const MIN_PRICE_VALUE = 0;
const MAX_PRICE_VALUE = 1000000;

// Текст пользовательских сообщений валидации ввода текста и чисел
const MIN_STRING_TEXT = 'Добавьте ещё символов';
const MAX_STRING_TEXT = 'Удалите лишние символы';
const MIN_NUMBER_TEXT = 'Число должно быть больше 0';
const MAX_NUMBER_TEXT = 'Число должно быть меньше 1 000 000';
const ROOM_CAPACITY_TEXT = 'Измените кол-во гостей или комнат';
const MANDATORY_TEXT = 'Обязательное поле';

// Координаты центра Токио
const LAT_TOKYO_CENTER = 35.68368;
const LNG_TOKYO_CENTER = 139.77261;

// Объект описания пользовательской вспомогательной метки
const simpleIcon = {
  iconUrl: '/img/pin.svg', // Внешний вид
  iconSize: [40, 40], // Размер
  iconAnchor: [20, 40], // якорь маркера (важно!)
};
// Объект описания пользовательской основной метки
const mainIcon = {
  iconUrl: '/img/main-pin.svg', // Внешний вид
  iconSize: [52, 52], // Размер
  iconAnchor: [20, 40], // якорь маркера (важно!)
};

// Объект для сопоставления типов жилья
const objectType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

// Объект минимальной цены за ночь
const typeMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

export {objectType, SIMILAR_OBJECT_COUNT, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, MIN_PRICE_VALUE, MAX_PRICE_VALUE, MIN_STRING_TEXT, MAX_STRING_TEXT, MIN_NUMBER_TEXT, MAX_NUMBER_TEXT, ROOM_CAPACITY_TEXT, MANDATORY_TEXT, LAT_TOKYO_CENTER, LNG_TOKYO_CENTER, simpleIcon, mainIcon, MAX_PHOTO_COUNT, typeMinPrice};
