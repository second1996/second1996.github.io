$(document).ready(function(){

  /**
   * Genplan Tooltip
   */
  $gpWrap = $('.h-genplan-wrap')
  $gpStage = $('.h-genplan-map .second-stage')
  $gpTooltip = $('.h-genplan-tooltip')
  $gpStageTooltip = $('.h-genplan-stage-tooltip')
  $gpTooltipTitle = $('#gp-tooltip-title')
  $gpTooltipNumber = $('#gp-tooltip-number')
  $gpTooltipSquare = $('#gp-tooltip-square')
  $gpTooltipArea = $('#gp-tooltip-area')
  $gpTooltipStatus = $('#gp-tooltip-status')
  $gpTooltipPhoto = $('#gp-tooltip-photo')
  $gpHousePhotos = {
    'Harmonia': 'https://ozon-ltd.com/wp-content/uploads/2020/09/villa-harmonia-main-1024x579.jpg',
    'Nebokray': 'https://ozon-ltd.com/wp-content/uploads/2020/05/villa-nebokray-main-1024x579.jpg',
    'Zatyshok': 'https://ozon-ltd.com/wp-content/uploads/2020/05/villa-zatyshok-main-1024x579.jpg',
    'Svitanok': 'https://ozon-ltd.com/wp-content/uploads/2020/05/villa-svitanok-main-1024x579.jpg'
  }

  $('.h-genplan-map .house--sale, .h-genplan-map .house--sold, .h-genplan-map .house--reserved').hover(function(e) {
    let houseType = $(this).data('house-name')
    let houseStatus = $(this).data('house-status')

    $gpTooltip.addClass('active');
    $gpTooltipTitle.text($(this).data('house-name'))
    $gpTooltipNumber.text($(this).data('house-number'))
    $gpTooltipSquare.text($(this).data('house-square'))
    $gpTooltipArea.text($(this).data('house-area'))

    if ( houseType === 'VILLA «NEBOKRAY»' ) {
      $gpTooltipPhoto.attr('style', 'background-image: url("' + $gpHousePhotos.Nebokray + '")')
    } else if ( houseType === 'VILLA «SVITANOK»' ) {
      $gpTooltipPhoto.attr('style', 'background-image: url("' + $gpHousePhotos.Svitanok + '")')
    } else if ( houseType === 'VILLA «ZATYSHOK»' ) {
      $gpTooltipPhoto.attr('style', 'background-image: url("' + $gpHousePhotos.Zatyshok + '")')
    } else if ( houseType === 'VILLA «HARMONIA»' ) {
      $gpTooltipPhoto.attr('style', 'background-image: url("' + $gpHousePhotos.Harmonia + '")')
    }

    if ( houseStatus === 'reserved' ) {
      $gpTooltipStatus.attr('class', 'status status--reserved')
      $gpTooltipStatus.text('Заброньовано')
    } else if ( houseStatus === 'sold' ) {
      $gpTooltipStatus.attr('class', 'status status--sold')
      $gpTooltipStatus.text('Продано')
    } else if ( houseStatus === 'sale' ) {
      $gpTooltipStatus.attr('class', 'status status--sale')
      $gpTooltipStatus.text('В продажу')
    }
  }, function() {
    $gpTooltip.removeClass('active')
  })

  $gpStage.hover(function(e) {
    $gpStageTooltip.addClass('active');
  }, function() {
    $gpStageTooltip.removeClass('active')
  })

  $('#second-stage').on('mousemove', function(e){
    $gpStageTooltip.css({
      top: e.pageY + 30,
      left: e.pageX,
    })
  })

  $('.h-genplan-map .house--sale, .h-genplan-map .house--sold, .h-genplan-map .house--reserved').on('mousemove', function(e) {
    $gpTooltip.css({
      top: e.pageY + 30,
      left: e.pageX - 10,
    })
  })


  /**
   * Choose your house tooltip
   */
  $('.h-genplan-map .house--process').hover(function() {
    $('.h-genplan-process-tooltip').addClass('active')
    $('#gp-process-tooltip-number').text($(this).data('house-number'))
  }, function() {
    $('.h-genplan-process-tooltip').removeClass('active')
  })

  $('.h-genplan-map .house--process').bind('click.smoothscroll', function() {
    var target = $(this).parent().attr('xlink:href'),
        bl_top = $(target).offset().top - 75;

    $('body, html').animate({scrollTop: bl_top}, 1000);
    return false;
  })

  $('.h-genplan-map .house--process').on('mousemove', function(e) {
    $('.h-genplan-process-tooltip').css({
      top: e.pageY + 30,
      left: e.pageX - 10,
    })
  })


  /**
   * Init Inputmask
   */
  $(":input").inputmask();


  /**
   * Construction Modal Template (Модальне вікно для "Хід будівництва")
   */
  $('#constructionModal').on('show.bs.modal', function (event) {
    var button  = $(event.relatedTarget),
        title   = button.data('constr-title'),
        images  = button.data('constr-images'),
        text    = button.data('constr-text'),
        modal   = $(this);

    modal.find('.modal-title > span').text(title);
    modal.find('.modal-fancy').html(images);
    modal.find('.modal-text').html(text);
  });


  /**
   * Init Fancybox
   */
  $('[data-fancybox]').fancybox({
    buttons: [
      "zoom",
      "fullScreen",
      "thumbs",
      "close"
    ],
    thumbs : {
      autoStart : true,
      axis: 'x'
    },
    backFocus: false,
  });


  // LazyLoad images
  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy",
    load_delay: 250,
    callback_loaded: function(element) {
      // console.log("👍 LOADED", element);
      $(element).siblings('.lazy-spin').remove();
    },
  });


  /**
   * Swiper for Home section: "Heroes"
   */
  var homeSwiperAutoplay = 6000;
  var homeSwiper = new Swiper ('.h-heroes-slider', {
    effect: 'fade',
    speed: 0,
    autoplay: {
      delay: homeSwiperAutoplay,
      disableOnInteraction: false,
    },
    lazy: {
      loadOnTransitionStart: true,
    },
    allowTouchMove: false,
    preloadImages: false,
    pagination: {
      el: '.h-heroes-slider-pagination',
      clickable: true,
      renderBullet: function(index, className) {
        var slideNames = [],
            slideTitle = $('.h-heroes-slide-content > .title');

        slideTitle.each(function(i) {
          slideNames.push($(this).text());
          // console.log(slideNames);
        });
        return '<div class="' + className + '"><span class="current">0' + [index + 1] + '</span><span class="title">' + (slideNames[index]) + '</span><span class="progress" style="animation-duration: ' + homeSwiperAutoplay + 'ms"></span></div>';
      }
    },
    breakpoints: {
      320: {
        autoplay: false,
      },
      768: {
        autoplay: {
          delay: homeSwiperAutoplay,
          disableOnInteraction: false,
        },
      },
    },
  });


  /**
   * Swiper for Home section: "About Us"
   */
  var quoteSwiper = new Swiper ('.h-about-quote-slider', {
    slidesPerView: 1,
    speed: 1000,
    grabCursor: true,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });


  /**
   * Swiper for Home section "Construction"
   */
  var constructionSwiper = new Swiper ('.h-construction-slider', {
    spaceBetween: 20,
    slidesPerView: 3,
    grabCursor: true,
    freeMode: true,
    preloadImages: false,
    navigation: {
      nextEl: '.h-construction-slider-next',
      prevEl: '.h-construction-slider-prev',
    },
    scrollbar: {
      el: '.h-construction-scrollbar',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      660: {
        slidesPerView: 2,
      },
      940: {
        slidesPerView: 3,
      }
    }
  });


  /**
   * Swiper for single page News & Promo section "Other news"
   */
  var newsSwiper = new Swiper ('.s-news-slider', {
    spaceBetween: 20,
    slidesPerView: 3,
    freeMode: true,
    grabCursor: true,
    preloadImages: false,
    navigation: {
      nextEl: '.s-news-slider-next',
      prevEl: '.s-news-slider-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      660: {
        slidesPerView: 2,
      },
      940: {
        slidesPerView: 3,
      }
    }
  });


  /**
   * Swiper for House section "Planning"
   */
  // var planningSwiper = $('.planning-slider');
  // planningSwiper.each(function(){
  //   var planningSlider = new Swiper (this, {
  //     slidesPerView: 1,
  //     grabCursor: true,
  //     preloadImages: false,
  //     navigation: {
  //       nextEl: $(this).parent().find('.planning-slider-next')[0],
  //       prevEl: $(this).parent().find('.planning-slider-prev')[0],
  //     }
  //   });
  //   $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  //     // e.target // newly activated tab
  //     // e.relatedTarget // previous active tab
  //     planningSlider.update();
  //   });
  // });


  // breakpoint where swiper will be destroyed
  // const breakpoint = window.matchMedia( '(min-width:991.98px)' );
  // // keep track of swiper instances to destroy later
  // let planningSwiper;

  // const breakpointChecker = function() {
  //   // if larger viewport and multi-row layout needed
  //   if ( breakpoint.matches === true ) {
  //     // clean up old instances and inline styles when available
	//   if ( planningSwiper !== undefined ) planningSwiper.destroy( true, true );
	//   // or/and do nothing
	//   return;
  //     // else if a small viewport and single column layout needed
  //     } else if ( breakpoint.matches === false ) {
  //       // fire small viewport version of swiper
  //       return enableSwiper();
  //     }
  // };

  // const enableSwiper = function() {
  //   planningSwiper = new Swiper ('.planning-slider', {
  //     slidesPerView: 1,
  //     grabCursor: true,
  //     preloadImages: false,
  //     navigation: {
  //       nextEl: '.planning-slider-next',
  //       prevEl: '.planning-slider-prev'
  //     }
  //   });
  // };

  // // keep an eye on viewport size changes
  // breakpoint.addListener(breakpointChecker);
  // // kickstart
  // breakpointChecker();


    /**
   * Swiper for House section "Gallery"
   */
  var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    slidesPerView: 12,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
      320: {
        slidesPerView: 4,
      },
      576: {
        slidesPerView: 6,
      },
      768: {
        slidesPerView: 12,
      },
    },
  });

  var gallerySlider = new Swiper('.gallery-slider', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: galleryThumbs,
    }
  });


  /**
   * Open "Site menu" when clicked on hamburger button
   */
  var humbBtn   = $('.hamburger'),
      siteMenu  = $('.site-menu');

  humbBtn.on('click', function() {
    $('body').toggleClass('menu-open');
    $(humbBtn).toggleClass('is-active');
    siteMenu.toggleClass('shown');
  });
  $('.site-menu-footer-btn, .site-menu-navigation-list > li > a').on('click', function() {
    $('body').removeClass('menu-open');
    $(humbBtn).removeClass('is-active');
    siteMenu.removeClass('shown');
  });


  /**
   * Anchor smooth scroll link
   */
  $('a[data-link^="anchor"]').bind('click.smoothscroll', function(){
    var target = $(this).attr('href'),
        bl_top = $(target).offset().top - 75;

    $('body, html').animate({scrollTop: bl_top}, 1000);
    return false;
  });

});


$(window).on('load', function () {

  /**
 * Marquee string for background text (classname: .bg-text)
 */
  $('.marquee').marquee({
    // duration: 12000,
    delayBeforeStart: 0,
    startVisible: true,
    duplicated: true,
    gap: 350,
  });

});