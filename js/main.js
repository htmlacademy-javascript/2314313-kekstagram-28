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

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getUniqueRandomInteger = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};
const getUniqueRandomIntegerIdUrl = getUniqueRandomInteger(1, PICTURE_COUNT);
const getUniqueRandomIntegerCommentsId = getUniqueRandomInteger(1, Math.pow(2, 53));
const getUniqueRandomIntegerCommentsAvatar = getUniqueRandomInteger(1, AVATAR_COUNT);

const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

const createMessage = () =>
  Array.from({ length: getRandomInteger(1, 2) }, () => getRandomArrayElement(MESSAGE)).join(' ');

const createComment = () => ({
  id: getUniqueRandomIntegerCommentsId(),
  avatar: `img/avatar-${getUniqueRandomIntegerCommentsAvatar()}.svg`,
  message: createMessage(),
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

const createForm = () => ({
    id: getUniqueRandomIntegerIdUrl(),
    url: `photos/${getUniqueRandomIntegerIdUrl()}.jpg`,
    description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
    likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
    comments: Array.from({ length: getRandomInteger(0, COMMENT_COUNT) }, () => createComment()),
  });

const createAllForm = () => Array.from({ length: PICTURE_COUNT }, () => createForm());
createAllForm();
