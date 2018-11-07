( function( $ ) {
    "use strict";

        /*-------------------------------------------------------------------*/
        /*     Navigation Function
        /*-------------------------------------------------------------------*/

    var navigationSystem = function(idSec) {

            if (!$(idSec+', #newsletter').hasClass('open') && idSec!='') {
                $('body').addClass('open');
                $('#nav-menu ul a, .section').removeClass('open');
                setTimeout(function(){
                    $('main').prepend($(idSec));
                }, 400);
                $('div[id^="ascrail"]').remove();
                setTimeout(function(){
                    $(idSec+', #nav-menu a[href='+idSec+']').addClass('open');
                }, 600);

                $('#master-header').removeClass('open-nav');
                closePortfolioItem();
            }

        },

        /*-------------------------------------------------------------------*/
        /*     Mobile menu Functions
        /*-------------------------------------------------------------------*/

        $navMenu = $('#nav-menu ul'),
        defaultOptionText = 'Navigation',

        createMobileMenu = function() {

            $('<div class="nav-dropdown-container"><select id="nav-dropdown" /></div>').appendTo('#nav-menu');

            $('<option />', {
                'selected': 'selected',
                'value'   : '',
                'text'    : defaultOptionText
            }).appendTo('#nav-dropdown');

            $navMenu.find('a').each(function() {
                var $el = $(this);
                $('<option />', {
                    'value'   : $el.attr('href'),
                    'text'    : $el.text()
                }).appendTo('#nav-dropdown');
            });
        },

        showMobileMenu = function() {

            var $navDropContainer = $('.nav-dropdown-container'),
                offsetFooter = $('footer').offset().top,
                offsetNav = $navMenu.offset().top + $navMenu.outerHeight();

            if ( offsetNav >= offsetFooter && $('#master-header').not('.open-nav').outerWidth() > 40 ) {
                $navDropContainer.show();
                $navMenu.hide();
            } else {
                $navDropContainer.hide();
                $navMenu.show();
            }

            if ( $('#master-header').outerWidth() == 40 ) {
                $('#master-header .info').css('bottom', $('#master-header h1').outerWidth()+40);
            }
        },

        /*-------------------------------------------------------------------*/
        /*      Email validation Function
        /*-------------------------------------------------------------------*/

        validateEmail = function(email) {

            var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            var valid = emailReg.test(email);

            return valid;
        },

        $portfolio = $('.portfolio-list'),

        /*-------------------------------------------------------------------*/
        /*      Close portfolio Item Function
        /*-------------------------------------------------------------------*/

        closePortfolioItem = function() {

            if ($.fn.isotope) {
                $('.item-portfolio > a').removeClass('selected');
                $('.extra-portfolio').hide().removeClass('show');
                $portfolio.isotope('layout');
            }
        },

        /*-------------------------------------------------------------------*/
        /*      Vertical Centering Function
        /*-------------------------------------------------------------------*/

        verticalCentering = function(item){

            $(window).on('load resize',function(e){

                $(item).each(function(){
                    var hItem = $(this).outerHeight();
                    $(this).css('margin-top',-(hItem/2) + 'px');
                });
            });

        };


    // Configure page preloader script
    NProgress.configure({ showSpinner: false });

    // Start page preloader script
    NProgress.start();
    NProgress.set(0.4);

    // Run mobile menu functions
    createMobileMenu();
    showMobileMenu();

    // Add Overlay Background
    $('.wrapper').append('<div id="overlay"/>');

    // Wrap the content of each section
    $('.section').wrapInner('<div class="inner-section"/>');

    // Open section page (classic menu)
    $navMenu.find('a').click(function(e){
        e.preventDefault();
        navigationSystem($(this).attr('href'));
    });

    // Open section page (dropdown menu)
    $('#nav-dropdown').change(function(e){
        navigationSystem($(this).val());
    });

    // Close section page
    $('a.close-section').click(function(e){
        e.preventDefault();
        $('body, #nav-menu ul a').removeClass('open');
        setTimeout(function(){
            $('.section').removeClass('open');
        }, 1200);
        closePortfolioItem();
    });

    // Open nav menu on mobile
    $('.link-bars').click(function(e){
        e.preventDefault();
        if (!$('#newsletter').hasClass('open')) {
            $('#master-header').toggleClass('open-nav');
        }
    });


    /*-------------------------------------------------------------------*/
    /*      Magnific Popup (lightbox)
    /*-------------------------------------------------------------------*/

    // For images
    $('a.modal').magnificPopup({
        type: 'image',
        callbacks: { afterClose: function() {
            $('html').css('overflow', 'hidden');
            }
        }
    });

    // For portfolio gallery thumbnails
    $('.thumbnails').each(function() {
        $(this).find('a.modal').magnificPopup({
            type        : 'image',
            gallery     : {
                enabled: true
            },
            callbacks: { afterClose: function() {
                $('html').css('overflow', 'hidden');
                }
            }
        });
    });

    // For Youtube, Vimeo and Google Maps
    $('a.iframe-modal').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        removalDelay: 200,
        preloader: false,
        fixedContentPos: false,
        callbacks: { afterClose: function() {
            $('html').css('overflow', 'hidden');
            }
        }
    });


    /*-------------------------------------------------------------------*/
    /*      Elements Scripts
    /*
    /*          1. Toggle and Accordion
    /*          2. Tabs
    /*          3. Custom Colors Button
    /*          4. Bars
    /*          5. Call to Action
    /*          6. Pricing Table
    /*          7. Html Table
    /*          8. Custom Google Map
    /*
    /*-------------------------------------------------------------------*/

    /* 1. Toggle and Accordion
    -------------------------------------------------------------------*/
    $('.open-toggle .content-toggle').show();
    $('.title-toggle').click(function(e){
        e.preventDefault();
        var $that = $(this),
            $toggle = $that.parent(),
            $contentToggle = $that.next(),
            $accordion = $that.parents('.accordion');

        if ( $accordion.length > 0 ) {
            $accordion.find('.content-toggle').slideUp('normal', function(){
                $(this).parent().removeClass('open-toggle');
            });
            if ( $that.next().is(':hidden') ) {
                $contentToggle.slideDown('normal', function(){
                    $toggle.addClass('open-toggle');
                });
            }
        } else {
            $contentToggle.slideToggle('normal', function(){
                $toggle.toggleClass('open-toggle');
            });
        }
    });

    /* 2. Tabs
    -------------------------------------------------------------------*/
    $('.title-tab:first-child').addClass('selected-tab');
    $('.title-tab').click(function(e){
        e.preventDefault();
        var $tabParent = $(this).parents('.tabs'),
            idTab = $(this).find('a').attr('href');

        if ( ! $(this).hasClass('selected-tab') ) {
            $tabParent.find('.tab').hide().removeClass('opentab');
            $tabParent.find('.title-tab').removeClass('selected-tab');
            $(this).addClass('selected-tab');
            $(idTab).fadeIn().addClass('opentab');
        }
        return false;
    });

    /* 3. Custom Colors Button
    -------------------------------------------------------------------*/
    $('.btn[data-btn-colors]').each(function(){
        var colorsBtn = $(this).data('btn-colors'),
            color = colorsBtn.split('-');

        $(this).css({
            'background-color'      : color[0],
            'border-bottom-color'   : color[1]
        });
        $(this).hover(function() {
            $(this).css({
                'background-color'      : color[1],
                'border-bottom-color'   : color[0]
            });
        }, function() {
            $(this).css({
                'background-color'      : color[0],
                'border-bottom-color'   : color[1]
            });
        });
    });

    /* 4. Bars
    -------------------------------------------------------------------*/
    $(window).load(function() {
        $('.bar').each(function(){
            var wBar = $(this).data('percentage'),
                colorBar = $(this).data('bar-color');
            $(this).css({
                    'width'         : wBar + '%',
                    'background'    : colorBar
                });
            $(this).prev().append('<span style="background:' + colorBar + '">' + wBar + ' %</span>');
        });
    });

    /* 5. Call to Action
    -------------------------------------------------------------------*/
    verticalCentering('.side-cta .btn-cta');

    $('.call-to-action[data-bg]').each(function(){
        var bgCta = $(this).data('bg')
        $(this).addClass('bg').backstretch(bgCta);

    });

    /* 6. Pricing Table
    -------------------------------------------------------------------*/
    $('.table').each(function(){
        var nCol = $(this).find('.col-table').length;
        $(this).addClass('ncls-' + nCol);
    });

    /* 7. Html Table
    -------------------------------------------------------------------*/
    $('table').each(function(){
        $(this).find('th').each(function( index ) {
            $('td:nth-of-type(' + (index + 1) + ')').prepend('<strong class="fake-th">' + $(this).text() + '</strong>');
        });
    });

    /* 8. Custom Google Map
    -------------------------------------------------------------------*/

    if (typeof GMaps !== 'undefined') {

        $('.gmap').each(function(i){

            var $thisMap = $(this).attr('id', 'gmap-' + i),
                mapLat = $thisMap.data('lat'),
                mapLng = $thisMap.data('lng'),
                map = new GMaps({
                    div: '#gmap-' + i,
                    mapType: $thisMap.data('maptype'),
                    scrollwheel: false,
                    lat: mapLat,
                    lng: mapLng,
                    height: parseInt($thisMap.width() * (9/16)) + 'px',
                }).addMarker({
                    lat: mapLat,
                    lng: mapLng
                });
        });
    }

    $(window).on('load resize',function(e) {
        $('.gmap').each(function(){
            $(this).css('height', parseInt($(this).width() * (9/16)) + 'px');
        });
    });


    /*-------------------------------------------------------------------*/
    /*     Portfolio Grid
    /*
    /*          1. Vertical centering items titles
    /*          2. Grid init
    /*          3. Items filter
    /*          4. Show/Hide item description
    /*-------------------------------------------------------------------*/

    if ($.fn.isotope) {

        /* 1. Vertical centering items titles
        -------------------------------------------------------------------*/
        verticalCentering('.info-item-portfolio');

        /* 2. Grid init
        -------------------------------------------------------------------*/
        $portfolio.imagesLoaded( function() {
            $portfolio.isotope({
                itemSelector: '.item-portfolio',
                masonry: {
                    columnWidth: '.portfolio-list > li'
                }
            });
        });

        /* 3. Items filter
        -------------------------------------------------------------------*/
        $('#filters').on( 'click', 'a', function(e) {
            e.preventDefault();
            var filterValue = $(this).attr('data-filter');
            $portfolio.isotope({ filter: filterValue });
        });

        /* 4. Show/Hide item description
        -------------------------------------------------------------------*/
        $('li.item-portfolio > a').click(function(e){
            e.preventDefault();
            var $extraItem = $(this).next('.extra-portfolio');

            if ($extraItem.length > 0) {
                if ( $(this).hasClass('selected') ) {
                    $(this).removeClass('selected');
                    $extraItem.hide().hide().removeClass('show');
                } else {
                    $('.item-portfolio > a').removeClass('selected');
                    $('.extra-portfolio').hide().removeClass('show');
                    $(this).addClass('selected');
                    $extraItem.show();
                    setTimeout(function(){
                        $extraItem.addClass('show');
                    }, 400);
                }
            } else {
                $('.item-portfolio > a').removeClass('selected');
                $('.extra-portfolio').hide().removeClass('show');
            }

            $portfolio.isotope('layout');
        });

    }


    /*-------------------------------------------------------------------*/
    /*      Forms
    /*          1. Form Messages
    /*          2. Form Processor
    /*          3. Close Form Message
    /*          4. Open/Close newsletter form
    /*-------------------------------------------------------------------*/

    /* 1. Form Messages
    -------------------------------------------------------------------*/
    var formMessages = {
      subscribed    : 'Thanks for your subscription!',              // newsletter form
      sent          : 'Message sent successfully. Thanks!',
      duplicate     : 'You\'re already subscribed!',                // newsletter form
      fail          : 'Oops! Sending error. Please try again',
      failEmail     : 'Invalid Email!',
      emptyField    : 'Empty field!',
      emptyFields   : 'Empty fields!'
    };

    /* 2. Form Processor
    -------------------------------------------------------------------*/
    // Add form message container
    $('form').prepend('<div class="form-msg" style="display:none"><a href="#"><i class="fa fa-times"></i></a><span></span></div>');

    $('form').submit(function(e){
        e.preventDefault();

        var emailField, emptyMsg, successMsg,
            checkEmpty = false,
            postData = {},
            $that = $(this),
            $msgForm = $that.find('.form-msg'),
            $msgText = $msgForm.find('span');

        $msgForm.removeClass('fail success duplicate').find('span').text('');

        if ( $that.hasClass('newsletter-form') ) {
            // Newsletter form variables
            emailField = $that.find('input[name="newsletter"]').val();
            postData = { newsletter: emailField };
            emptyMsg = formMessages.emptyField;
            successMsg = formMessages.subscribed;
        } else {
            // Contact form variables
            emailField = $that.find('input[name="email"]').val();
            postData = $that.serialize();
            emptyMsg = formMessages.emptyFields;
            successMsg = formMessages.sent;
        }

        // Check if all fields are not empty
        $that.find('.required').each(function() {
            if($.trim($(this).val()) === '') {
                $msgText.text(emptyMsg).parent().addClass('fail').fadeIn('fast');
                checkEmpty = true;
            }
        });

        // Stop all if there is at least one empty field
        if ( checkEmpty ) {
            return false;
        }

        // Check if the email is valid. Otherwise stop all
        if ( ! validateEmail(emailField) ) {
            $msgText.text(formMessages.failEmail).parent().addClass('fail').fadeIn('fast');
            return false;
        }

        $that.find('.submit').after('<img class="form-loader" src="img/loader.gif">');

        // Send data to the corresponding processing file
        $.post($that.attr('action'), postData, function(result){
            if (result == 'success') {
                $msgText.text(successMsg);                      // success
                $that.find(':text, textarea').val('');          // reset all form fields
            } else if (result == 'duplicate') {
                $msgText.text(formMessages.duplicate);          // duplicate email (newsletter form)
            } else {
                $msgText.text(formMessages.fail);               // fail
            }
        }).fail(function() {
            $msgText.text(formMessages.fail);                   // fail (problem with sending data)
        }).always(function(result) {
            $that.find('.form-loader').remove();
            $msgForm.addClass(result).fadeIn('fast');           // show form message
        });

    });

    /* 3. Close form messages
    -------------------------------------------------------------------*/
    $(document).on('click','.form-msg a', function(){
        $(this).parent().fadeOut();
        return false;
    });

    /* 4. Open/Close newsletter form
    -------------------------------------------------------------------*/
    $('.toggle-newsletter').click(function(e){
        e.preventDefault();
        $('body').toggleClass('overlay');
        $(this).add('#newsletter').toggleClass('open');
        $(this).find('i').toggleClass('fa-times fa-paper-plane');
    });


    /*-------------------------------------------------------------------*/
    /*      Other window load scripts
    /*-------------------------------------------------------------------*/

    $(window).load(function() {

        // Stop page preloader script
        NProgress.done();

        // Remove page preloader from DOM
        setTimeout(function() {
            $('body').removeClass('loading');
            $('.loader').fadeOut(400, function(){
                $(this).remove();
            });
        }, 400);

    });


    /*-------------------------------------------------------------------*/
    /*      Other window resize scripts
    /*-------------------------------------------------------------------*/
    $(window).resize(function() {

        showMobileMenu();

        if ($.fn.isotope) {
            $portfolio.isotope('layout');
        }

    });

} )( jQuery );