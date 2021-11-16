import { setDefaultsParameters } from './message.js';
import { sendData } from './data.js';
import { MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, MIN_PRICE_VALUE, MAX_PRICE_VALUE, MIN_STRING_TEXT, MAX_STRING_TEXT, MIN_NUMBER_TEXT, MAX_NUMBER_TEXT, ROOM_CAPACITY_TEXT, MAX_PHOTO_COUNT, typeMinPrice, avatarSettings } from './constants.js';
import { checkInputValueInRange, checkMandatoryValue, makeElement } from './util.js';
import { getAddressFromMap } from './map.js';

// Обявляем переменные
const form = document.querySelector('.ad-form');
const formElements = document.querySelectorAll('.ad-form__element');
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const roomNumberInput = document.querySelector('#room_number');
const capacityInput = document.querySelector('#capacity');
const timeInInput = document.querySelector('#timein');
const timeOutInput = document.querySelector('#timeout');
const typeInput = document.querySelector('#type');
const resetButton = document.querySelector('.ad-form__reset');
const avatarInput = document.querySelector('#avatar');
const imageInput = document.querySelector('#images');
const headerPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
const photoContainer = document.querySelector('.ad-form__photo-container');
const photoContainerList = photoContainer.children;

// Функции модуля

const onResetUserFormClick = (dataFromServer) => {
  setDefaultsParameters(dataFromServer);
};

const onUserFormSubmitClick = (evt, dataFromServer) => {
  // Внутренняя логика
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(formData, dataFromServer);
};

const setUserFormDefaultParameters = (parametr) => {
  const resetAvatar = () => {
    headerPreview.src = avatarSettings.src;
    headerPreview.alt = avatarSettings.alt;
    headerPreview.width = avatarSettings.width;
    headerPreview.height = avatarSettings.height;
  };

  const resetImagePreview = () => {
    while (photoContainerList.length !== 1) {
      photoContainerList[1].remove();
    }
  };

  if (parametr === 'all') {
    form.reset();
    resetImagePreview();
    resetAvatar();
  } else if (parametr === 'avatar') {
    resetAvatar();
  } else if (parametr === 'image') {
    resetImagePreview();
  }
};

const validationUserForm = (dataFromServer) => {
  // Внешняя логика
  getAddressFromMap();

  resetButton.addEventListener('click', () => {
    onResetUserFormClick(dataFromServer);
  });

  form.addEventListener('submit', (evt) => {
    onUserFormSubmitClick(evt, dataFromServer);
  });

  // Внутренняя логика
  // Валидация формы добавления объявления.
  // Заголовок объявления
  const onTitleInputInvalid = () => {
    checkMandatoryValue(titleInput);
  };
  titleInput.addEventListener('invalid', onTitleInputInvalid);
  const onTitleInput = () => {
    checkInputValueInRange(titleInput, MAX_TITLE_LENGTH, MIN_TITLE_LENGTH, MIN_STRING_TEXT, MAX_STRING_TEXT, false);
  };
  titleInput.addEventListener('input', onTitleInput);

  // Цена за ночь
  // Функция установки цены за ночь
  const setPriceValue = (minPrice) => {
    priceInput.setAttribute('placeholder', minPrice);
    priceInput.setAttribute('min', minPrice);
  };
  setPriceValue(typeMinPrice[typeInput.value]);
  const onPriceInputInvalid = () => {
    checkMandatoryValue(priceInput);
  };
  priceInput.addEventListener('invalid', onPriceInputInvalid);
  const onPriceInput = () => {
    checkInputValueInRange(priceInput, MIN_PRICE_VALUE, MAX_PRICE_VALUE,  MIN_NUMBER_TEXT, MAX_NUMBER_TEXT, true);
  };
  priceInput.addEventListener('input', onPriceInput);

  // Количество комнат и количество мест
  const onRoomCapacityInputChange = () => {
    const roomValue = +roomNumberInput.value;
    const capacitiValue = +capacityInput.value;
    if (roomValue < capacitiValue || capacitiValue === 100 || roomValue === 100) {
      capacityInput.setCustomValidity(ROOM_CAPACITY_TEXT);
    } else {
      capacityInput.setCustomValidity('');
    }

    capacityInput.reportValidity();
  };
  capacityInput.addEventListener('change', onRoomCapacityInputChange);
  roomNumberInput.addEventListener('change', onRoomCapacityInputChange);

  // Тип жилья
  const onPriceValueChange = () => {
    for (const type in typeMinPrice) {
      if (typeInput.value === type) {
        setPriceValue(typeMinPrice[type]);
        break;
      }
    }
  };
  typeInput.addEventListener('change', onPriceValueChange);

  // Время заезда-выезда
  const onTimeoutValueChange = () => {
    timeOutInput.value = timeInInput.value;
  };
  const onTimeinValueChange = () => {
    timeInInput.value = timeOutInput.value;
  };
  timeInInput.addEventListener('change', onTimeoutValueChange);
  timeOutInput.addEventListener('change', onTimeinValueChange);

  // Показать превью аватара после ввода
  const showAvatarPreview = () => {
    headerPreview.src =  window.URL.createObjectURL(avatarInput.files[0]);
  };
  const onAvatarPreviewInput = () => {
    //resetAvatar();
    setUserFormDefaultParameters('avatar');
    showAvatarPreview();
  };
  avatarInput.addEventListener('input', onAvatarPreviewInput);

  // Фотографии жилья
  // Функция показа превью фотографий жилья после ввода
  const showImagesPreview = () => {
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
  const onImagesPreviewInput = () => {
    //resetImagePreview();
    setUserFormDefaultParameters('image');
    showImagesPreview();
  };
  imageInput.addEventListener('input', onImagesPreviewInput);
};

const deactivationUserForm = () => {
  form.classList.add('ad-form--disabled');
  formElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

const activationUserForm = (dataFromServer) => {
  // Внешняя логика
  setUserFormDefaultParameters('all');
  validationUserForm(dataFromServer);

  // Внутренняя логика
  form.classList.remove('ad-form--disabled');
  formElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

export { deactivationUserForm, activationUserForm, setUserFormDefaultParameters };
