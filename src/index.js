import './scss/main.scss';


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

        /* Предыдущий зум (сравнивается с последующим для принятия решения - увеличение или уменьшение зума) *.
        this.prevZoom = -1;

        // this.gestureSpace = -1;

        /* Стандартный масштаб камеры */
        this.scale = 1;

        this.init();
    };

    /**
     * Инициализация
     */
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.camera = document.querySelector('.camera');
            this.cameraImg = document.querySelector('.camera__img');
            this.imgFinishPositionX = this.cameraImg.width - 288;
            const imgFinishPositionY = this.cameraImg.height - 230;

            document.querySelector('#log').innerHTML = `scale: ${this.scale}`;
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

                // Запись в лог всех событий
                // for (let i = 0; i < this.gestureCache.length; i++) {
                //     document.querySelector('#log').innerHTML += `<div> id: ${this.gestureCache[i]}</div>`;
                // }
            });

            /**
             * Тач движение
             */
            this.camera.addEventListener('pointermove', (e) => {
                if (!this.currentGesture) {
                    return;
                }

                // this.action.dx = -(this.action.x - e.x) + this.action.currentShiftX;
                // this.action.dy = -(this.action.y - e.y) + this.action.currentShiftY;
                // this.zooms = -(this.action.x - e.x);

                // Если произошло 2 тача
                if (this.gestureCache.length == 2) {
                    this.zoom(e);
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
            this.camera.style.transform = `translate3d(0px,0px,0px)`;
            this.action.dx = 0;
            return;
        }

        // Максимальный поворот вправо
        if (this.action.dx < -this.imgFinishPositionX) {
            this.camera.style.transform = `translate3d(${-this.imgFinishPositionX}px,0px,0px)`;
            this.action.dx = -this.imgFinishPositionX;
            return;
        }

        this.camera.style.transform = `translate3d(${this.action.dx}px, 0px, 0px`;
    }

    /**
     * Зум
     */
    zoom(e) {

        for (let i = 0; i < this.gestureCache.length; i++) {
            if (this.gestureCache[i].pointerId == e.pointerId) {
                this.gestureCache[i] = e;
                break;
            }
        }

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
                document.querySelector('#log').innerHTML = `scale: ${this.scale}`;
            }
            // Если увеличение зума
            if (this.prevZoom < this.gestureSpace) {

                let _dZoom = (this.gestureSpace - this.prevZoom)/100;

                if (this.scale - (_dZoom) >= 3)
                    return;

                this.cameraImg.style.transform = `scale(${this.scale + _dZoom})`;
                this.scale = this.scale + _dZoom;
                document.querySelector('#log').innerHTML = `scale: ${this.scale}`;

            }
            console.log(this.gestureCache[0].clientX);
            // document.querySelector('#log').innerHTML += `<div>${currZoom}</div>`;
        }

        this.prevZoom = this.gestureSpace;

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
}

new Camera();