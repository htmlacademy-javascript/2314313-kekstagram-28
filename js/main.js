import { createAllForm } from './data.js';
import { showFullPicture } from './big-picture.js';
import { setUserFormSubmit, closeModalOnSubmit, closeModalOnError } from './form.js';
import { addPicture } from './pictures.js';
import { getData } from './api.js';
import './form.js';
import './effect.js';
import './form.js';
import './effect.js';

const pictureList = createAllForm();

getData()
  .then((data) => {
    addPicture(data);
    showFullPicture(pictureList);
  });

setUserFormSubmit(closeModalOnSubmit, closeModalOnError);

