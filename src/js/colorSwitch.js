const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

function startColorRandomize(event) {
    startBtn.setAttribute('disabled', true);
    const intervalRandomizer = setInterval(changeColor, 1000, 1000);
    
    stopBtn.addEventListener('click', stopColorRandomize);

    function stopColorRandomize(event) {
        startBtn.removeAttribute('disabled');
        clearInterval(intervalRandomizer);
    }
}

function changeColor() {
    bodyEl.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', startColorRandomize);