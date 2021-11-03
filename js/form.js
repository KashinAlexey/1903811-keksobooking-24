import {MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, MIN_PRICE_VALUE, MAX_PRICE_VALUE, MIN_STRING_TEXT, MAX_STRING_TEXT, MIN_NUMBER_TEXT, MAX_NUMBER_TEXT, ROOM_CAPACITY_TEXT, MAX_PHOTO_COUNT, typeMinPrice, avatarSettings} from './constants.js';

import {isInputValueInRange, checkMandatoryValue, makeElement} from './util.js';
import {resetMap} from './map.js';

const form = document.querySelector('.ad-form');
const formElements = document.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters');
const mapFilterElements = document.querySelectorAll('.map__filter');
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const roomNumbeInput = document.querySelector('#room_number');
const capacityInput = document.querySelector('#capacity');
const timeinInput = document.querySelector('#timein');
const timeoutInput = document.querySelector('#timeout');
const typeInput = document.querySelector('#type');

const resetButton = document.querySelector('.ad-form__reset');

// Для работы с изображениями
const avatarInput = document.querySelector('#avatar');
const imageInput = document.querySelector('#images');
const headerPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
const photoContainer = document.querySelector('.ad-form__photo-container');
const photoContainerList = photoContainer.children;

// Фунция очистки контейнера с фотографиями
const resetImage = () => {
  // Очищаем контейнер от текущих фото
  while (photoContainerList.length !== 1) {
    photoContainerList[1].remove();
  }
};

// Функция очистки контейнера с аватаром
const resetAvatar = () => {
  headerPreview.src = avatarSettings.src;
  headerPreview.alt = avatarSettings.alt;
  headerPreview.width = avatarSettings.width;
  headerPreview.height = avatarSettings.height;
};

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

// Функция валидации формы
const validationForm = () => {
  // Валидация формы добавления объявления.
  // Заголовок объявления
  const isMissingTitleValue = () => checkMandatoryValue(titleInput);
  const isTitleInputInRange = () => isInputValueInRange(titleInput, MAX_TITLE_LENGTH, MIN_TITLE_LENGTH, MIN_STRING_TEXT, MAX_STRING_TEXT, false);
  titleInput.addEventListener('invalid', isMissingTitleValue);
  titleInput.addEventListener('input', isTitleInputInRange);

  // Цена за ночь
  const isMissingPriceValue = () => checkMandatoryValue(priceInput);
  const isPriceInputInRange = () => isInputValueInRange(priceInput, MIN_PRICE_VALUE, MAX_PRICE_VALUE,  MIN_NUMBER_TEXT, MAX_NUMBER_TEXT, true);
  // Функция установки минимальной цены за ночь
  const setPriceValue = (minPrice) => {
    priceInput.setAttribute('placeholder', minPrice);
    priceInput.setAttribute('min', minPrice);
  };
  setPriceValue(typeMinPrice[typeInput.value]);
  priceInput.addEventListener('invalid', isMissingPriceValue);
  priceInput.addEventListener('input', isPriceInputInRange);

  // Количество комнат и количество мест
  const checkRoomCapacityValue = () => {
    const roomValue = +roomNumbeInput.value;
    const capacitiValue = +capacityInput.value;
    if (roomValue < capacitiValue || capacitiValue === 100 || roomValue === 100) {
      capacityInput.setCustomValidity(ROOM_CAPACITY_TEXT);
    } else {
      capacityInput.setCustomValidity('');
    }

    capacityInput.reportValidity();
  };
  capacityInput.addEventListener('change', checkRoomCapacityValue);
  roomNumbeInput.addEventListener('change', checkRoomCapacityValue);

  // Тип жилья
  const checkPriceValue = () => {
    for (const type in typeMinPrice) {
      if (typeInput.value === type) {
        setPriceValue(typeMinPrice[type]);
        break;
      }
    }
  };
  typeInput.addEventListener('change', checkPriceValue);

  // Время заезда-выезда
  const checkTimeoutValue = () => {
    timeoutInput.value = timeinInput.value;
  };
  const checkTimeinValue = () => {
    timeinInput.value = timeoutInput.value;
  };
  timeinInput.addEventListener('change', checkTimeoutValue);
  timeoutInput.addEventListener('change', checkTimeinValue);

  // Показать превью аватара после ввода
  const showAvatarPreview = () => headerPreview.src =  window.URL.createObjectURL(avatarInput.files[0]);

  avatarInput.addEventListener('input', showAvatarPreview);

  // Фотографии жилья
  // Функция показа превью фотографий жилья после ввода
  const showImagesPreview = () => {
    resetImage();
    // Создаем фрагмент для добавления фото
    const photoListFragment = document.createDocumentFragment();
    // Получаем массив загруженных фото
    const files = imageInput.files;
    // Проверяем максимально возможное кол-во загружаемых фото
    const filesCount = files.length > MAX_PHOTO_COUNT ? MAX_PHOTO_COUNT: files.length;

    for (let count = 0; count < filesCount; count++) {
      const photoListItem = makeElement('img', ['photo']);
      const photoItemConteiner = makeElement('div', ['ad-form__photo']);

      photoListItem.src = window.URL.createObjectURL(files[count]);
      photoListItem.width = '45';
      photoListItem.height = '40';
      photoListItem.alt = 'Фотография жилья';

      photoItemConteiner.append(photoListItem);
      photoListFragment.appendChild(photoItemConteiner);
    }

    // Добавляем весь фрагмент в контейнер для фото
    photoContainer.appendChild(photoListFragment);
  };
  imageInput.addEventListener('input', showImagesPreview);

  // Очистка формы
  const resetForm = () => {
    resetMap();
    resetAvatar();
    resetImage();
  };
  resetButton.addEventListener('click', resetForm);
};

export {deactivationForm, activationForm, validationForm};
