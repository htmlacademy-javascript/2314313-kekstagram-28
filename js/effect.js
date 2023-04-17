const effectsArray = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const picture = document.querySelector('.img-upload__preview img');
const effects = document.querySelectorAll('.effects__radio');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const DEFAULT_ELEMENT = effectsArray[0];
let choozenEffect = DEFAULT_ELEMENT;
picture.classList.add(`effects__preview--${DEFAULT_ELEMENT.name}`);


const isDefault = () => choozenEffect === DEFAULT_ELEMENT;

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: choozenEffect.min ,
      max: choozenEffect.max,
    },
    start: choozenEffect.max,
    step: choozenEffect.step,
  });
  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};
const onSliderUpdate = () => {
  valueElement.value = sliderElement.noUiSlider.get();
  if (isDefault()){
    picture.style.filter = '';

  } else {
    picture.style.filter = `${choozenEffect.style}(${valueElement.value}${choozenEffect.unit})`;
  }
};

const deletePreviousFilter = () => {
  const previousFilter = Object.values(picture.classList).filter((item) => !(item === 'img-upload__preview'));
  picture.classList.remove(previousFilter);
};

effects.forEach((effect) => {
  effect.addEventListener('click', (evt) => {
    deletePreviousFilter();
    picture.classList.add(`effects__preview--${evt.target.value}`);
    choozenEffect = effectsArray.find((effectArray) => effectArray.name === evt.target.value);
    updateSlider();
    onSliderUpdate();
  });
});

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_ELEMENT.min ,
    max: DEFAULT_ELEMENT.max,
  },
  start: DEFAULT_ELEMENT.max,
  step: DEFAULT_ELEMENT.step,
  connect:'lower',
});

hideSlider();

const resetSlider = () => {
  choozenEffect = DEFAULT_ELEMENT;
  updateSlider();
};

const resetFilter = () => {
  deletePreviousFilter();
  picture.classList.add(`effects__preview--${effectsArray[0].style}`);
  effects.forEach((effect) =>
    effect.checked === false);
  effects[0].checked = true ;
};


sliderElement.noUiSlider.on('update', onSliderUpdate);

export { resetSlider , resetFilter };
