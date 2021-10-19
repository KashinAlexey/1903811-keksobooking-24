// Импортируем файл генерации данных
import {createObject} from './data.js';

// Создаем функцию, возвращающую новый элемент с тегом, классами и текстом (при наличии) для добавления в разметку
const makeElement = function (tagName, classNames, text) {
  const element = document.createElement(tagName);
  classNames.forEach((className) => {
    element.classList.add(className);
  });
  if (text) {
    element.textContent = text;
  }
  return element;
};

// Создаем массив сопоставления типов объекта
const objectType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

// Находим шаблон который будем клонировать
const similarObjectTemplate = document.querySelector('#card').content.querySelector('.popup');

// Получаем массив объектов с объявлениями
const similarOblects = createObject();

// Создаем фрагмент для добавления объявлений
const similarListFragment = document.createDocumentFragment();

// Проходим по массиву объектов, получаем данные, вставляем данные в шаблон
similarOblects.forEach(({author, offer}) => {
  const objectElement = similarObjectTemplate.cloneNode(true); // Клонируем шаблон
  objectElement.querySelector('.popup__title').textContent = offer.title;
  objectElement.querySelector('.popup__text--address').textContent = offer.address;
  objectElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  objectElement.querySelector('.popup__type').textContent = objectType[offer.type];
  objectElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  objectElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featureContainer = objectElement.querySelector('.popup__features');
  featureContainer.innerHTML = '';
  if(offer.features) {
    offer.features.forEach((feature) => {
      const featureListItem = makeElement('li', ['popup__feature', `popup__feature--${feature}`]);
      featureContainer.append(featureListItem);
    });
  } else {
    featureContainer.remove(); // Если отсутвуют опции скрываем блок
  }

  const descriptionContainer = objectElement.querySelector('.popup__description');
  if(offer.description) {
    descriptionContainer.textContent = offer.description;
  } else {
    descriptionContainer.remove(); // Если отсутвует описание скрываем блок
  }

  const photoContainer = objectElement.querySelector('.popup__photos');
  photoContainer.innerHTML = '';
  if(offer.photos) {
    offer.photos.forEach((photo) => {
      const photoListItem = makeElement('img', ['popup__photo']);
      photoListItem.src = photo;
      photoListItem.width = '45';
      photoListItem.height = '40';
      photoListItem.alt = 'Фотография жилья';
      photoContainer.append(photoListItem);
    });
  } else {
    photoContainer.remove(); // Если отсутвуют фото скрываем блок
  }

  objectElement.querySelector('.popup__avatar').src = author.avatar;

  // Добавляем готовое объявление во фрагмент
  similarListFragment.appendChild(objectElement);
});

// Находим окно вывода временных данных
const mapCanvas = document.querySelector('#map-canvas');
// Временно отрисовываем элементы на карте
mapCanvas.appendChild(similarListFragment);
