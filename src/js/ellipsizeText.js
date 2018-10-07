/**
 * Обрезает заголовок по высоте и добавляет `...` если больше 2 строк
 * @param el
 */
function ellipsizeText(el) {
    for (let i = 0; i < el.length; i++) {
        let wordArray = el[i].innerHTML.split(' ');

        while (el[i].scrollHeight > el[i].offsetHeight) {
            wordArray.pop();
            el[i].innerHTML = wordArray.join(' ') + '...';

        }
    }
}

export default ellipsizeText;