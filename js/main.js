import { createAllForm } from './data.js';
import { showFullPicture } from './big-picture.js';
<<<<<<< Updated upstream
=======
import { setUserFormSubmit, closeModalOnSubmit, closeModalOnError } from './form.js';
import { addPicture } from './pictures.js';
import { getData } from './api.js';
import './form.js';
import './effect.js';
>>>>>>> Stashed changes

const pictureList = createAllForm();

getData()
  .then((data) => {
    addPicture(data);
    showFullPicture(pictureList);
  });

setUserFormSubmit(closeModalOnSubmit, closeModalOnError);

