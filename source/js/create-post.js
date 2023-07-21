import { generateNonRepeatingRandomNumbers, getRandomInt } from './util.js';

const PHOTO_COUNT = 25;

const NonRepeatingRandomNumbers = {
  COUNT: 1000,
  MAX: 1000,
};

const Avatars = {
  MIN: 1,
  MAX: 6,
};

const Comments = {
  MIN: 1,
  MAX: 3,
};

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = [
  'Ипполит',
  'Хитрый Лис',
  'Академик Антонова',
  'собака Павлова',
  'Алевтина',
  'Бэйби',
];

const posts = [];

// COMMENTS
// id

let generateNonRepeatingRandomCommentId = generateNonRepeatingRandomNumbers(
  NonRepeatingRandomNumbers.COUNT,
  NonRepeatingRandomNumbers.MAX,
);

const createCommentId = () => {
  const commentId = generateNonRepeatingRandomCommentId[0];
  generateNonRepeatingRandomCommentId.splice(0, 1);
  return commentId;
};

const createComment = () => {
  return {
    id: createCommentId(),
    avatar: 'img/avatar-' + getRandomInt(Avatars.MIN, Avatars.MAX) + '.svg',
    message: messages[getRandomInt(0, messages.length - 1)],
    name: names[getRandomInt(0, names.length - 1)],
  };
};

// POST
// id

const createPost = () => {
  for (let i = 1; i <= PHOTO_COUNT; i++) {
    posts.push({
      id: i,
      url: '/photos/' + i + '.jpg',
      description: 'Это фото сделано на iphone 3G',
      likes: getRandomInt(15, 200),
      comments: new Array(getRandomInt(Comments.MIN, Comments.MAX))
        .fill(null)
        .map(() => createComment()),
    });
  }
  return posts;
};

export { createPost };
export { posts };
