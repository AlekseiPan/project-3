import { show } from './fullPhoto.js';

const list = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();
const postTemplate = document.querySelector('#picture').content;
const newItemTemplate = postTemplate.querySelector('.picture');

let renderPost = (post) => {
  const newElement = newItemTemplate.cloneNode(true);

  newElement.querySelector('.picture__img').src = post.url;

  newElement.querySelector('.picture__likes').textContent = post.likes;

  newElement.querySelector('.picture__comments').textContent =
    post.comments.length;

  newElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    show(post);
  });

  return newElement;
};

const renderPosts = (posts) => {
  posts.map((post) => {
    fragment.appendChild(renderPost(post));
  });
  list.appendChild(fragment);
  return list;
};

export { renderPosts, list };
