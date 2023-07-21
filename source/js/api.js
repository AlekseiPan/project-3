import { isEscEvent } from './util.js';

const body = document.querySelector('body');

const showMessage = (templateId, messageClass) => {
  const messageTemplate = document.querySelector(`#${templateId}`).content;
  const newMessageTemplate = messageTemplate.querySelector(`.${messageClass}`);
  const message = newMessageTemplate.cloneNode(true);
  body.appendChild(message);
  body.classList.add('modal-open');

  const closeMessage = () => {
    message.classList.add('hidden');
    body.classList.remove('modal-open');
  };

  const buttonCloseMessage = message.querySelector(`.${messageClass}__button`);
  buttonCloseMessage.addEventListener('click', () => {
    closeMessage();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      closeMessage();
    }
  });

  document.addEventListener('click', (evt) => {
    const element = message.querySelector(`.${messageClass}__inner`);
    if (!element.contains(evt.target)) {
      closeMessage();
    }
  });
};

const showMessageSuccess = () => {
  showMessage('success', 'success');
};

const showMessageError = () => {
  showMessage('error', 'error');
};

const getData = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail('Не удалось загрузить данные с сервера. Попробуйте еще раз');
      }
    })
    .then((posts) => {
      onSuccess(posts);
    })
    .catch(() => {
      onFail('Не удалось загрузить данные с сервера. Попробуйте еще раз');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://23.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        showMessageSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData, showMessageError };
