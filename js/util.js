// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomIntegerInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно с указанным "количеством знаков после запятой"
const getRandomFloatInclusive = (min, max, simbolsCount) => +((Math.random() * (max - min)) + min).toFixed(simbolsCount);

// Функция, возвращающая новый массив случайной длины, состоящий из неповторящихся элементов принимаего массива
const getNewRandomArray = (elements) => elements.slice(0, getRandomIntegerInclusive(1, elements.length));

export {getRandomIntegerInclusive, getRandomFloatInclusive, getNewRandomArray};
