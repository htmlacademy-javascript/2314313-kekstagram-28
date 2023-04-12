const MAXSCALE = 100;
const MINSCALE = 25;
const STEP = 25;
const scaleInput = document.querySelector('.scale__control--value');
const scaleImg = document.querySelector('.img-upload__preview');

scaleInput.value = '100%';


const onscaleSmallClick = () => {
  let scaleNumber = parseInt(scaleInput.value, 10);
  if(scaleNumber > MINSCALE && scaleNumber <= MAXSCALE) {
    scaleNumber -= STEP;
  }
  scaleInput.value = `${scaleNumber}%`;
  scaleImg.style.transform = `scale(${scaleNumber / 100})`;
};

const onScaleBigClick = () => {
  let scaleNumber = parseInt(scaleInput.value, 10);
  if(scaleNumber >= MINSCALE && scaleNumber < MAXSCALE) {
    scaleNumber += STEP;
  }
  scaleInput.value = `${scaleNumber}%`;
  scaleImg.style.transform = `scale(${scaleNumber / 100})`;
};

const resetScale = () =>{
  scaleInput.value = '100%';
};

export { onScaleBigClick, onscaleSmallClick, resetScale };
