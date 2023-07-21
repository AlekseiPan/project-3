import { generateNonRepeatingRandomNumbers } from './util.js';

const NonRepeatingRandomNumber = {
  COUNT: 10,
  MAX: 24,
};

const buttonFilterDefault = document.querySelector('#filter-default');
const buttonFilterRandom = document.querySelector('#filter-random');
const buttonFilterDiscussed = document.querySelector('#filter-discussed');

const randomPosts = (posts) => {
  const result = generateNonRepeatingRandomNumbers(
    NonRepeatingRandomNumber.COUNT,
    NonRepeatingRandomNumber.MAX,
  ).map((num) => posts[num]);
  return result;
};

const discussedPosts = (posts) => {
  for (let i = 0; i < posts.length; i++) {
    let maxValue = posts[i].comments;
    let maxIndex = i;

    for (let j = i + 1; j < posts.length; j++) {
      if (posts[j].comments > maxValue) {
        maxValue = posts[j].comments;
        maxIndex = j;
      }
    }
    if (maxIndex !== i) {
      let swap = posts[i];
      posts[i] = posts[maxIndex];
      posts[maxIndex] = swap;
    }
  }
  return posts;
};

const clearListPictures = (evt) => {
  let listPictures = document.querySelectorAll('.picture');
  listPictures.forEach((picture) => {
    picture.remove();
    document
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  });
};

const setRandomPosts = (cb) => {
  buttonFilterRandom.addEventListener('click', (evt) => {
    clearListPictures(evt);
    cb();
  });
};

const setDefaultPosts = (cb) => {
  buttonFilterDefault.addEventListener('click', (evt) => {
    clearListPictures(evt);
    cb();
  });
};

const setDiscussedPosts = (cb) => {
  buttonFilterDiscussed.addEventListener('click', (evt) => {
    clearListPictures(evt);
    cb();
  });
};

export {
  randomPosts,
  discussedPosts,
  setRandomPosts,
  setDefaultPosts,
  setDiscussedPosts,
};
