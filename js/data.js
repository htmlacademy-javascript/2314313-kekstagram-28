import { getRandomInteger, getUniqueRandomInteger, getRandomArrayElement } from './util.js';
const PICTURE_COUNT = 25;
const MAXSCALE = 100;
const MINSCALE = 25;
const STEP = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 10;
const COMMENTS_PER_PORTION = 5;

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

const getUniqueRandomIntegerId = getUniqueRandomInteger(1, PICTURE_COUNT);
const getUniqueRandomIntegerUrl = getUniqueRandomInteger(1, PICTURE_COUNT);
const getUniqueRandomIntegerCommentsId = getUniqueRandomInteger(1, Math.pow(2, 53));

const createMessage = () =>
  Array.from({ length: getRandomInteger(1, 2) }, () => getRandomArrayElement(MESSAGE)).join(' ');

const createComment = () => ({
  id: getUniqueRandomIntegerCommentsId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createForm = () => ({
  id: getUniqueRandomIntegerId(),
  url: `photos/${getUniqueRandomIntegerUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from({ length: getRandomInteger(0, COMMENT_COUNT) }, () => createComment()),
});

const createAllForm = () => Array.from({ length: PICTURE_COUNT }, () => createForm());

export { createAllForm , COMMENTS_PER_PORTION, MAXSCALE, MINSCALE, STEP };

