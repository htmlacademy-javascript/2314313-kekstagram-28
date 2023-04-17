import { showFullPicture } from './big-picture.js';

import { setUserFormSubmit, closeModalOnSubmit, closeModalOnError } from './form.js';
import { addPicture , removePictures} from './pictures.js';
import { getData } from './api.js';
import { initFilters } from './filter.js';
import './form.js';
import './effect.js';
import './avatar.js';
import './filter.js';

getData()
  .then((data) => {
    addPicture(data);
    showFullPicture(data);
    initFilters(data,(pictures) => {
      removePictures();
      addPicture(pictures);
    });
  });

setUserFormSubmit(closeModalOnSubmit, closeModalOnError);

