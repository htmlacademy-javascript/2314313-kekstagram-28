const filterElement = document.querySelector('.img-filters');
const imgFilters = document.querySelector('.img-filters');
const PICTURE_COUNT = 10;
const DEFAULT_TIME = 500;
let pictures = [];
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-random',
};
let currentFilter = Filter.DEFAULT;
const sortRandomly = () => Math.random() - 0.5;
const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length ;

const getFilteredPictures = () => {
  switch(currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, PICTURE_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const debounce = (func, timeout) =>{
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this,args);
    }, timeout);
  };
};

const applyFilter = debounce((callback) => {
  const sortedPictures = getFilteredPictures();
  callback(sortedPictures);
}, DEFAULT_TIME);


const setOnFilterCLick = (callback) => {
  filterElement.addEventListener('click', (evt) => {
    const clickedButton = evt.target;
    if(!clickedButton.classList.contains('img-filters__button')) {
      return;
    }
    if(clickedButton.id === currentFilter){
      return;
    }
    currentFilter = filterElement.querySelector('.img-filters__button--active');
    currentFilter.classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    applyFilter(callback);
  });
};

const initFilters = (loadedPictures, callback) => {
  imgFilters.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setOnFilterCLick(callback);
};

export { initFilters };
