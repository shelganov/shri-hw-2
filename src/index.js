import './scss/main.scss';

const MAX_BRIGHT_VALUE = 1;

class Camera {
    constructor() {
        /* Активный жест */
        this.currentGesture = null;

        this.action = {
            // начальная координата тача (при нажатии)
            x: 0,
            y: 0,
            // дельта координаты тача
            dx: 0,
            dy: 0,
            // текущее смещение координаты
            currentShiftX: 0,
            currentShiftY: 0
        };

        /* Массив жестов */
        this.gestureCache = [];

        /* Контейнер для камеры */
        this.camera = null;

        /* Конец картинки по оси Х (для отлова правой границы картинки) */
        this.imgFinishPositionX = null;

        /* Предыдущий зум (сравнивается с последующим для принятия решения - увеличение или уменьшение зума) */
        this.prevZoom = -1;

        // this.gestureSpace = -1;

        /* Стандартный масштаб камеры */
        this.scale = 1;

        this.brightness = 0.5;

        this.prevRotate = 0;

        
        this.init();
    };

    /**
     * Инициализация
     */
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.camera = document.querySelector('.camera');
            this.cameraImg = document.querySelector('.camera__img');
            this.imgFinishPositionX = this.cameraImg.width - document.querySelector('.card__img').offsetWidth;
            this.imgFinishPositionY = this.cameraImg.height - document.querySelector('.card__img').offsetHeight;
            this.scroll = document.querySelector('.card__img-scroll');
            document.querySelector('#brightness').innerText = `${this.brightness.toFixed(2) * 100}%`;

            // console.log(document.querySelector('.card__img').offsetWidth);
            // document.querySelector('#log').innerHTML = `scale: ${this.scale}`;
            /**
             * Тач старт
             */
            this.camera.addEventListener('pointerdown', (e) => {
                this.currentGesture = true;
                this.gestureCache.push(e);

                // Координата тач старта
                this.action.x = e.x;
                this.action.y = e.y;
                this.camera.setPointerCapture(e.pointerId);

                console.log(e);
            });

            /**
             * Тач движение
             */
            this.camera.addEventListener('pointermove', (e) => {
                if (!this.currentGesture) {
                    return;
                }

                // Если произошло 2 тача
                if (this.gestureCache.length == 2) {
                    this.updateEvent(e);

                    let angle = (Math.atan2(this.gestureCache[1].y - this.gestureCache[0].y, this.gestureCache[1].x - this.gestureCache[0].x)) * 180 / Math.PI;
                    if (Math.abs(angle) < 20) {
                        this.zoom(e);
                    } else {
                        this.rotate(e);
                    }

                    document.querySelector('#log').innerHTML = ` angle: ${Math.abs(angle)}`;
                } else {
                    this.move(e);
                }
                // this.prevZoom = this.gestureSpace;

            });

            /**
             * Тач конец
             */
            this.camera.addEventListener('pointerup', (e) => {
                this.currentGesture = null;
                this.action.currentShiftX = this.action.dx;
                this.action.currentShiftY = this.action.dy;
                this.removeEvent(e);
                this.prevZoom = -1;
            });

            this.camera.addEventListener('pointercancel', (e) => {
                this.currentGesture = null;
                this.removeEvent(e);
                this.prevZoom = -1;
            });
        });
    }

    /**
     * Движение камерой
     * @param e
     */
    move(e) {
        this.action.dx = -(this.action.x - e.x) + this.action.currentShiftX;
        this.action.dy = -(this.action.y - e.y) + this.action.currentShiftY;

        // Максимальный поворот влево
        if (this.action.dx > 0) {
            this.camera.style.transform = `translate3d(0px,${this.action.dy}px,0px)`;
            this.action.dx = 0;
            return;
        }

        // Максимальный поворот вправо
        if (this.action.dx < -this.imgFinishPositionX) {
            // this.camera.style.transform = `translate3d(${-this.imgFinishPositionX}px,0px,0px)`;
            this.action.dx = -this.imgFinishPositionX;
            return;
        }

        // Максимальный поворот вверх
        if (this.action.dy > 0) {
            this.camera.style.transform = `translate3d(${this.action.dx}px,0px,0px)`;
            this.action.dy = 0;
            return;
        }

        // Максимальный поворот вниз
        if (this.action.dy < -this.imgFinishPositionY) {
            this.action.dy = -this.imgFinishPositionY;
            return;
        }

        // Смещение камеры
        this.camera.style.transform = `translate3d(${this.action.dx}px, ${this.action.dy}px, 0px)`;

        console.log(this.cameraImg.offsetWidth)
        // Смещение скролла
        this.scroll.style.left = `${- (this.action.dx * 100) / (this.imgFinishPositionX)}%`;
        // this.scroll.style.transform = `translateX(${-this.action.dx}px)`;
    }

    /**
     * Зум
     */
    zoom(e) {

        // this.updateEvent(e);

        this.gestureSpace = Math.abs(this.gestureCache[0].clientX - this.gestureCache[1].clientX);

        if (this.prevZoom > 0) {
            // Если уменьшение зума
            if (this.prevZoom > this.gestureSpace) {

                // Изменение зума
                let _dZoom = (this.prevZoom - this.gestureSpace)/100;

                // Запрещаем масштаб меньше 1
                if (this.scale - (_dZoom) <= 1)
                    return;

                this.cameraImg.style.transform = `scale(${this.scale - (_dZoom)})`;
                this.scale = this.scale - _dZoom;
                // document.querySelector('#log').innerHTML = `scale: ${this.scale}`;
            }
            // Если увеличение зума
            if (this.prevZoom < this.gestureSpace) {

                let _dZoom = (this.gestureSpace - this.prevZoom)/100;

                if (this.scale - (_dZoom) >= 3)
                    return;

                this.cameraImg.style.transform = `scale(${this.scale + _dZoom})`;
                this.scale = this.scale + _dZoom;
                // document.querySelector('#log').innerHTML = `scale: ${this.scale}`;

            }
            // console.log(this.gestureCache[0].clientX);
            // document.querySelector('#log').innerHTML += `<div>${currZoom}</div>`;
        }

        this.prevZoom = this.gestureSpace;

    }

    /**
     * Обновляет эвент после движения
     * @param e
     */
    updateEvent(e) {
        for (let i = 0; i < this.gestureCache.length; i++) {
            if (this.gestureCache[i].pointerId == e.pointerId) {
                this.gestureCache[i] = e;
                break;
            }
        }
    }

    rotate(e) {

        // this.updateEvent(e);

        let rotate = Math.atan2(this.gestureCache[1].y - this.gestureCache[0].y, this.gestureCache[1].x - this.gestureCache[0].x);


        // if (Math.abs(rotate - this.prevRotate) > 3) {
        //     rotate = rotate - Math.PI;
        // }


        // Определяем коэффициент изменения
        let dRotate = 1;

        if (rotate > this.prevRotate) {
            dRotate = 1.1;
        } else if (rotate < this.prevRotate) {
            dRotate = 0.9;
        }

        // Определение яркости
        this.brightness = rotate * dRotate;

        if (this.brightness > this.maxBright) {
            this.brightness = 1;
        }

        if (this.brightness <= 0)
            this.brightness = 0;

        this.prevRotate = rotate;

        // let fixedBrightness = this.brightness.toFixed(2) * 100;
        document.querySelector('#brightness').innerText = `${this.brightness.toFixed(2) * 100}%`;
        this.cameraImg.style.webkitFilter = `brightness(${this.brightness}`;
    }

    /**
     * Удаление эвентов
     * @param event
     */
    removeEvent(event) {
        for (let i = 0; i < this.gestureCache.length; i++) {
            if (this.gestureCache[i].pointerId == event.pointerId) {
                this.gestureCache.splice(i, 1);
                break;
            }
        }
    }

    get maxBright() {
        return MAX_BRIGHT_VALUE;
    }
}

new Camera();