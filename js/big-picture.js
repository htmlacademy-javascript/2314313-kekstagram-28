
import { isEscapeDown } from './util.js';
import { COMMENTS_PER_PORTION } from './data.js';

const bigPicture = document.querySelector('.big-picture');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const commentContainer = document.querySelector('.social__comments');
const commentTemplate = commentContainer.querySelector('.social__comment');
const closePictureElement = document.querySelector('#picture-cancel');

let commentsShown = 0;

const renderComments = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment ;
};

const showComments = (comments) => {
  commentsShown += COMMENTS_PER_PORTION;
  if(commentsShown >= comments.length){
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  const commentFragment = document.createDocumentFragment();

  for(let i = 0; i < commentsShown; i++){
    commentFragment.append(renderComments(comments[i]));
  }
  commentContainer.innerHTML = '';
  commentContainer.append(commentFragment);
  commentsCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const renderPictureDetails = ({ url, likes, description, comments}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
  const showCommentsWithData = () => showComments(comments);
  showCommentsWithData();
  commentsLoader.addEventListener('click', showCommentsWithData);
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
  commentsShown = 0;
}

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal.open');
  document.addEventListener('keydown', onDocumentKeyDown);
  closePictureElement.addEventListener('click', closeBigPicture);
  renderPictureDetails(data);
};

const showFullPicture = (pictureList) =>{
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
