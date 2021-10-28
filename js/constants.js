// Количество генерируемых объектов
const SIMILAR_OBJECT_COUNT = 1;

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

// Массив сопоставления типов объекта
const objectType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

export {objectType, SIMILAR_OBJECT_COUNT, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, MIN_PRICE_VALUE, MAX_PRICE_VALUE, MIN_STRING_TEXT, MAX_STRING_TEXT, MIN_NUMBER_TEXT, MAX_NUMBER_TEXT, ROOM_CAPACITY_TEXT, MANDATORY_TEXT};
