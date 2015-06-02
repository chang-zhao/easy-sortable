$(document).ready(function(){

$.fn.draggable = function(){
    // функция отмены выделения текста
    function disableSelection(){
        return false;
    }
    // нажали на элементе
    $(this).mousedown(function(e){
        var drag = $(this);
        // присвоили ему класс, настроенный на мгновенные изменения css
        drag.toggleClass('moving');

        // контейнер
        var parent = drag.parent();
        // верхняя граница контейнера
        var posParentTop = parent.offset().top;
        // нижняя граница контейнера
        var posParentBottom = posParentTop + parent.height();

        // размер и исходное положение элемента:
        // его середина по высоте
        var middle = drag.height()/2;
        // позиция по средней линии
        var posOld = drag.offset().top + middle;
        // коррекция относительно позиции курсора при нажатии
        var posOldCorrection = e.pageY - posOld;

        // поднимаем нажатый элемент по z-оси
        drag.css({'z-index':2, 'background-color':'#eeeeee'});

        // перетягиваем элемент
        var mouseMove = function(e){
            // получаем новые динамические координаты элемента
            var posNew = e.pageY - posOldCorrection;

            // соседи элемента и линии обмена с ними:
            // предыдущий элемент (если он существует)
            var prevEl = drag.prev();
            if (prevEl.length > 0) {
                // сохраняем верхнюю границу
                var prevTop = prevEl.offset().top;
                // линия обмена эл-тов - на середине их суммарной высоты
                var posGoUp = prevTop + prevEl.height()/2 + middle;
            }

            // следующий элемент (если он существует)
            // то линия обмена - на середине их суммарной высоты
            var nextEl = drag.next();
            if (nextEl.length > 0) {
                // сохраняем верхнюю границу
                var nextTop = nextEl.offset().top;
                // линия обмена эл-тов - на середине их суммарной высоты
                var posGoDown = nextTop + nextEl.height()/2 - middle;
            }
            // если элемент тянут выше верхней границы контейнера
            if (posNew < (posParentTop + middle)){
                // устанавливаем позицию элемента, равную позиции родителя
                drag.offset({'top': posParentTop});
                // обновляем смещение относительно мыши
                posOldCorrection = e.pageY - middle - posParentTop;
                // меняем элемент с предыдущим в DOM, если тот существует
                // замещаемый элемент двигаем плавно, с анимацией
                if (posGoUp)
                    drag.insertBefore(prevEl.css({'top':-middle-middle}).css({'top':0}));
            // если элемент тянут ниже нижней границы контейнера
            } else if ((posNew + middle) > posParentBottom){
                // устанавливаем позицию элемента, равную
                // нижней границе родителя - высота элемента
                var setPos = posParentBottom - (middle + middle);
                drag.offset({'top': setPos});
                posOldCorrection = e.pageY + middle - posParentBottom;
                // меняем элемент со следующим в DOM, если тот существует
                // замещаемый элемент двигаем плавно, с анимацией
                if (posGoDown)
                    drag.insertAfter(nextEl.css({'top':middle+middle}).css({'top':0}, 100));

            // если элемент в пределах контейнера
            } else {
                // устанавливаем новую высоту (элемент перемещается за курсором)
                drag.offset({'top': (posNew - middle)});

                // если середина элемента заходит за линию обмена вверх
                if (posGoUp && (posGoUp > posNew)) {
                    // помещаем на новую позицию
                    drag.offset({'top': prevTop}); // (prevTop + middle)
                    // меняем элемент с предыдущим в DOM
//                    drag.insertBefore(prevEl.css({'top': -middle-middle}).css({'top': 0}));
                    drag.css({'visibility': 'none'}).insertBefore(prevEl.css({'top': -middle-middle}).css({'top': 0})).css({'visibility': 'visible'});

                    // обновляем позицию
//                    drag.css({'top':0});


                //    drag.css({'top':(posNew - prevTop)});


                    // обновляем координаты исходного и текущего положения
//                    posOld = drag.offset().top + middle;

                    posOld = posNew;

                    // коррекция относительно позиции курсора при нажатии
//                    posOldCorrection = e.pageY - posOld;

//                    posNew = e.pageY - posOldCorrection;

                // если середина элемента заходит за линию обмена вниз
                } else if (posGoDown && (posGoDown < posNew)){
                    // помещаем на новую позицию
                    drag.offset({'top': nextTop}); // (nextTop - middle)
                    // меняем элемент со следующим в DOM
                    drag.css({'visibility': 'none'}).insertAfter(nextEl.css({'top':middle+middle}).css({'top':0})).css({'visibility': 'visible'});
//                    drag.css({'visibility': 'none'}).insertAfter(nextEl.css({'top':middle+middle}).css({'top':0})).css({'visibility': 'visible'});

//                    drag.css({'top':0});


                //    drag.css({'top':(posNew - nextTop)});


//                    posOld = drag.offset().top;
//                    posNew = e.pageY - posOldCorrection;
//                    posOldCorrection = e.pageY - posOld;

//                    drag.insertAfter(nextEl);
                    posOld = posNew;
//                    posOldCorrection = e.pageY - posOld;
                }
            }
        };
        // отпускаем клавишу мыши
        var mouseUp = function() {
            // отключаем класс движущегося элемента
            drag.toggleClass('moving');
            // завершаем выполнение функции
            $(document).off('mousemove', mouseMove).off('mouseup', mouseUp);
            // отключаем функцию отмены выделения текста
            $(document).off('mousedown', disableSelection);
            // плавно возвращаем наш элемент на ближайшее освободившееся место
            drag.css({'top':0, 'z-index':1, 'background-color':'transparent'});
                // возвращаем z-позицию на уровень остальных элементов

            // здесь сохраняем новый порядок элементов
            // (cookie или post-запрос на сервер, зависит от поставленной задачи)
        };
        // подключаем выполнение функций перемещения и отпускания клавиши мыши
        // завершаем выполнение функции, если нажата правая клавиша мыши
        $(document).on('mousemove', mouseMove).on('mouseup', mouseUp).on('contextmenu', mouseUp);
        // включаем функцию отмены выделения текста
        $(document).on('mousedown', disableSelection);
        // завершаем выполнение, если окно потеряло фокус (например, переключение на другую вкладку)
        $(window).on('blur', mouseUp);
    });
}

$('.drag').draggable();

});
