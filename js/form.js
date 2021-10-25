const form = document.querySelector('.ad-form');
const formElements = document.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters');
const mapFilterElements = document.querySelectorAll('.map__filter');

// Функция деактивации формы
const deactivationForm = () => {
  form.classList.add('ad-form--disabled');
  formElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
  mapFilter.classList.add('ad-form--disabled');
  mapFilterElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

// Функция активации формы
const activationForm = () => {
  form.classList.remove('ad-form--disabled');
  formElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
  mapFilter.classList.remove('ad-form--disabled');
  mapFilterElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

export {deactivationForm, activationForm};

