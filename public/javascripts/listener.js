$(function () {
    $('#label-width').text('Width: ' + $('#width').val());
    $('#label-height').text('Height: ' + $('#height').val());
    $('#width').change(function () {
        $('#label-width').text('Width: ' + $('#width').val());
    });
    $('#height').change(function () {
        $('#label-height').text('Height: ' + $('#height').val());
    });

    $('#label-OH-Time').text('Interval: ' + $('#OH-Interval').val() + ' ms');
    $('#OH-Interval').change(function () {
        $('#label-OH-Time').text('Interval: ' + $('#OH-Interval').val() + ' ms');
    });

    $('#label-Trace-Timeout').text('Timeout: ' + $('#Trace-Timeout').val() + ' ms');
    $('#Trace-Timeout').change(function () {
        $('#label-Trace-Timeout').text('Interval: ' + $('#Trace-Timeout').val() + ' ms');
    });




    $("select").change(function () {
        if ($(this).val() === 'Stone') {
            $('#theme').attr('href', '/stylesheets/themes/theme_stone.css');
            // $('.block').attr('background-image', 'url("/images/Gray_Brick_Wall.png")');
            // $('.wall').attr('background-image', 'url("/images/Gray_Brick.png")');
            // $('.block').removeClass('yellow_stucco_wall', 'dirt-wall', 'wood-wall').addClass('gray-brick-wall');
            // $('.wall').removeClass('sand-block', 'dirt-block', 'wood-block').addClass('gray-brick');
        }
        if ($(this).val() === 'Sand') {
            $('#theme').attr('href', '/stylesheets/themes/theme_sand.css');
            // $('.block').attr('background-image', 'url(/images/Yellow_Stucco_Wall.png)');
            // $('.wall').attr('background-image', 'url("/images/Gray_Brick.png")');
            // $('.block').removeClass('gray-brick-wall', 'dirt-wall', 'wood-wall').addClass('yellow_stucco_wall');
            // $('.wall').removeClass('gray-brick', 'dirt-block', 'wood-block').addClass('sand-block');
        }
        if ($(this).val() === 'Wood') {
            $('#theme').attr('href', '/stylesheets/themes/theme_wood.css');
            // $('.block').attr('background-image', 'url(/images/Wood_Wall.png)');
            // $('.wall').attr('background-image', 'url(/images/Wood.png)');
            // $('.block').removeClass('yellow_stucco_wall', 'dirt-wall', 'gray-brick-wall').addClass('wood-wall');
            // $('.wall').removeClass('sand-block', 'dirt-block', 'gray-brick').addClass('wood');
        }
        if ($(this).val() === 'Dirt') {
            $('#theme').attr('href', '/stylesheets/themes/theme_dirt.css');
            // $('.block').removeClass('yellow_stucco_wall', 'gray-brick-wall', 'wood-wall').addClass('dirt-wall');
            // $('.wall').removeClass('sand-block', 'gray-brick', 'wood-block').addClass('dirt-block');
        }
    });


    //Login
    $('.auth-form').on('submit', function () {
        const form = $(this);

        const jqXHR = $.ajax({
            url: '/login',
            type: 'POST',
            data: form.serialize()
        })
            .done(function () {
                alert("success");
                window.location.href = "/";
            })
            .fail(function () {
                alert(JSON.parse(jqXHR.responseText));
            })
            .always(function () {
                alert("complete");
            });
        return false;
    });

    $('#logout').click(function () {
        $.post("/logout", function () {
            window.location.href = "/login";
            alert("success");
        })
            .fail(function () {
                alert("error");
            });
        return false;
    });

    $('#btn-about').click(function () {
        $('.b-popup').show();
        $('.b-popup-content').hide();
        $('.about').show();
    });

    $('#btn-in-about-ok').click(function () {
        $('.about').hide();
        $('.b-popup').hide();
        $('.b-popup-content').show();
    })
});

function meWalker(lab, io) {
    let currentPosition = io.enter;
    console.log(currentPosition);

    $("body").on("keydown", function (event) {
        let newPosition = [currentPosition[0] + ((event.which - 39) % 2), currentPosition[1] + ((event.which - 38) % 2)];
        if (valid(newPosition[0], newPosition[1]) && lab[newPosition[0]][newPosition[1]] !== 'wall') {
            $("#" + currentPosition[0] + "-" + currentPosition[1]).removeClass("me");
            /*Путь*/
            if (!$("#" + newPosition[0] + "-" + newPosition[1]).hasClass("foot") && !$("#" + currentPosition[0] + "-" + currentPosition[1]).hasClass("start") && !$("#" + newPosition[0] + "-" + newPosition[1]).hasClass("start"))
                $("#" + currentPosition[0] + "-" + currentPosition[1]).addClass("foot");
            else $("#" + newPosition[0] + "-" + newPosition[1]).removeClass("foot");
            /*End Путь*/
            currentPosition = newPosition;
            $("#" + currentPosition[0] + "-" + currentPosition[1]).addClass("me");
            //if (currentPosition[0] == hate - 2 && currentPosition[1] == width - 2) document.getElementById('complete').setAttribute('style', 'display:block');
        }
    });

    function valid(a, b) {
        return (a < lab.length && a >= 0 && b < lab[1].length && b >= 0);
    }
}



