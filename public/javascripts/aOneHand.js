/*Поиск пути*/
function aOneHand(lab, io, type) {
    clearLab(lab, io);
    let matrix = [];
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
        }
    }

    /*Проверка на валидность*/
    let validCell = function (y, x) {
        if (y < 0 || x < 0 || y >= lab.length || x >= lab[1].length || matrix[y][x].wall === true)
            return false;
        else return true;
    };

    let y = io.enter[0];
    let x = io.enter[1];

    matrix[y][x].label = true;

    let stack = [];
    let current = {};

    if (type === 'dynamic-time') {
        let intervalID = setInterval(function () {
            if ((validCell(y - 1, x) && matrix[y - 1][x].label === undefined) || (validCell(y + 1, x) && matrix[y + 1][x].label === undefined) || (validCell(y, x - 1) && matrix[y][x - 1].label === undefined) || (validCell(y, x + 1) && matrix[y][x + 1].label === undefined)) {
                stack.push(matrix[y][x]);
                if (/*!$('#' + y + '-' + x).hasClass("start") && */!$('#' + y + '-' + x).hasClass('finish')) {
                    $('#' + y + '-' + x).addClass("foot");
                }
                $('#' + y + '-' + x).removeClass('me');
                if (validCell(y, x - 1) && matrix[y][x - 1].label === undefined) {
                    x = x - 1;
                } else if (validCell(y + 1, x) && matrix[y + 1][x].label === undefined) {
                    y = y + 1;
                } else if (validCell(y, x + 1) && matrix[y][x + 1].label === undefined) {
                    x = x + 1;
                } else {
                    y = y - 1;
                }
                matrix[y][x].label = true;
                $('#' + y + '-' + x).addClass('me');
            } else if (stack.length !== 0) {
                current = stack.pop();
                $('#' + y + '-' + x).removeClass('me');
                $('#' + y + '-' + x).addClass("blue");
                y = parseInt(current.y);
                x = parseInt(current.x);
                $('#' + y + '-' + x).addClass("me");
            } else {
                console.log('Выхода нет... Скоро рассвет. Ключ поверни и по-ле-те-ли.');
                clearInterval(intervalID);
            }
            if ($('#' + y + '-' + x).hasClass('finish')) {
                clearInterval(intervalID);
            }
        }, $('#OH-Interval').val());
    } else {
        /*Пока не найден выход*/
        for (;!$('#' + y + '-' + x).hasClass('finish');) {
            /*Если текущая клетка имеет непосещенных «соседей»*/
            if ((validCell(y - 1, x) && matrix[y - 1][x].label === undefined) || (validCell(y + 1, x) && matrix[y + 1][x].label === undefined) || (validCell(y, x - 1) && matrix[y][x - 1].label === undefined) || (validCell(y, x + 1) && matrix[y][x + 1].label === undefined)) {
                stack.push(matrix[y][x]);
                if (/*!$('#' + y + '-' + x).hasClass("start") && */!$('#' + y + '-' + x).hasClass('finish')) {
                    $('#' + y + '-' + x).addClass("foot");
                }
                $('#' + y + '-' + x).removeClass('me');
                if (validCell(y, x - 1) && matrix[y][x - 1].label === undefined) {
                    x = x - 1;
                } else if (validCell(y + 1, x) && matrix[y + 1][x].label === undefined) {
                    y = y + 1;
                } else if (validCell(y, x + 1) && matrix[y][x + 1].label === undefined) {
                    x = x + 1;
                } else {
                    y = y - 1;
                }
                matrix[y][x].label = true;
                $('#' + y + '-' + x).addClass('me');
            } else if (stack.length !== 0) {
                current = stack.pop();
                $('#' + y + '-' + x).removeClass('me');
                $('#' + y + '-' + x).addClass("blue");
                y = parseInt(current.y);
                x = parseInt(current.x);
            } else {
                console.log('Выхода нет... Скоро рассвет. Ключ поверни и по-ле-те-ли.');
                break;
            }
        }
    }

}
