import {createObject} from './data.js';
import {renderPopup} from './popup.js';
import {deactivationForm, activationForm} from './form.js';

// Деактивация формы
deactivationForm();

// Активация формы
activationForm();

// Получаем массив объектов с объявлениями
const similarOblects = createObject();

// Временно отрисовываем данные в окне
renderPopup(similarOblects);
