import { createAllForm } from './data.js';
import { addPicture } from './pictures.js';
import { showFullPicture } from './big-picture.js';

const pictureList = createAllForm();
addPicture(pictureList);
showFullPicture(pictureList);
