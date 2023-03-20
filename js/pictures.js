import {createAllForm} from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const pictureList = createAllForm();

const createPicture = function(){
  pictureList.forEach(({url, description, likes, comments}) => {
    const pictureThumbnail = pictureTemplate.cloneNode(true);

    pictureThumbnail.querySelector('.picture__img').src = url;
    pictureThumbnail.querySelector('.picture__img').alt = description;
    pictureThumbnail.querySelector('.picture__likes').textContent = likes;
    pictureThumbnail.querySelector('.picture__comments').textContent = comments.length;

    fragment.append(pictureThumbnail);
    return fragment;
  });
};

const addPicture = function(){
  createPicture();
  pictureContainer.append(fragment);
};
export { addPicture };
