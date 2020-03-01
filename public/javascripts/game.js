let lab;
let objMaze = {};
let io = {};

$('#btn-gen').click(function () {
    $('#select-themes').prop('disabled', false);
    $('#btn-auto').prop('disabled', false);
    $('#btn-manual').prop('disabled', false);

    $('#btn-manual-apply').prop('disabled', true);
    /*aOneHand Block*/
    $('#OH-Interval').prop('disabled', true);
    $('#btn-aOneHand-Dynamic-Time').prop('disabled', true);
    $('#btn-aOneHand-Static').prop('disabled', true);
    /**/
    /*aTrace Block*/
    $('#Trace-Timeout').prop('disabled', true);
    $('#btn-aTrace-Timeout').prop('disabled', true);
    $('#btn-aTrace-Static').prop('disabled', true);
    /**/
    $('#btn-save').prop('disabled', true);

    let width = parseInt($('#width').val()) + 2;
    let height = parseInt($('#height').val()) + 2;
    lab = genLab(width, height);
    drawLab(lab);
    selectIOManual(lab, io);
});

$('#btn-auto').click(function () {
    /*aOneHand Block*/
    $('#OH-Interval').prop('disabled', false);
    $('#btn-aOneHand-Dynamic-Time').prop('disabled', false);
    $('#btn-aOneHand-Static').prop('disabled', false);
    /**/
    /*aTrace Block*/
    $('#Trace-Timeout').prop('disabled', false);
    $('#btn-aTrace-Timeout').prop('disabled', false);
    $('#btn-aTrace-Static').prop('disabled', false);
    /**/

    $('#btn-save').prop('disabled', false);

    $('#btn-auto').prop('disabled', true);
    $('#btn-manual').prop('disabled', true);
    $('#btn-manual-apply').prop('disabled', true);

    $('.wall').unbind();
    io = selectIOAuto(lab);
    $('#' + io.enter[0] + '-' + io.enter[1]).removeClass('wall').addClass('start me');
    $('#' + io.exit[0] + '-' + io.exit[1]).removeClass('wall').addClass('finish');

    setIO(lab, io);
    meWalker(lab, io);
});

// $('#btn-manual').click(function () {
//     $('#btn-auto').prop('disabled', true);
//     $('#btn-manual').prop('disabled', true);
//     $('#btn-manual-apply').prop('disabled', false);
//
//     selectIOManual(lab, io);
// });

$('#btn-manual-apply').click(function () {
    /*aOneHand Block*/
    $('#OH-Interval').prop('disabled', false);
    $('#btn-aOneHand-Dynamic-Time').prop('disabled', false);
    $('#btn-aOneHand-Static').prop('disabled', false);
    /**/
    /*aTrace Block*/
    $('#Trace-Timeout').prop('disabled', false);
    $('#btn-aTrace-Timeout').prop('disabled', false);
    $('#btn-aTrace-Static').prop('disabled', false);
    /**/
    $('#btn-save').prop('disabled', false);

    $('#btn-manual-apply').prop('disabled', true);

    console.log(io);
    setIO(lab, io);
    meWalker(lab, io);
});

$('#btn-aOneHand-Static').click(function () {
    aOneHand(lab, io, 'static');
});

$('#btn-aOneHand-Dynamic-Time').click(function () {
    aOneHand(lab, io, 'dynamic-time');
});


$('#btn-aTrace-Timeout').click(function () {
    aTrace(lab, io, $('#Trace-Timeout').val());
});

$('#btn-aTrace-Static').click(function () {
    aTrace(lab, io, 0);
});

$(function () {
    $('.b-popup').hide();
    $('#btn-auto').prop('disabled', true);
    $('#btn-manual').prop('disabled', true);
    $('#btn-manual-apply').prop('disabled', true);
    $('#select-themes').prop('disabled', true);
    /*aOneHand Block*/
    $('#OH-Interval').prop('disabled', true);
    $('#btn-aOneHand-Dynamic-Time').prop('disabled', true);
    $('#btn-aOneHand-Static').prop('disabled', true);
    /**/
    /*aTrace Block*/
    $('#Trace-Timeout').prop('disabled', true);
    $('#btn-aTrace-Timeout').prop('disabled', true);
    $('#btn-aTrace-Static').prop('disabled', true);
    /**/
    $('#btn-save').prop('disabled', true);
});

$('#btn-save').click(function () {
    $('.b-popup').show();
    $('.about').hide();
    //$('.b-popup-content').append($('<button></button>').text('Cancel').attr('id', 'btn-cancel-save'));
    $('#btn-cancel-save').click(function () {
        $('.b-popup').hide();
    });

    $('#btn-save-apply').click(function () {
        objMaze.name = $('#labName').val();
        objMaze.theme = $('#select-themes').val();
        objMaze.enter = io.enter;
        objMaze.exit = io.exit;
        objMaze.maze = lab;

        let jsonMaze = JSON.stringify(objMaze);

        $.ajax({
            type: 'POST',
            url: '/',
            headers: {'button': 'save'},
            contentType: 'application/json',
            data: jsonMaze
        })
            .done(function () {
                alert('Maze saved.');
                $('.b-popup').hide();
            });
    });
});


$('#btn-load').click(function () {
    let jqXHR = $.ajax({
        type: 'POST',
        url: '/getDocuments'
    })
        .done(function () {
            $('body').append($('<div></div>').addClass('b-popup-load').append($('<div></div>').addClass('b-popup-labs')));
            $('.b-popup-labs').append($('<div></div>').addClass('rowLabHeader').append($('<span></span>').text('Name').addClass('name')).append($('<span></span>').text('Theme').addClass('theme')).append($('<span></span>').text('Size').addClass('size')));
            let docs = JSON.parse(jqXHR.responseText);
            for (let i = 0; i < docs.length; i++) {
                $('.b-popup-labs').append($('<div></div>').attr('id', docs[i]._id).addClass('rowLab'));
                $('#' + docs[i]._id).append($('<span></span>').text(docs[i].name).addClass('name')).append($('<span></span>').text(docs[i].theme).addClass('theme')).append($('<span></span>').text(Number(docs[i].maze.length - 2) + 'x' + Number(docs[i].maze[1].length - 2)).addClass('size'));
            }
            $('.b-popup-labs').append($('<button></button>').text('Cancel').attr('id', 'btn-cancel-load'));
            console.log(JSON.parse(jqXHR.responseText));

            $('#btn-cancel-load').click(function () {
                $('.b-popup-load').remove();
            });

            $('.rowLab').click(function () {
                let id = $(this).attr('id');
                let jqXHR = $.ajax({
                    type: 'POST',
                    url: '/',
                    headers: {'button': 'load'},
                    data: {
                        id: id
                    }
                })
                    .done(function () {
                        console.log(JSON.parse(jqXHR.responseText));
                        objMaze = JSON.parse(jqXHR.responseText);
                        lab = objMaze.maze;
                        io.enter = objMaze.enter;
                        io.exit = objMaze.exit;
                        drawLab(lab);
                        drawIO(io);
                        $('.b-popup-load').remove();
                        $('#select-themes').val(objMaze.theme);
                        if (objMaze.theme === 'Stone') {
                            $('#theme').attr('href', '/stylesheets/themes/theme_stone.css');
                        }
                        if (objMaze.theme === 'Sand') {
                            $('#theme').attr('href', '/stylesheets/themes/theme_sand.css');
                        }
                        if (objMaze.theme === 'Wood') {
                            $('#theme').attr('href', '/stylesheets/themes/theme_wood.css');
                        }
                        if (objMaze.theme === 'Dirt') {
                            $('#theme').attr('href', '/stylesheets/themes/theme_dirt.css');
                        }

                        $('#select-themes').prop('disabled', false);
                        $('#btn-auto').prop('disabled', true);
                        $('#btn-manual').prop('disabled', true);
                        $('#btn-manual-apply').prop('disabled', true);

                        /*aOneHand Block*/
                        $('#OH-Interval').prop('disabled', false);
                        $('#btn-aOneHand-Dynamic-Time').prop('disabled', false);
                        $('#btn-aOneHand-Static').prop('disabled', false);
                        /**/

                        /*aTrace Block*/
                        $('#Trace-Timeout').prop('disabled', false);
                        $('#btn-aTrace-Timeout').prop('disabled', false);
                        $('#btn-aTrace-Static').prop('disabled', false);
                        /**/
                        $('#btn-save').prop('disabled', true);
                    })
                    .fail(function () {
                        alert(jqXHR.statusText);
                    })
                    .always(function () {
                    });
            });
        });


});
