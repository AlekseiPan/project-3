import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

import { isEscEvent } from './util.js';

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const pictures = document.querySelector('.pictures');
const openUploadFile = pictures.querySelector('#upload-file');
const closeUploadFile = pictures.querySelector('#upload-cancel');
const imgUploadOverlay = pictures.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const scaleSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
const scaleBigger = imgUploadOverlay.querySelector('.scale__control--bigger');
const scaleValue = imgUploadOverlay.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadOverlay.querySelector(
  '.img-upload__preview > img',
);
const effectLevelValue = pictures.querySelector('.effect-level__value');
const hashtags = pictures.querySelector('.text__hashtags');
const description = pictures.querySelector('.text__description');

const sliderElement = pictures.querySelector('.img-upload__effect-level');

const original = pictures.querySelector('#effect-none');
const chrome = pictures.querySelector('#effect-chrome');
const sepia = pictures.querySelector('#effect-sepia');
const marvin = pictures.querySelector('#effect-marvin');
const phobos = pictures.querySelector('#effect-phobos');
const heat = pictures.querySelector('#effect-heat');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  start: 0,
  connect: 'lower',
});

const closeUploading = () => {
  if (
    hashtags !== document.activeElement &&
    description !== document.activeElement
  ) {
    openUploadFile.value = '';
    imgUploadPreview.style.transform = 'scale(1.0)';
    scaleValue.value = '100%';
    // imgUploadPreview.style.filter = 'grayscale(0)';
    // imgUploadPreview.style.filter = 'sepia(0)';
    // imgUploadPreview.style.filter = 'invert(0%)';
    // imgUploadPreview.style.filter = 'blur(0px)';
    // imgUploadPreview.style.filter = 'brightness(1)';
    imgUploadPreview.style.filter = '';
    sliderElement.noUiSlider.reset();
    description.value = '';
    hashtags.value = '';
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

openUploadFile.addEventListener('input', () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      closeUploading();
    }
  });
});

closeUploadFile.addEventListener('click', () => {
  closeUploading();
});

scaleSmaller.addEventListener('click', () => {
  const currentValue = parseInt(scaleValue.value);
  if (currentValue > Scale.MIN) {
    const newValue = currentValue - Scale.STEP;
    scaleValue.value = newValue + '%';
    imgUploadPreview.style.transform = `scale(${newValue / 100})`;
  }
});

scaleBigger.addEventListener('click', () => {
  const currentValue = parseInt(scaleValue.value);
  if (currentValue < Scale.MAX) {
    const newValue = currentValue + Scale.STEP;
    scaleValue.value = newValue + '%';
    imgUploadPreview.style.transform = `scale(${newValue / 100})`;
  }
});

const slider = document.querySelector('.img-upload__effect-level');

original.addEventListener('click', () => {
  // sliderElement.noUiSlider.reset();
  slider.style.display = 'none';
});

const preparingSlider = () => {
  slider.style.display = 'block';
  sliderElement.noUiSlider.reset();
  imgUploadPreview.style.filter = '';
};

chrome.addEventListener('click', () => {
  preparingSlider();
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 0,
  });
  sliderElement.noUiSlider.on('update', (values, handle) => {
    const value = values[handle];
    console.log(value);
    effectLevelValue.value = value;
    imgUploadPreview.style.filter = `grayscale(${value})`;
  });
});

sepia.addEventListener('click', () => {
  preparingSlider();
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 0,
  });
  sliderElement.noUiSlider.on('update', (values, handle) => {
    const value = values[handle];
    effectLevelValue.value = value;
    imgUploadPreview.style.filter = `sepia(${value})`;
  });
});

marvin.addEventListener('click', () => {
  preparingSlider();
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 0,
  });
  sliderElement.noUiSlider.on('update', (values, handle) => {
    const value = values[handle];
    effectLevelValue.value = value;
    imgUploadPreview.style.filter = `invert(${value}%)`;
  });
});

phobos.addEventListener('click', () => {
  preparingSlider();
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 0,
  });
  sliderElement.noUiSlider.on('update', (values, handle) => {
    const value = values[handle];
    effectLevelValue.value = value;
    imgUploadPreview.style.filter = `blur(${value}px)`;
  });
});

heat.addEventListener('click', () => {
  preparingSlider();
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 0,
  });
  sliderElement.noUiSlider.on('update', (values, handle) => {
    const value = values[handle];
    effectLevelValue.value = value;
    imgUploadPreview.style.filter = `brightness(${value})`;
  });
});

export { closeUploading };
