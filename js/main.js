import { showErrorAlert, debounce } from './util.js';
import { isMapLoad } from './map.js';
import { renderSimilarOblects } from './popup.js';
import { getData } from './api.js';
import { deactivationForm, activationForm, validationForm, checkFormReset } from './form.js';
import { checkFilterCahnge, deactivationFilterForm, activationFilterForm } from './filter.js';
import { TIMEOUT_DELAY } from './constants.js';

// Кол-бэк получения данных с сервера и их отрисовки на карту
const getSimilarObjects = () => {
  getData((similarOblects) => {
    // Выполняется после успешной загрузки данных
    renderSimilarOblects (similarOblects);
    activationFilterForm();
    checkFilterCahnge(debounce(() => renderSimilarOblects (similarOblects), TIMEOUT_DELAY));
    checkFormReset(() => renderSimilarOblects (similarOblects));
  },
  showErrorAlert);
};

// Кол-бэк начала работы после загрузки карты
// 1) активировать форму
// 2) запустить валидацию
// 3) сделать запрос за данными и передать их в метод для отрисовки
const startWorking = () => {
  activationForm();
  validationForm();
  getSimilarObjects();
};

// Деактивация формы до загрузки карты
deactivationForm();
deactivationFilterForm();

// Подписка на событие загрузки карты
isMapLoad(startWorking);
