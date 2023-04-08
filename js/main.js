import { createAllForm } from './data.js';
import { addPicture } from './pictures.js';
import { showFullPicture } from './big-picture.js';
import './form.js';
import './effect.js';

const pictureList = createAllForm();
addPicture(pictureList);
showFullPicture(pictureList);
