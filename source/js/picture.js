const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const openUploadFile = document.querySelector('#upload-file');
const imgUploadPreview = document.querySelector('.img-upload__preview > img');
const previews = document.querySelectorAll('.effects__preview');

openUploadFile.addEventListener('change', () => {
  const file = openUploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imgUploadPreview.src = reader.result;

      previews.forEach((filter) => {
        filter.style.backgroundImage = `url(${reader.result})`;
      });
    });

    reader.readAsDataURL(file);
  }
});
