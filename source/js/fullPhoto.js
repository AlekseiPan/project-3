import { isEscEvent } from './util.js';

const COMMENTS_LOAD_STEP = 5;

const fullPhoto = document.querySelector('.big-picture');
const listComments = document.querySelector('.social__comments');
const itemComment = listComments.querySelector('.social__comment');
const commentCount = fullPhoto.querySelector('.social__comment-count');
const commentsLoader = fullPhoto.querySelector('.comments-loader');

let fragmentComments = document.createDocumentFragment();
const body = document.querySelector('body');
const fullPhotoCancel = document.querySelector('.big-picture__cancel');

let commentsLoaded = [];
let commentsCount = COMMENTS_LOAD_STEP;

const onFullPhotoCloseClick = () => {
  fullPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  fullPhotoCancel.removeEventListener('click', onFullPhotoCloseClick);
  document.removeEventListener('keydown', onFullPhotoEscKeyDown);
  commentsCount = COMMENTS_LOAD_STEP;
  commentsLoaded = [];
};

const renderComment = (comment) => {
  const newItemComment = itemComment.cloneNode(true);
  newItemComment.querySelector('.social__picture').src = comment.avatar;
  newItemComment.querySelector('.social__picture').alt = comment.name;
  newItemComment.querySelector('.social__text').textContent = comment.message;
  return newItemComment;
};

const renderComments = (comments) => {
  const onCommentsLoaderHandler = () => {
    renderComments(comments);
  };

  commentsCount =
    comments.length < COMMENTS_LOAD_STEP ? comments.length : commentsCount;
  commentsLoaded = comments.slice(0, commentsCount);

  commentCount.textContent = `${commentsLoaded.length} из ${comments.length} комментариев`;

  listComments.innerHTML = '';

  commentsLoaded.map((comment) => {
    fragmentComments.appendChild(renderComment(comment));
  });
  listComments.appendChild(fragmentComments);

  if (
    comments.length > COMMENTS_LOAD_STEP &&
    commentsLoaded.length < comments.length
  ) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', onCommentsLoaderHandler, {
      once: true,
    });
  } else {
    commentsLoader.classList.add('hidden');
  }

  commentsCount += COMMENTS_LOAD_STEP;
};

const onFullPhotoEscKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    onFullPhotoCloseClick();
  }
};

const show = (post) => {
  body.classList.add('modal-open');
  fullPhoto.classList.remove('hidden');
  listComments.innerHTML = '';

  fullPhoto.querySelector('.big-picture__img > img').src = post.url;
  fullPhoto.querySelector('.likes-count').textContent = post.likes;

  fullPhoto.querySelector('.social__caption').textContent = post.description;

  renderComments(post.comments);

  fullPhotoCancel.addEventListener('click', onFullPhotoCloseClick);
  document.addEventListener('keydown', onFullPhotoEscKeyDown);
};

export { show };
