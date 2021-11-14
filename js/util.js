import { MANDATORY_TEXT } from './constants.js';

// Функция, возвращающую новый элемент с тегом, классами и текстом (при наличии) для добавления в разметку
const makeElement = (tagName, classNames, text) => {
  const element = document.createElement(tagName);
  classNames.forEach((className) => {
    element.classList.add(className);
  });
  if (text) {
    element.textContent = text;
  }
  return element;
};

// Функция валидации ввода (текста или чисел) в определнном диапазоне min и max (символов или значений) с выводом сообщений
const checkInputValueInRange = (elementInput, min, max, textForMin, textForMax, isNumber) => {
  let value;

  if (isNumber) {
    value = elementInput.value;
  } else {
    value = elementInput.value.length;
  }

  if (value < min) {
    elementInput.setCustomValidity(textForMin);
  } else if (value > max) {
    elementInput.setCustomValidity(textForMax);
  } else {
    elementInput.setCustomValidity('');
  }

  elementInput.reportValidity();
};

// Функция валидации обязательного значения
const checkMandatoryValue = (elementInput) => {
  if (elementInput.validity.valueMissing) {
    elementInput.setCustomValidity(MANDATORY_TEXT);
  } else {
    elementInput.setCustomValidity('');
  }
};

// Фнкция устранения мерцания
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { makeElement, checkInputValueInRange, checkMandatoryValue, debounce };
