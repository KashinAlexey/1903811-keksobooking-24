import {createPopupElement} from './popup.js';
import {LAT_TOKYO_CENTER, LNG_TOKYO_CENTER, mainIcon, simpleIcon} from './constants.js';
import {deactivationForm, activationForm, validationForm} from './form.js';

const address = document.querySelector('#address');

// Деактивация формы до загрузки карты
deactivationForm();

// Создание блока управления картой, передаем Id элемента куда отрисовать карту
const map = L.map('map-canvas');

// Подписка на событие загрузки карты
map.on('load', () => {
  activationForm(); // Активация формы после загрузки карты
  validationForm(); // Валидация формы после загрузки карты
  address.value = `${LAT_TOKYO_CENTER}, ${LNG_TOKYO_CENTER}`;
}).setView([LAT_TOKYO_CENTER, LNG_TOKYO_CENTER], 12);

// Добавляем в блок изображение самой карты от стороннего поставщика
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

// Создание главной метки и добавление ее на карту
const mainMarker = L.marker([LAT_TOKYO_CENTER, LNG_TOKYO_CENTER],{icon: L.icon(mainIcon),draggable: true}).addTo(map);

// Подписка на событие перемещения главной метки
// Отображение координат главной метки в поле ввода адреса
mainMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  address.value = `${lat.toFixed(5)},${lng.toFixed(5)}`;
});

// Создание пользовательского слоя (группы) (для меток)
const markerGroup = L.layerGroup().addTo(map);

// Функция добавления в группу простой метки
// и соотвествующего ей балуна с подробной информацией об объявлении
const createMarker = (author, offer) => {
  const {lat, lng} = offer.location;
  const simpleMarker = L.marker({lat, lng},{icon: L.icon(simpleIcon)});
  simpleMarker.addTo(markerGroup).bindPopup(createPopupElement({author, offer}));
};

// Функция возврата метки и карты в исходное состояние
// с установкой в поле ввода исходного значения адреса
const resetMap = () => {
  mainMarker.setLatLng({
    lat: LAT_TOKYO_CENTER,
    lng: LNG_TOKYO_CENTER,
  });

  map.setView({ // Для карты
    lat: LAT_TOKYO_CENTER,
    lng: LNG_TOKYO_CENTER,
  }, 12);

  address.setAttribute('value', `${LAT_TOKYO_CENTER}, ${LNG_TOKYO_CENTER}`);
};

export {createMarker, resetMap};
