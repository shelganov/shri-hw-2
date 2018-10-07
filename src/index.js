import './scss/main.scss';

// import ellipsizeText from './js/ellipsizeText';

/* Активный жест */
let currentGesture = null;

let action = {
    // начальная координата тача (при нажатии)
    x: 0,
    // дельта изменения координаты тача
    dx: 0,
    // текущее смещение координаты
    currentShift: 0
};




document.addEventListener('DOMContentLoaded', function () {
    let image = new Image();
    image.src = './dist/img/flat.jpg';
    console.log(image.offsetWidth);

    let img = document.querySelector('.card__img');
    img.style.backgroundImage = 'url("./dist/img/flat.jpg")';

    // Тач старт
    img.addEventListener('pointerdown', (e) => {
        // console.log(`TOUCH INIT: ${e.offsetX}`);
        // console.log(e);
        // console.log(`==============`);

        currentGesture = true;

        // Координата тач старта
        action.x = e.offsetX;
        img.setPointerCapture(e.pointerId);

        // console.log(getComputedStyle(img));
    });

    // Тач движение
    img.addEventListener('pointermove', (e) => {
        if (!currentGesture)
            return;

        action.dx = -(action.x - e.offsetX) + action.currentShift;

        // Максимальный поворот влево
        if (action.dx > 0) {
            img.style.backgroundPositionX = `0px`;
            return;
        }
        // console.log(`move step: ${action.dx}`);
        img.style.backgroundPositionX = `${action.dx}px`;
    });

    // Тач конец
    img.addEventListener('pointerup', (e) => {
        currentGesture = null;
        action.currentShift = action.dx;
        // console.log(`TOUCH FINISH ${e.offsetX}`);
        // console.log(e);
        // console.log(`==============`);
    });

    img.addEventListener('pointercancel', (e) => {
        currentGesture = null;
    });
});