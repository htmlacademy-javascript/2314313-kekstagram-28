import { isEscapeDown } from './util.js';
import { onScaleBigClick, onscaleSmallClick, resetScale } from './scale.js';
import { resetSlider } from './effect.js';
import { sendData } from './api.js';


const TAG_ERROR_TEXT = 'Неправильно заполнены хэштеги';
const HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const fileField = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const scaleSmall = document.querySelector('.scale__control--smaller');
const scaleBig = document.querySelector('.scale__control--bigger');
const cancelButton = document.querySelector('#upload-cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errortextClass: 'img-upload__field-wrapper__error',
});
const hasValidCount = (tags) => tags.length <= HASHTAG_COUNT;

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const hasUniqueTags = (tags) => {
  const lowerCaseTag = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTag.length === new Set(lowerCaseTag).size;
};

const validateTages = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim());
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTages,
  TAG_ERROR_TEXT
);

const isTextFieldFocused = () =>
  document.activeElement === commentField ||
  document.activeElement === hashtagField;


const onDocumentKeyDown = (evt) => {
  if(isEscapeDown(evt) && !isTextFieldFocused()){
    evt.preventDefault();
    closeModal();
  }
};

function closeModal() {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
}

const closeElement = (element) =>{
  element.classList.add('hidden');
};

const closeModalSuccess = (closeCallback) => {
  closeCallback();
  const successTemplateElement = successTemplate.cloneNode(true);
  const closerButton = successTemplateElement.querySelector('.success__button');
  closerButton.addEventListener('click', ()=>{
    closeElement(successTemplateElement);
  });
  document.addEventListener('keydown', (evt) => {
    if(isEscapeDown(evt)){
      closeElement(successTemplateElement);
    }
  });
  body.append(successTemplateElement);
};

const closeModalError = (closeCallback) => {
  closeCallback();
  const errorTemplateElement = errorTemplate.cloneNode(true);
  const closerButton = errorTemplateElement.querySelector('.error__button');
  closerButton.addEventListener('click', ()=>{
    closeElement(errorTemplateElement);
  });
  document.addEventListener('keydown', (evt) => {
    if(isEscapeDown(evt)){
      closeElement(errorTemplateElement);
    }
  });
  body.append(errorTemplateElement);
};

const closeModalOnSubmit = () => closeModalSuccess(closeModal);

const closeModalOnError = () => closeModalError(closeModal);

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  scaleBig.addEventListener('click', onScaleBigClick);
  scaleSmall.addEventListener('click', onscaleSmallClick);
  cancelButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeyDown);
  resetSlider();
  resetScale();
};

fileField.addEventListener('change', showModal);
const setUserFormSubmit = (onSuccess, onError) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if(isValid){
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(()=>{
          onError();
        });
    }
  });
};


export { setUserFormSubmit, showModal, closeModalOnSubmit, closeModalOnError };
