$(function() {
    $('.header-nav-toggler').on('click', function() {
        $('.header-nav').toggleClass('header-nav--open');
        $('.black-back').toggleClass('black-back--active');
        $('body').toggleClass('no-scroll-nav');
    });
});
$(document).click(function(e) {
    e.stopPropagation();
    var container = $(".header-cntry, .header-numbers");
    if (container.has(e.target).length === 0) {
        $('.header-cntry').removeClass('header-cntry--open');
        $('.header-numbers').removeClass('header-numbers--open');
    }
})
$(window).scroll(function() {
    if ($(this).scrollTop()) {
        $('.header-cntry').removeClass('header-cntry--open');
        $('.header-numbers').removeClass('header-numbers--open');
    }
});
$(function() {
    if (window.devicePixelRatio == 2) {
        var images = $("img.retina");
        for (var i = 0; i < images.length; i++) {
            var imageType = images[i].src.substr(-4);
            var imageName = images[i].src.substr(0, images[i].src.length - 4);
            imageName += "@2x" + imageType;
            images[i].src = imageName;
        }
    }
});
$(function() {
    if (window.devicePixelRatio == 3) {
        var images = $("img.retina");
        for (var i = 0; i < images.length; i++) {
            var imageType = images[i].src.substr(-4);
            var imageName = images[i].src.substr(0, images[i].src.length - 4);
            imageName += "@3x" + imageType;
            images[i].src = imageName;
        }
    }
});
$(document).ready(function() {
    $(".pricing-cont__tabs li").click(function(e) {
        if (!$(this).hasClass("active")) {
            var tabNum = $(this).index();
            var nthChild = tabNum + 1;
            $(".pricing-cont__tabs li.active").removeClass("active");
            $(this).addClass("active");
            $(".pricing-cont__tab li.active").removeClass("active");
            $(".pricing-cont__tab li:nth-child(" + nthChild + ")").addClass("active");
        }
    });
});
$(function() {
    $('.faq-cont__item').each(function() {
        var $accordion = $(this);
        $(".faq-cont__question", $accordion).click(function(e) {
            e.preventDefault();
            $div = $(".faq-cont__answer", $accordion);
            $div.slideToggle(200);
            $div.parent(".faq-cont__item").toggleClass('faq-cont__item--active');
            return false;
        });
        $(".faq-cont__answer").first().show();
    });
});
$(function() {
    var nav = document.getElementById("header-nav")
      , anchor = nav.getElementsByTagName("a")
      , current = window.location;
    for (var i = 0; i < anchor.length; i++) {
        if (anchor[i].href == current) {
            anchor[i].className = "active";
        }
    }
});
$(function() {
    $modal = $('.popup-frame');
    $overlay = $('.popup-phones');
    $body = $('body');
    $modal.bind('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        if ($modal.hasClass('state-leave')) {
            $modal.removeClass('state-leave');
        }
    });
    $('.js-popup-close').on('click', function() {
        $overlay.removeClass('state-show');
        $modal.removeClass('state-appear').addClass('state-leave');
        $body.removeClass('no-scroll-popup');
    });
});
if ($(window).width() <= 760) {
    (function($) {
        var hideText = $('.home-cont__why-text p').hide();
        $('.home-cont__why-text p').first().show().prev().addClass('active');
        $('.home-cont__why-text h3').on('click', function() {
            $(this).next().slideToggle(200).prev().toggleClass('active');
            return false;
        });
    }
    )(jQuery);
}
$(document).ready(function() {
    $('.sidebar__email input').on('focus', function() {
        $('#name_f').css('border-color', '#ebebeb');
        $('#email_f').css('border-color', '#ebebeb');
    })
    $('.sidebar__email .butn.butn-red').on('click', function() {
        var name_f = $('#name_f').val();
        var email_f = $('#email_f').val();
        var newuser = {
            name: name_f,
            email: email_f,
            body: 'Newsletter',
            subject: 'New user for newsletter'
        };
        if (name_f == '') {
            $('#name_f').css('border-color', 'red');
            return false;
        }
        if (email_f == '') {
            $('#email_f').css('border-color', 'red');
            return false;
        }
        $.ajax({
            type: "POST",
            data: newuser,
            url: "/api/contact/send/",
            success: AjaxSucceeded,
            error: AjaxFailed
        });
    });
    function AjaxSucceeded(result) {
        $('#name_f').val('');
        $('#email_f').val('');
    }
    function AjaxFailed(result) {
        return false;
    }
});
