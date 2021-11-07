import { showErrorAlert } from './util.js';
import { isMapLoad } from './map.js';
import { renderSimilarOblects } from './popup.js';
import { getData } from './api.js';
import { deactivationForm, activationForm, validationForm } from './form.js';

// Кол-бэк получения данных с сервера и их отрисовки на карту
const getSimilarObjects = () => {
  getData((similarOblects) => {
    renderSimilarOblects (similarOblects);
  },
  showErrorAlert);
};

// Деактивация формы до загрузки карты
deactivationForm();

// После загрузки карты:
// 1) активировать форму
// 2) запустить валидацию
// 3) сделать запрос за данными и передать их в метод для отрисовки
isMapLoad(activationForm, validationForm, getSimilarObjects );
