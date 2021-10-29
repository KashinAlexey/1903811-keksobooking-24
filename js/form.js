import {MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, MIN_PRICE_VALUE, MAX_PRICE_VALUE, MIN_STRING_TEXT, MAX_STRING_TEXT, MIN_NUMBER_TEXT, MAX_NUMBER_TEXT, ROOM_CAPACITY_TEXT} from './constants.js';
import {isInputValueInRange, checkMandatoryValue} from './util.js';

const form = document.querySelector('.ad-form');
const formElements = document.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters');
const mapFilterElements = document.querySelectorAll('.map__filter');
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const roomNumbeInput = document.querySelector('#room_number');
const capacityInput = document.querySelector('#capacity');

// Функция деактивации формы
const deactivationForm = () => {
  form.classList.add('ad-form--disabled');
  formElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
  mapFilter.classList.add('ad-form--disabled');
  mapFilterElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

// Функция активации формы
const activationForm = () => {
  form.classList.remove('ad-form--disabled');
  formElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
  mapFilter.classList.remove('ad-form--disabled');
  mapFilterElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

// Валидация формы добавления объявления.
// Заголовок объявления
const isMissingTitleValue = () => checkMandatoryValue(titleInput);
const isTitleInputInRange = () => isInputValueInRange(titleInput, MAX_TITLE_LENGTH, MIN_TITLE_LENGTH, MIN_STRING_TEXT, MAX_STRING_TEXT, false);

titleInput.addEventListener('invalid', isMissingTitleValue);
titleInput.addEventListener('input', isTitleInputInRange);

// Цена за ночь
const isMissingPriceValue = () => checkMandatoryValue(priceInput);
const isPriceInputInRange = () => isInputValueInRange(priceInput, MIN_PRICE_VALUE, MAX_PRICE_VALUE,  MIN_NUMBER_TEXT, MAX_NUMBER_TEXT, true);

priceInput.addEventListener('invalid', isMissingPriceValue);
priceInput.addEventListener('input', isPriceInputInRange);

// Количество комнат и количество мест
// Функция проверки соотвествия комнат кол-ву гостей
const isCorrectValue = () => {
  const roomValue = +roomNumbeInput.value;
  const capacitiValue = +capacityInput.value;
  if (roomValue < capacitiValue || capacitiValue === 100 || roomValue === 100) {
    capacityInput.setCustomValidity(ROOM_CAPACITY_TEXT);
  } else {
    capacityInput.setCustomValidity('');
  }

  capacityInput.reportValidity();
};

capacityInput.addEventListener('change', isCorrectValue);
roomNumbeInput.addEventListener('change', isCorrectValue);

export {deactivationForm, activationForm};
