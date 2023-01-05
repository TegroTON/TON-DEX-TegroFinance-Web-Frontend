$('#timer')
    .countdown({
        date: '08/20/2022 23:59:59',
        day: 'Day',
        days: 'Days'
    }, function () {

    });

$('.navbar-nav>li>a')
    .on('click', function () {
        $('.navbar-collapse')
            .collapse('hide');
    });

$('.presales__btn-group button')
    .click(function () {
        $('.presales__btn-group button.btn-primary')
            .removeClass('btn-primary');
        $(this)
            .addClass('btn-primary');
    });

$(document)
    .ready(function () {
        $("#overflow-x")
            .mousemove(
                function (pos) {
                    $("#floatingmes")
                        .show();
                    $("#floatingmes")
                        .css('left', (pos.pageX + 10) + 'px')
                        .css('top', (pos.pageY + 10) + 'px');
                }
            )
            .mouseleave(function () {
                $("#floatingmes")
                    .hide();
            });

        $('.minus')
            .click(function () {
                var $input = $(this)
                    .parent()
                    .find('input');
                var count = parseInt($input.val()) - 100;
                count = count < 1 ? 1 : count;
                $input.val(count);
                $input.change();
                return false;
            });
        $('.plus')
            .click(function () {
                var $input = $(this)
                    .parent()
                    .find('input');
                $input.val(parseInt($input.val()) + 100);
                $input.change();
                return false;
            });
    });

$('.ecodehref')
    .click(function () {
        $('#inp')
            .val($(this)
                .text());
    });

var sections = $('section'),
    nav = $('nav'),
    nav_height = nav.outerHeight();

$(window)
    .on('scroll', function () {
        var cur_pos = $(this)
            .scrollTop();

        sections.each(function () {
            var top = $(this)
                    .offset().top - nav_height,
                bottom = top + $(this)
                    .outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a')
                    .removeClass('active');
                sections.removeClass('active');

                $(this)
                    .addClass('active');
                nav.find('a[href="#' + $(this)
                    .attr('id') + '"]')
                    .addClass('active');
            }
        });
    });

nav.find('a')
    .on('click', function () {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body')
            .animate({
                scrollTop: $(id)
                    .offset().top - nav_height
            }, 500);

        return false;
    });
