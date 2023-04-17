const FILES_TYPES = ['jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('.img-upload__start input[type=file]');
const preview = document.querySelector('.img-upload__preview img');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILES_TYPES.some((element) => fileName.endsWith(element));
  if(matches){
    preview.src = URL.createObjectURL(file);
  }
});
