/* global _:readonly */

import { closeUploading } from './uploadPhoto.js';
import './validation.js';
import { renderPosts } from './render-posts.js';
import { showAlert } from './util.js';
import { setUserFormSubmit } from './validation.js';
import { getData } from './api.js';
/* eslint-disable comma-dangle */
import {
  randomPosts,
  discussedPosts,
  setRandomPosts,
  setDefaultPosts,
  setDiscussedPosts,
} from './filter.js';
import './picture.js';

const RERENDER_DELAY = 500;

const filters = document.querySelector('.img-filters');

// const searchImages = () => {
//   return new Promise((resolve) => {
//     const pictures = document.querySelectorAll('.picture__img');
//     resolve(pictures);
//   });
// };

// const loadingFilters = () => {
//   return new Promise(() => {
//     const isEveryPictureLoading = pictures.every((picture) => {
//       picture.onload = () => {
//         filters.style.opacity = 1;
//       };
//     });
//   });
// };

// searchImages().then((pictures) => console.log(pictures));

// Promise.all(pictures).then(() => {
//   filters.style.opacity = 1;
// });

// renderPosts();

// fetch('https://23.javascript.pages.academy/kekstagram/data')
//   .then((response) => response.json())
//   .then((posts) => {
//     renderPosts(posts);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

getData(
  (posts) => {
    const data = posts.slice();
    renderPosts(data.slice());
    filters.style.opacity = 1;

    setRandomPosts(
      _.debounce(() => {
        renderPosts(randomPosts(data.slice()));
      }, RERENDER_DELAY),
    );

    setDiscussedPosts(
      _.debounce(() => {
        renderPosts(discussedPosts(data.slice()));
      }, RERENDER_DELAY),
    );

    setDefaultPosts(
      _.debounce(() => renderPosts(data.slice()), RERENDER_DELAY),
    );
  },
  () => showAlert('Не удалось загрузить данные с сервера. Попробуйте еще раз'),
);

// fetch('https://23.javascript.pages.academy/kekstagram/data')
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       showAlert('Не удалось загрузить данные с сервера. Попробуйте еще раз');
//     }
//   })
//   .then((posts) => {
//     renderPosts(posts);
//   })
//   .catch(() => {
//     showAlert('Не удалось загрузить данные с сервера. Попробуйте еще раз');
//   });

setUserFormSubmit(closeUploading);
