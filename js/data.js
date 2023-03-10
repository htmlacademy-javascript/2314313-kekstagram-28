import { getRandomInteger, getUniqueRandomInteger, getRandomArrayElement } from './util.js';
const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 10;
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'David',
  'Mary',
  'Tom',
  'Linda',
  'Max',
];

const DESCRIPTION = [
  'Это я в Дубае',
  'В коридоре',
  'Ем',
];

const getUniqueRandomIntegerIdUrl = getUniqueRandomInteger(1, PICTURE_COUNT);
const getUniqueRandomIntegerCommentsId = getUniqueRandomInteger(1, Math.pow(2, 53));
const getUniqueRandomIntegerCommentsAvatar = getUniqueRandomInteger(1, AVATAR_COUNT);


const createMessage = () =>
  Array.from({ length: getRandomInteger(1, 2) }, () => getRandomArrayElement(MESSAGE)).join(' ');

const createComment = () => ({
  id: getUniqueRandomIntegerCommentsId(),
  avatar: `img/avatar-${getUniqueRandomIntegerCommentsAvatar()}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createForm = () => ({
  id: getUniqueRandomIntegerIdUrl(),
  url: `photos/${getUniqueRandomIntegerIdUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from({ length: getRandomInteger(0, COMMENT_COUNT) }, () => createComment()),
});

const createAllForm = () => Array.from({ length: PICTURE_COUNT }, () => createForm());

export { createAllForm };
