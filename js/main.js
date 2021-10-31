import {createObject} from './data.js';
import {createMarker} from './map.js';

// Получаем массив объектов с объявлениями
const similarOblects = createObject();

// Добавляем на карту метки из массива объектов
similarOblects.forEach(({author, offer}) => {
  createMarker(author, offer);
});
