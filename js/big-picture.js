
import { isEscapeDown } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const commentContainer = document.querySelector('.social__comments');
const commentTemplate = commentContainer.querySelector('.social__comment');
const closePictureElement = document.querySelector('#picture-cancel');


const renderComments = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment ;
};

const showComments = (comments) => {
  commentContainer.innerHTML = '';
  const commentFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentFragment.append(renderComments(comment));
  });
  commentContainer.append(commentFragment);
};


const renderPictureDetails = ({ url, likes, description, comments}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
  showComments(comments);
};

const onDocumentKeyDown = (evt) => {
  if(isEscapeDown){
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeyDown);
}

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal.open');
  commentsLoader.classList.add('hidden');
  commentsCount.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeyDown);
  closePictureElement.addEventListener('click', closeBigPicture);
  renderPictureDetails(data);
};

const showFullPicture = (pictureList) => {
  const checkIdOfPicture = function(evt) {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    const picture = pictureList.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );
    showBigPicture(picture);
  };
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach(() => addEventListener('click', checkIdOfPicture)
  );
};

export { showFullPicture };
