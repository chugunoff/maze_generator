function drawLab(lab) {
    $('#maze').empty().attr('style', 'height:' + lab.length * 25 + 'px; width:' + lab[1].length * 25 + 'px');
    for (let y = 0; y < lab.length; y++) {
        for (let x = 0; x < lab[y].length; x++) {
            if (lab[y][x] === 'wall') {
                $('#maze').append($("<div></div>").attr('id', y + '-' + x).addClass('wall'));
            } else {
                $('#maze').append($("<div></div>").attr('id', y + '-' + x).addClass('block'));
            }
            $("#" + y + "-" + x).append($("<div></div>").addClass('label').attr('id', y + '-' + x + '-label'));
        }
    }
}

function clearLab(lab, io) {
    for (let y = 0; y < lab.length; y++) {
        for (let x = 0; x < lab[y].length; x++) {
            $('#' + y + '-' + x).removeClass('foot');
            $('#' + y + '-' + x).removeClass('blue');
            $('#' + y + '-' + x + '-label').empty();
            if (!$('#' + io.enter[0] + '-' + io.enter[1]).hasClass('me')) {
                $('#' + io.enter[0] + '-' + io.enter[1]).addClass('me');
            }
            $('#' + io.exit[0] + '-' + io.exit[1]).removeClass('me');
        }
    }
    //$('#' + io.enter[0] + '-' + io.enter[1]).addClass('me');
}

function genLab(w, h) {
    let lab = [];
    for (let i = 0; i < h; i++) {
        lab[i] = [];
        for (let j = 0; j < w; j++) {
            lab[i][j] = 'wall';
        }
    }

    function valid(a, b) {
        return (a < h && a >= 0 && b < w && b >= 0);
    }

    /*Проверка соседних стен*/
    function amaze(y, x, addBlockWalls) {
        lab[y][x] = 'maze';
        if (addBlockWalls && valid(y + 1, x) && (lab[y + 1][x] === 'wall')) walls.push([y + 1, x, [y, x]]);
        if (addBlockWalls && valid(y - 1, x) && (lab[y - 1][x] === 'wall')) walls.push([y - 1, x, [y, x]]);
        if (addBlockWalls && valid(y, x + 1) && (lab[y][x + 1] === 'wall')) walls.push([y, x + 1, [y, x]]);
        if (addBlockWalls && valid(y, x - 1) && (lab[y][x - 1] === 'wall')) walls.push([y, x - 1, [y, x]]);
    }

    let currentPosition = [1, 1];
    let walls = [];
    amaze(currentPosition[0], currentPosition[1], true);
    while (walls.length !== 0) {
        let randomWall = walls[Math.floor(Math.random() * walls.length)],
            host = randomWall[2],
            opposite = [(host[0] + (randomWall[0] - host[0]) * 2), (host[1] + (randomWall[1] - host[1]) * 2)];
        if (valid(opposite[0], opposite[1])) {
            if (lab[opposite[0]][opposite[1]] === 'maze') walls.splice(walls.indexOf(randomWall), 1);
            else amaze(randomWall[0], randomWall[1], false), amaze(opposite[0], opposite[1], true);
        } else walls.splice(walls.indexOf(randomWall), 1);
    }

    return lab;
}

function toConsole(lab) {
    let row;
    for (let i = 0; i < lab.length; i++) {
        for (let j = 0; j < lab[i].length; j++) {
            row = row + lab[i][j] + ' ';
        }
        console.log(row);
        row = '';
    }
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function selectIOAuto(lab) {
    let io = {};

    for (let toggler = 0; toggler !== 2;) {
        let y = randomInteger(0, lab.length);
        let x = randomInteger(0, lab[1].length);
        let yDown = y + 1;
        let yUp = y - 1;
        let xRight = x + 1;
        let xLeft = x - 1;

        if ((y === 0 && !$('#' + yDown + '-' + x).hasClass('wall')) || (y === lab.length - 1 && !$('#' + yUp + '-' + x).hasClass('wall')) || (x === 0 && !$('#' + y + '-' + xRight).hasClass('wall')) || (x === lab[1].length - 1 && !$('#' + y + '-' + xLeft).hasClass('wall'))) {
            if (toggler === 0) {
                io.enter = [y, x];
                toggler = 1;
                $('#' + y + '-' + x).removeClass('wall').addClass('start me');

                $('#btn-manual-apply').prop('disabled', true);

            } else {
                io.exit = [y, x];
                toggler = 2;
                $('#' + y + '-' + x).removeClass('wall').addClass('finish');
                $('.wall').unbind();

                $('#btn-auto').prop('disabled', true);
                //return io;
            }
        } else console.log(y + '-' + x + 'нельзя'); /*alert('В данной точке нельзя установить вход или выход.');*/
    }
    // $('#' + io.enter[0] + '-' + io.enter[1]).removeClass('wall').addClass('start me');
    // $('#' + io.exit[0] + '-' + io.exit[1]).removeClass('wall').addClass('finish');

    return io;
}

function selectIOManual(lab, io) {
    let toggler = 0;
    $('.wall').click(function () {
        let id = $(this).attr('id').split('-');
        let y = parseInt(id[0]);
        let x = parseInt(id[1]);
        let yDown = y + 1;
        let yUp = y - 1;
        let xRight = x + 1;
        let xLeft = x - 1;
        if ((y === 0 && !$('#' + yDown + '-' + x).hasClass('wall')) || (y === lab.length - 1 && !$('#' + yUp + '-' + x).hasClass('wall')) || (x === 0 && !$('#' + y + '-' + xRight).hasClass('wall')) || (x === lab[1].length - 1 && !$('#' + y + '-' + xLeft).hasClass('wall'))) {
            if (toggler === 0) {
                io.enter = [y, x];
                toggler = 1;
                $('#' + y + '-' + x).removeClass('wall').addClass('start me');

                $('#btn-auto').prop('disabled', true);
                //$('#btn-manual').prop('disabled', true);

            } else {
                io.exit = [y, x];
                toggler = 2;
                $('#' + y + '-' + x).removeClass('wall').addClass('finish');
                $('.wall').unbind();

                $('#btn-manual-apply').prop('disabled', false);
                //return io;
            }
        } else alert('В данной точке нельзя установить вход или выход.');
    });

}

function setIO(lab, io) {
    lab[io.enter[0]][io.enter[1]] = 'maze'; //Добавление входа в массив, т.е. удаление его из массива стен
    lab[io.exit[0]][io.exit[1]] = 'maze';
}

function drawIO(io) {
    $('#' + io.enter[0] + '-' + io.enter[1]).removeClass('wall').removeClass('block').addClass('start me');
    $('#' + io.exit[0] + '-' + io.exit[1]).removeClass('wall').removeClass('block').addClass('finish');
}
