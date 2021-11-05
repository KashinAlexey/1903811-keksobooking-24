import {createMarker} from './map.js';
import {showErrorAlert} from './util.js';
import {isMapLoad} from './map.js';

// Вывод полученных с сервера объектов на карту
const renderSimilarOblects = (similarOblects) => {
  similarOblects.forEach(({author, location, offer}) => {
    createMarker(author, location, offer);
  });
};

// Активация формы, отрисовка меток при успешной загрузке карты
isMapLoad(renderSimilarOblects, showErrorAlert);

