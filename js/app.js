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
	var planningSwiper = $('.planning-slider');
	planningSwiper.each(function(){
		var planningSlider = new Swiper (this, {
			slidesPerView: 1,
			grabCursor: true,
			preloadImages: false,
			navigation: {
				nextEl: $(this).parent().find('.planning-slider-next')[0],
				prevEl: $(this).parent().find('.planning-slider-prev')[0],
			},
		});
		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			// e.target // newly activated tab
			// e.relatedTarget // previous active tab
			planningSlider.update();
		});
	});


		/**
	 * Swiper for House section "Planning"
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


	/**
	 * Anchor smooth scroll link
	 */
	$('a[data-link^="anchor"]').bind('click.smoothscroll', function(){
		var target = $(this).attr('href'),
				bl_top = $(target).offset().top - 75;

		$('body, html').animate({scrollTop: bl_top}, 1000);
		return false;
	});


	/**
	 * Installment calculator (Section: Calculate on House page)
	 */
	const calcForm							= $("#c-calc-form");
	const firstPay							= $("#c-first-pay");
	const termPay								= $("#c-term-pay");
	const cTotalCost						= $("#c-total-cost-val > em").text();
	const cFirstPay							= $("#c-first-pay-val > em");
	const cMonthlyPay						= $("#c-monthly-val > em");
	const cModalLink						= $("#c-modal-link");
	const cModalFirstPay				= $("#cModal-firstPay");
	const cModalMonthlyPay			= $("#cModal-monthlyPay");
	const cModalLabelFirstPay		= $("#cModalLabel-firstPay");
	const cModalLabelMonthlyPay	= $("#cModalLabel-monthlyPay");

	// Show "Залишити заявку" when input first time changed
	calcForm.one('input change', function() {
		cModalLink.addClass('show');
	});

	// Calculate values when load page
	cFirstPay.text(Math.round( ( parseInt(cTotalCost) * ( firstPay.val() / 100 ) ) ));
	cMonthlyPay.text(Math.round( ( parseInt(cTotalCost) - cFirstPay.text() ) / termPay.val() ));
	cModalFirstPay.val(Math.round( ( parseInt(cTotalCost) * ( firstPay.val() / 100 ) ) ));
	cModalMonthlyPay.val(Math.round( ( parseInt(cTotalCost) - cFirstPay.text() ) / termPay.val() ));
	cModalLabelFirstPay.text(Math.round( ( parseInt(cTotalCost) * ( firstPay.val() / 100 ) ) ));
	cModalLabelMonthlyPay.text(Math.round( ( parseInt(cTotalCost) - cFirstPay.text() ) / termPay.val() ));

	// Calculate function
	function calculateFirstPay(price, value) {
		// Перший внесок
		cFirstPay.text(Math.round( ( parseInt(price) * ( value / 100 ) ) ));
		cModalFirstPay.val(Math.round( ( parseInt(price) * ( value / 100 ) ) ));
		cModalLabelFirstPay.text(Math.round( ( parseInt(price) * ( value / 100 ) ) ));
		// Щомісячний платіж
		cMonthlyPay.text(Math.round( ( parseInt(price) - cFirstPay.text() ) / termPay.val() ));
		cModalMonthlyPay.val(Math.round( ( parseInt(price) - cFirstPay.text() ) / termPay.val() ));
		cModalLabelMonthlyPay.text(Math.round( ( parseInt(price) - cFirstPay.text() ) / termPay.val() ));
	}
	function calculateMonthlyPay(price, value) {
		// Щомісячний платіж
		cMonthlyPay.text(Math.round( ( parseInt(price) - cFirstPay.text() ) / value ));
		cModalMonthlyPay.val(Math.round( ( parseInt(price) - cFirstPay.text() ) / value ));
		cModalLabelMonthlyPay.text(Math.round( ( parseInt(price) - cFirstPay.text() ) / value ));
	}

	// Write the value when changing range input
	firstPay.on("input change", function() {
		// console.log($(this).val());
		calculateFirstPay(cTotalCost, $(this).val());
	});
	termPay.on("input change", function() {
		// console.log($(this).val());
		calculateMonthlyPay(cTotalCost, $(this).val());
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