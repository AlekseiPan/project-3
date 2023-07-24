import { sendData } from './api.js';
import { showMessageError } from './api.js';

const HASHTAGS_NUMBER = 5;
const DESCRIPTION_LENGTH = 140;

const HashtagLength = {
  MIN: 2,
  MAX: 20,
};

const pictures = document.querySelector('.pictures');
const hashtags = pictures.querySelector('.text__hashtags');
const description = pictures.querySelector('.text__description');
const postForm = pictures.querySelector('.img-upload__form');
const buttonSubmit = pictures.querySelector('.img-upload__submit');

const validateFirstCharacter = (input) => {
  const patternFirstCharacter = /^#(?:[^ ]?)+(\s#(?:[^ ]+)?)*$/;
  return patternFirstCharacter.test(input);
};

const validateLettersNumbers = (input) => {
  const patternLettersNumbers = /^.[a-zA-Z0-9]+(\s.[a-zA-Z0-9]+)*$/;
  return patternLettersNumbers.test(input);
};

const validateField = (input) => {
  const hashtagsArray = input.value.split(' ');

  if (hashtagsArray.length > HASHTAGS_NUMBER) {
    return 'too many hashtags';
  }

  const duplicates = [];

  for (let i = 0; i < hashtagsArray.length; i++) {
    const hashtag = hashtagsArray[i].toLowerCase();

    if (
      hashtag.length < HashtagLength.MIN ||
      hashtag.length > HashtagLength.MAX
    ) {
      return 'wrong length';
    }

    if (duplicates.includes(hashtag)) {
      return 'same hashtags';
    } else {
      duplicates.push(hashtag);
    }
  }
  return false;
};

const redFrame = (input) => {
  const clickButtonSubmitHandler = () => {
    if (!input.checkValidity()) {
      input.style.border = '5px solid red';
      buttonSubmit.removeEventListener('click', clickButtonSubmitHandler);
    }
  };

  buttonSubmit.addEventListener('click', clickButtonSubmitHandler);
};

hashtags.addEventListener('input', () => {
  if (hashtags.style.border !== '') {
    hashtags.style.border = '';
  }
  if (hashtags.value === '') {
    hashtags.setCustomValidity('');
  } else if (validateFirstCharacter(hashtags.value) === false) {
    redFrame(hashtags);
    hashtags.setCustomValidity('Хэш-тег начинается с символа #');
  } else if (validateLettersNumbers(hashtags.value) === false) {
    redFrame(hashtags);
    hashtags.setCustomValidity(
      'Хэш-тег после решётки должна состоять только из букв и чисел',
    );
  } else if (validateField(hashtags) === 'wrong length') {
    redFrame(hashtags);
    hashtags.setCustomValidity(
      `Длина одного хэш-тега должна составлять от ${HashtagLength.MIN} до ${HashtagLength.MAX} символов`,
    );
  } else if (validateField(hashtags) === 'same hashtags') {
    redFrame(hashtags);
    hashtags.setCustomValidity(
      'Один и тот же хэш-тег не может быть использован дважды (хэш-теги нечувствительны к регистру)',
    );
  } else if (validateField(hashtags) === 'too many hashtags') {
    redFrame(hashtags);
    hashtags.setCustomValidity(
      `Нельзя указать больше ${HASHTAGS_NUMBER} хэш-тегов`,
    );
  } else {
    hashtags.setCustomValidity('');
  }

  hashtags.reportValidity();
});

description.addEventListener('input', () => {
  const valueLength = description.value.length;
  if (valueLength > DESCRIPTION_LENGTH) {
    redFrame(description);
    description.setCustomValidity(
      `Длина комментария не может составлять больше ${DESCRIPTION_LENGTH} символов`,
    );
  } else {
    description.setCustomValidity('');
  }
  description.reportValidity();
});

const setUserFormSubmit = (onSuccess) => {
  postForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => showMessageError(),
      new FormData(evt.target),
    );

    // const formData = new FormData(evt.target);

    // fetch('https://23.javascript.pages.academy/kekstagram', {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       onSuccess();
    //     } else {
    //       showAlert('Не удалось отправить данный. Попробуйте еще раз');
    //     }
    //   })
    //   .catch(() => {
    //     showAlert('Не удалось отправить данный. Попробуйте еще раз');
    //   });
  });
};

export { setUserFormSubmit };
