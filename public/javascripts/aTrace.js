/*Поиск пути*/
function aTrace(lab, io, timeout) {
    clearLab(lab, io);
    /*Алгоритм-трассировка*/
    /*Инициализация*/
    let matrix = [];
    let str = '';

    for (let j = 0; j < lab.length; j++) {
        matrix[j] = [];
        for (let n = 0; n < lab[1].length; n++) {
            if (lab[j][n] === 'wall')
                matrix[j][n] = {
                    y: j,
                    x: n,
                    label: undefined,
                    wall: true
                };
            else
                matrix[j][n] = {
                    y: j,
                    x: n,
                    label: undefined,
                    wall: false
                };
            str = str + matrix[j][n].wall + ' ';
        }
        console.log(str);
        str = '';
    }

    /*Функция проверки ячейки*/
    let checkCell = function (cell) {
        //console.log(cell);
        if (cell !== undefined) {
            if (cell.wall === false && cell.label === undefined) {
                // cell.label = label;
                return true;
            } else return false;
        } else return false;
    };

    /*Проверка на валидность*/
    let validCell = function (y, x) {
        if (y < 0 || x < 0 || y >= lab.length || x >= lab[1].length)
            return false;
        else return true;
    };

    /*Присваивание div метки*/
    function setDivLabel(y, x, label) {
        $("#" + y + '-' + x + '-label').text(label);
    }

    /*Присваиваем метки*/
    function setLabel(y, x, label) {
        setTimeout(function () {
            matrix[y][x].label = label;
            setDivLabel(y, x, label);
            console.log(matrix[y][x].label);
            label = label + 1;
            if (validCell(y - 1, x) && checkCell(matrix[y - 1][x])) {
                setLabel(y - 1, x, label);
            }
            if (validCell(y + 1, x) && checkCell(matrix[y + 1][x])) {
                setLabel(y + 1, x, label);
            }
            if (validCell(y, x - 1) && checkCell(matrix[y][x - 1])) {
                setLabel(y, x - 1, label);
            }
            if (validCell(y, x + 1) && checkCell(matrix[y][x + 1])) {
                setLabel(y, x + 1, label);
            }
            label = label - 1;
            if ($('#' + y + '-' + x).hasClass('finish')) {
                trace(io.exit[0], io.exit[1]);
            }
        }, timeout);
    }

    setLabel(io.enter[0], io.enter[1], 0);

    /*Восстанавливаем путь*/
    let path = [];

    function trace(y, x) {
        setTimeout(function () {
            path.push(matrix[y][x]);
            if (!$("#" + y + "-" + x).hasClass('finish')) {
                $("#" + y + "-" + x).addClass("foot");
            }
            if (matrix[y][x].label !== 0) {
                if (validCell(y + 1, x) && matrix[y + 1][x].label === matrix[y][x].label - 1) {
                    trace(y + 1, x);
                }
                if (validCell(y, x - 1) && matrix[y][x - 1].label === matrix[y][x].label - 1) {
                    trace(y, x - 1);
                }

                if (validCell(y - 1, x) && matrix[y - 1][x].label === matrix[y][x].label - 1) {
                    trace(y - 1, x);
                }
                if (validCell(y, x + 1) && matrix[y][x + 1].label === matrix[y][x].label - 1) {
                    trace(y, x + 1);
                }
            }
        }, timeout);
    }

    //trace(io.exit[0], io.exit[1]);
}
