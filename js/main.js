import {createSimilarObject} from './data';

// Формирование массива из 10 сгенерированных элементов - новых объектов (объявлений об аренде)
const SIMILAR_OBJECT_COUNT = 10;
const similarObject = Array.from({length: SIMILAR_OBJECT_COUNT}, createSimilarObject);

similarObject === similarObject; // Временная запись для ESLint
