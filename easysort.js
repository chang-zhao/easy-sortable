$(document).ready(function(){

$.fn.draggable = function(){
    // функция отмены выделения текста
    function disableSelection(){
        return false;
    }
    // нажали на элементе - всё включаем
    $(this).mousedown(function(e){
        // берём этот элемент
        var drag = $(this);
        // добавляем ему атрибут (используем как селектор css)
        $(drag)[0].setAttribute('data-1','moving');

        // обрамляющий контейнер:
        var parent = drag.parent();
        // верхняя граница контейнера
        var posParentTop = parent.offset().top;
        // нижняя граница контейнера
        var posParentBottom = posParentTop + parent.height();

        // размер и исходное положение элемента:
        var height = drag.height();
        // половина его высоты
        var middle = drag.height()/2;
        // позиция по средней линии
        var pos = drag.offset().top + middle;
        // коррекция относительно позиции курсора при нажатии
        var posCorrection = e.pageY - pos;

        // поднимаем нажатый элемент по z-оси
        drag.css({'z-index':2, 'top': 'auto'});

        // перетягиваем элемент
        var mouseMove = function(e){
            // получаем новые динамические координаты элемента
            pos = e.pageY - posCorrection;

            // соседи элемента и линии обмена с ними:
            // предыдущий элемент (если он существует)
            var prevEl = drag.prev();
            if (prevEl.length > 0) {
                // сохраняем верхнюю границу
                var prevTop = prevEl.offset().top;
                // линия обмена эл-тов - на середине их суммарной высоты
                var posGoUp = prevTop + prevEl.height()/2 + middle;
            }

            // следующий элемент - если он существует,
            // то линия обмена - на середине их суммарной высоты
            var nextEl = drag.next();
            if (nextEl.length > 0) {
                // сохраняем верхнюю границу
                var nextTop = nextEl.offset().top;
                // линия обмена эл-тов - на середине их суммарной высоты
                var posGoDown = nextTop + nextEl.height()/2 - middle;
            }
            // если элемент тянут выше верхней границы контейнера
            if (pos < (posParentTop + middle)){
                // устанавливаем позицию элемента, равную позиции родителя
                drag.offset({'top': posParentTop});

                // меняем элемент с предыдущим в DOM, если тот существует
                if (posGoUp)
                    drag.insertBefore(prevEl);

            // если элемент тянут ниже нижней границы контейнера
            } else if ((pos + middle) > posParentBottom){
                // устанавливаем позицию элемента, равную
                // нижней границе родителя - высота элемента
                drag.offset({'top': (posParentBottom - height)});
                // меняем элемент со следующим в DOM, если тот существует
                if (posGoDown)
                    drag.insertAfter(nextEl);

            // если элемент в пределах контейнера
            } else {

                // обновляем позицию элемента, вслед за курсором
                drag.offset({'top': (pos - middle)});

                // если середина элемента заходит за линию обмена вверх
                if (posGoUp && (posGoUp > pos)) {
                    // меняем элемент с предыдущим в DOM
                    drag.insertBefore(prevEl.css("top", 0)).css("top", 0);
                    drag.offset({'top': (pos - middle)});

                    // если середина элемента заходит за линию обмена вниз
                } else if (posGoDown && (posGoDown < pos)){
                    // меняем элемент со следующим в DOM
                    drag.insertAfter(nextEl.css("top", 0)).css("top", 0);
                    drag.offset({'top': (pos - middle)});
                }
            }
        };
        // отпускаем клавишу мыши
        var mouseUp = function() {
            $(drag)[0].removeAttribute('data-1');
            // завершаем выполнение функции
            $(document).off('mousemove', mouseMove).off('mouseup', mouseUp);
            // отключаем функцию отмены выделения текста
            $(document).off('mousedown', disableSelection);
            // плавно возвращаем элемент на ближайшее освободившееся место
            // и возвращаем z-позицию на уровень остальных элементов
            drag.css({'top':0, 'z-index':1, 'background-color':'transparent'});

            // здесь можно сохранить новый порядок элементов
            // (cookie или post-запрос на сервер, зависит от поставленной задачи)
        };
        // подключаем выполнение функций перемещения и клавиш мыши,
        // завершаем выполнение функции, если нажата правая клавиша мыши
        $(document).on('mousemove', mouseMove).on('mouseup', mouseUp).on('contextmenu', mouseUp);
        // включаем функцию отмены выделения текста
        $(document).on('mousedown', disableSelection);
        // завершаем выполнение, если окно потеряло фокус (например, переключение на другую вкладку)
        $(window).on('blur', mouseUp);
    });
};

$('.drag').draggable();

});
