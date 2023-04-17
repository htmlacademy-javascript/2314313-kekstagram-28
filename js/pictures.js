
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();


const createPicture = (pictureList) => {
  pictureList.forEach(({id, url, description, likes, comments}) => {
    const pictureThumbnail = pictureTemplate.cloneNode(true);
    pictureThumbnail.dataset.thumbnailId = id;

    pictureThumbnail.querySelector('.picture__img').src = url;
    pictureThumbnail.querySelector('.picture__img').alt = description;
    pictureThumbnail.querySelector('.picture__likes').textContent = likes;
    pictureThumbnail.querySelector('.picture__comments').textContent = comments.length;

    fragment.append(pictureThumbnail);
    return fragment;
  });
};

const addPicture = (pictureList) => {
  createPicture(pictureList);
  pictureContainer.append(fragment);
};

const removePictures = () => {
  document.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
};

export { addPicture, removePictures };
