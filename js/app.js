// document.addEventListener("DOMContentLoaded", function() {

// 	// Custom JS

// });

// Scrollbar.initAll({
// 	damping: 0.125,
// });

$(document).ready(function(){

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
		// lazy: {
		// 	loadPrevNext: true,
		// },
		// watchSlidesVisibility: true,
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
	var constructionSwiper = new Swiper ('.s-news-slider', {
		spaceBetween: 20,
		slidesPerView: 3,
		freeMode: true,
		grabCursor: true,
		preloadImages: false,
		// lazy: {
		// 	loadPrevNext: true,
		// },
		// watchSlidesVisibility: true,
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
	 * Open "Site menu" when clicked on hamburger button
	 */
	var humbBtn   = $('.hamburger'),
			siteMenu  = $('.site-menu');

	humbBtn.on('click', function() {
		$('body').toggleClass('menu-open');
		$(humbBtn).toggleClass('is-active');
		siteMenu.toggleClass('shown');
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