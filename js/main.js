// Функция, возвращающая случайное целое число из переданного диапазона включительно
function getRandomIntegerInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно с указанным "количеством знаков после запятой"
function getRandomFloatInclusive(min, max, simbolsCount) {
  return +((Math.random() * (max - min + 1)) + min).toFixed(simbolsCount);
}

getRandomIntegerInclusive(2, 7);
getRandomFloatInclusive(2.4, 9.2, 3);

// Проверка корректности ввода min, max, simbolCount будет осуществляться в блоке ввода этих данных
