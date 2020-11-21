
jQuery(document).ready( function($) {

	/**
	 * Mega Menu Brands slider
	 */
	$('.mega-menu .brands-slider').each(function(index, element){
		$(element).addClass('brands-slider-' + index)
		var mmBrands = new Swiper('.brands-slider-' + index + ' .brands-slider-container', {
			observer: true,
			observeParents: true,
			watchSlidesVisibility: true,
			loop: false,
			slidesPerView: 4,
			spaceBetween: 18,
			navigation: {
				nextEl: '.brands-slider-' + index +' .swiper-button-next',
				prevEl: '.brands-slider-' + index +' .swiper-button-prev',
			},
		})
	})

	/**
	 * Home Banner slider
	 */
	var hBanner = new Swiper('.h-banner .h-banner-slider-container', {
		// autoplay: {
		// 	delay: 5000,
		// },
		// allowTouchMove: false,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		grabCursor: true,
		loop: false,
		speed: 750,
		slidesPerView: 1,
		spaceBetween: 10,
		navigation: {
			nextEl: '.h-banner-slider .swiper-button-next',
			prevEl: '.h-banner-slider .swiper-button-prev',
		},
		pagination: {
			el: '.h-banner-slider .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		// breakpoints: {
		// 	768: {
		// 		autoplay: false
		// 	}
		// }
	})

	/**
	 * Product Tab slider
	 */
	$('.tab-slider').each(function(index, element){
		$(element).addClass('tab-slider-' + index)
		var tabSlider = new Swiper('.tab-slider-' + index + ' .tab-slider-container', {
			observer: true,
			observeParents: true,
			allowTouchMove: false,
			loop: false,
			speed: 650,
			slidesPerView: 4,
			slidesPerGroup: 4,
			spaceBetween: 30,
			navigation: {
				nextEl: '.tab-slider-' + index +' .swiper-button-next',
				prevEl: '.tab-slider-' + index +' .swiper-button-prev',
			},
			pagination: {
				el: '.tab-slider-' + index +' .swiper-pagination',
				type: 'bullets',
				clickable: true,
			},
		})
	})

	/**
	 * Home News slider
	 */
	var hNewsSlider = new Swiper('.h-news-slider-container', {
		observer: true,
		observeParents: true,
		allowTouchMove: true,
		loop: false,
		speed: 650,
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 10,
		navigation: {
			nextEl: '.h-news-slider .swiper-button-next',
			prevEl: '.h-news-slider .swiper-button-prev',
		},
		pagination: {
			el: '.h-news-slider .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			576: {
				slidesPerView: 2,
				slidesPerGroup: 2,
				spaceBetween: 20,
			},
			768: {
				allowTouchMove: false,
				slidesPerView: 3,
				slidesPerGroup: 3,
				spaceBetween: 30,
			},
			992: {
				slidesPerView: 4,
				slidesPerGroup: 4,
				spaceBetween: 30,
			}
		}
	})

	/**
	 * Home Articles slider
	 */
	var hArticlesSlider = new Swiper('.h-articles-slider-container', {
		observer: true,
		observeParents: true,
		allowTouchMove: true,
		loop: false,
		speed: 650,
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 10,
		navigation: {
			nextEl: '.h-articles-slider .swiper-button-next',
			prevEl: '.h-articles-slider .swiper-button-prev',
		},
		pagination: {
			el: '.h-articles-slider .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			576: {
				slidesPerView: 2,
				slidesPerGroup: 2,
				spaceBetween: 20,
			},
			768: {
				allowTouchMove: false,
				slidesPerView: 3,
				slidesPerGroup: 3,
				spaceBetween: 30,
			}
		}
	})

	/**
	 * Home Testimonials slider
	 */
	var hTestimonialsSlider = new Swiper('.h-testimonials-slider-container', {
		init: false,
		observer: true,
		observeParents: true,
		allowTouchMove: true,
		loop: false,
		speed: 650,
		autoHeight: true,
		slidesPerView: 1,
		spaceBetween: 10,
		pagination: {
			el: '.h-testimonials-slider .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			992: {
				allowTouchMove: false,
				autoHeight: false,
				slidesPerView: 3,
				slidesPerGroup: 3,
				spaceBetween: 30,
				pagination: false,
			}
		}
	})
	/**
	 * Read More button for Testimonial cards
	 */
	$('#testimonials-tab').on('shown.bs.tab', function() {
		hTestimonialsSlider.init()
		setTimeout(() => {
			$('.card-testimonial .text').readmore({
				embedCSS: false,
				speed: 75,
				moreLink: '<button type="button" class="read-more"><span>Читать все</span><svg class="icon icon-arrow"><use xlink:href="/images/symbol-defs.svg#arrow"></use></svg></button>',
				lessLink: '<button type="button" class="read-more _toggled"><span>Спрятать</span><svg class="icon icon-arrow"><use xlink:href="/images/symbol-defs.svg#arrow"></use></svg></button>',
				afterToggle: function(trigger, element, expanded) {
					hTestimonialsSlider.update()
				}
			})
		}, 50);
	})

	/**
	 * Home About Gallery slider
	 */
	var hAboutGallerySlider = new Swiper('.h-about-gallery', {
		loop: false,
		speed: 650,
		pagination: {
			el: '.h-about-gallery .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	})

	/**
	 * Home Manufacturers slider
	 */
	var hManufacturersSlider = new Swiper('.h-manufacturers-slider-container', {
		watchSlidesVisibility: true,
		allowTouchMove: true,
		loop: false,
		speed: 650,
		slidesPerView: 1,
		spaceBetween: 10,
		navigation: {
			nextEl: '.h-manufacturers-slider .swiper-button-next',
			prevEl: '.h-manufacturers-slider .swiper-button-prev',
		},
		breakpoints: {
			576: {
				slidesPerView: 2,
				slidesPerGroup: 2,
				spaceBetween: 20,
			},
			768: {
				allowTouchMove: true,
				slidesPerView: 3,
				slidesPerGroup: 3,
				spaceBetween: 30,
			},
			992: {
				slidesPerView: 4,
				slidesPerGroup: 4,
				spaceBetween: 30,
			}
		}
	})


	/**
	 * Promo Banner slider
	 */
	var promoBanner = new Swiper('.promo-banner .promo-banner-slider-container', {
		preloadImages: false,
		lazy: true,
		// autoHeight: true,
		loop: false,
		speed: 750,
		slidesPerView: 1,
		spaceBetween: 10,
		navigation: {
			nextEl: '.promo-banner-slider .swiper-button-next',
			prevEl: '.promo-banner-slider .swiper-button-prev',
		},
		pagination: {
			el: '.promo-banner-slider .swiper-pagination',
			type: 'bullets',
			clickable: true,
		}
	})


	/**
	 * Compare products slider
	 */
	var compareProductsSlider = new Swiper('.compare .products-slider-container', {
		watchSlidesVisibility: true,
		allowTouchMove: true,
		grabCursor: true,
		keyboard: {
			enabled: true,
			onlyInViewport: false,
		},
		loop: false,
		slidesPerView: 1,
		speed: 250,
		navigation: {
			nextEl: '.compare .products-slider .swiper-button-next',
			prevEl: '.compare .products-slider .swiper-button-prev',
		},
		breakpoints: {
			768: {
				allowTouchMove: false,
				slidesPerView: 2
			},
			992: {
				slidesPerView: 3
			},
			1230: {
				slidesPerView: 4
			}
		}
	})
	var compareTableSlider = new Swiper('.compare .compare-table-values', {
		allowTouchMove: true,
		grabCursor: true,
		keyboard: {
			enabled: true,
			onlyInViewport: false,
		},
		loop: false,
		slidesPerView: 1,
		speed: 250,
		scrollbar: {
			el: '.compare .swiper-scrollbar',
			draggable: true,
		},
		breakpoints: {
			768: {
				allowTouchMove: false,
				slidesPerView: 2
			},
			992: {
				slidesPerView: 3
			},
			1230: {
				slidesPerView: 4
			}
		}
	})

	/**
	 * Swiper sync control sliders
	 */
	if( $('.compare .products-slider-container, .compare .compare-table-values').length ) {
		compareProductsSlider.controller.control = compareTableSlider
		compareTableSlider.controller.control = compareProductsSlider
	}


	/**
	 * Pickup Page slider
	 */
	$('.pickup-gallery').each(function(index, element){
		$(element).addClass('pickup-gallery-' + index)
		var pickupSlider = new Swiper('.pickup-gallery-' + index + ' .pickup-gallery-slider', {
			observer: true,
			observeParents: true,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			grabCursor: true,
			loop: false,
			speed: 750,
			slidesPerView: 1,
			spaceBetween: 10,
			navigation: {
				nextEl: '.pickup-gallery-' + index +' .swiper-button-next',
				prevEl: '.pickup-gallery-' + index +' .swiper-button-prev',
			},
			pagination: {
				el: '.pickup-gallery-' + index +' .swiper-pagination',
				type: 'bullets',
				clickable: true,
			},
		})
	})


	/**
	 * Contacts Gallery slider
	 */
	var contactsGallerySlider = new Swiper('.contacts .contacts-gallery', {
		loop: false,
		speed: 650,
		pagination: {
			el: '.contacts .contacts-gallery .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	})


	/**
	 * Shop category Popular Brands slider
	 */
	var categoryPopularBrands = new Swiper('.s-category-brands-slider-container', {
		watchSlidesVisibility: true,
		loop: false,
		slidesPerView: 1,
		spaceBetween: 10,
		navigation: {
			nextEl: '.s-category-brands-slider .swiper-button-next',
			prevEl: '.s-category-brands-slider .swiper-button-prev',
		},
		pagination: {
			el: '.s-category-brands-slider .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			576: {
				slidesPerView: 2,
				slidesPerGroup: 2,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 3,
				slidesPerGroup: 3,
				spaceBetween: 30,
			},
			992: {
				slidesPerView: 4,
				slidesPerGroup: 4,
				spaceBetween: 30,
			}
		}
	})

	/**
	 * Single Product: Products slider
	 */
	$('.product-single .products-slider-inner').each(function(index, element){
		$(element).addClass('products-slider-inner-' + index)
		var pickupSlider = new Swiper('.products-slider-inner-' + index + ' .products-slider-container', {
			grabCursor: true,
			loop: false,
			speed: 750,
			slidesPerView: 1,
			slidesPerGroup: 1,
			spaceBetween: 30,
			navigation: {
				nextEl: '.products-slider-inner-' + index +' .swiper-button-next',
				prevEl: '.products-slider-inner-' + index +' .swiper-button-prev',
			},
			pagination: {
				el: '.products-slider-inner-' + index +' .swiper-pagination',
				type: 'bullets',
				clickable: true,
			},
			breakpoints: {
				375: {
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 15,
				},
				768: {
					slidesPerView: 3,
					slidesPerGroup: 3,
					spaceBetween: 30,
				},
				992: {
					slidesPerView: 4,
					slidesPerGroup: 4,
					spaceBetween: 30,
				}
			}
		})
	})


	/**
	 * Quickview Product Modal slider
	 */
	initQuickviewModal = function () {
		var quickviewNavSlider = new Swiper('.quickview-modal .quickview-nav-slider', {
			observer: true,
			observeParents: true,
			allowTouchMove: false,
			loop: false,
			slidesPerView: 'auto'
		})
		var quickviewBodySlider = new Swiper('.quickview-modal .quickview-body-slider', {
			observer: true,
			observeParents: true,
			allowTouchMove: false,
			loop: false,
			speed: 450,
			slidesPerView: 1,
			spaceBetween: 30,
			thumbs: {
				swiper: quickviewNavSlider
			}
		})
		var quickviewPhotoThumbsSlider = new Swiper('.quickview-modal .quickview-photo-thumbs-slider', {
			observer: true,
			observeParents: true,
			allowTouchMove: false,
			loop: false,
			slidesPerView: 'auto',
			spaceBetween: 8
		})
		var quickviewPhotoSlider = new Swiper('.quickview-modal .quickview-photo-slider', {
			observer: true,
			observeParents: true,
			loop: false,
			speed: 450,
			slidesPerView: 1,
			navigation: {
				nextEl: '.quickview-photo-slider .swiper-button-next',
				prevEl: '.quickview-photo-slider .swiper-button-prev',
			},
			thumbs: {
				swiper: quickviewPhotoThumbsSlider
			}
		})
	}
	initQuickviewModal()

})

jQuery(document).ready( function($) {
	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * WIDGET: Price Filter (noUiSlider)
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	var filterSlider = document.querySelectorAll('.filter-slider-handle');

	if( filterSlider.length ) {
		initFilterSlider = function() {
			filterSlider.forEach(slider => {
				let filterMinPrice = parseInt( slider.dataset.slidermin );
				let filterMaxPrice = parseInt( slider.dataset.slidermax );
				let priceFrom      = slider.nextElementSibling.querySelector('.filter-slider-from');
				let priceTo        = slider.nextElementSibling.querySelector('.filter-slider-to');
				let inputMinPrice  = parseInt( priceFrom.value );
				let inputMaxPrice  = parseInt( priceTo.value );

				// Create noUiSlide
				noUiSlider.create(slider, {
					start: [inputMinPrice, inputMaxPrice],
					connect: true,
					range: {
							'min': filterMinPrice,
							'max': filterMaxPrice
					}
				})

				// Change/Update noUiSlide values
				priceFrom.addEventListener('change', priceUpdateValues);
				priceTo.addEventListener('change', priceUpdateValues);

				slider.noUiSlider.on('update', function (values, handle) {
					var value = values[handle];

					// Set «from» value
					if (handle == 0) {
						priceFrom.value = Math.round(value);
					}

					// Set «to» value
					if( handle == 1) {
						priceTo.value = Math.round(value);
					}
				})

				slider.noUiSlider.on('end', function (values, handle) {
					// Trigger «from» input value
					if (handle == 0) {
						$(priceFrom).change()
					}

					// Trigger «to» input value
					if( handle == 1) {
						$(priceTo).change()
					}
				})

				function priceUpdateValues() {
					var priceFromValue, priceToValue;

					// Check if value isn't empty...
					if (priceFrom.value != '') {
						priceFromValue = priceFrom.value;
					}
					if (priceTo.value != '') {
						priceToValue = priceTo.value;
					}

					// ... and change values
					slider.noUiSlider.set([priceFromValue, priceToValue]);
				}

				// Set default values when form is reset
				document.querySelector('.filter-reset').addEventListener('click', function () {
					slider.noUiSlider.set([parseInt(slider.dataset.slidermin), parseInt(slider.dataset.slidermax)]);
					priceFrom.setAttribute('value', parseInt(slider.dataset.slidermin));
					priceTo.setAttribute('value', parseInt(slider.dataset.slidermax));
				})
			})
		}
		initFilterSlider()
	}

	// Reinit filter
	reinitFilterSlider = function() {
		$('.filter-toggle-header._toggled, .widget-header._toggled').next().css('display', 'block');

		filterSlider = document.querySelectorAll('.filter-slider-handle');
		initFilterSlider()
	}
})
jQuery(document).ready( function($) {

	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Show input phone mask when checkbox is checked
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	function switch_phone_mask(selector) {
		var switch_phone_mask_checkbox = $(selector).find('input[type="checkbox"]'),
				switch_phone_mask_input = switch_phone_mask_checkbox.parents('.form-group').find('input[type="tel"]');

		if( switch_phone_mask_checkbox.is(':checked') ) {
			switch_phone_mask_input.mask('+7 (999) 999-99-99')
			switch_phone_mask_input.attr('placeholder', '+7 (___) ___-__-__')
		} else {
			switch_phone_mask_input.mask('0#')
			switch_phone_mask_input.attr('placeholder', 'Номер телефона')
		}
	}
	// Callback
	$('.switch-input-mask').each(function(index, element) {
		/**
		 * Run switch_phone_mask function for each selector on the page
		 */
		switch_phone_mask(element)

		/**
		 * Run switch_phone_mask function when checkbox is changed
		 */
		$(element).find('input[type="checkbox"]').on('input checked', function() {
			switch_phone_mask(element)
		})
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Sort a list alphabetically
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	$.fn.sortList = function() {
		var list = $(this)
		var listItems = $('.form-checkbox', list).get()

		listItems.sort(function(a, b) {
			var compA = $(a).text().toUpperCase()
			var compB = $(b).text().toUpperCase()
			return (compA < compB) ? -1 : 1;
		})

		$.each(listItems, function(i, el) {
			// list.append(itm);
			var letter = $(el).text().charAt(0);

			if (!$(this).parent().find('[data-letter="'+ letter +'"]').length) {
				$(this).parent().append('<div data-letter="'+ letter+'"><span>'+ letter +'</span></div>')
			}
			$(this).parent().find('[data-letter="'+ letter +'"]').append(this)
		})
	}
	$('#sort-brand-az').sortList()


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Search items in alphabet
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	$('.filter-alphabet .filter-search-control').on('keyup', function() {
		var value = this.value.toLowerCase().trim();

		$('.filter-alphabet-list div').show().filter(function() {
			return $(this).text().toLowerCase().trim().indexOf(value) == -1;
		}).hide();
	});


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Product Quantity
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	// if (!String.prototype.getDecimals) {
	// 	String.prototype.getDecimals = function () {
	// 		var num = this,
	// 			match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
	// 		if (!match) {
	// 			return 0;
	// 		}
	// 		return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
	// 	}
	// }

	// productQuantity = function() {
	// 	$('body').on('click', '.quantity-minus, .quantity-plus', function () {
	// 		// Get values
	// 		var $qty = $(this).closest('.quantity').find('.quantity-value'),
	// 				currentVal = parseFloat( $qty.attr('data-quantity-value') ),
	// 				max = parseFloat( $qty.attr('max') ),
	// 				min = parseFloat( $qty.attr('min') ),
	// 				step = $qty.attr('step');

	// 		// Format values
	// 		if (!currentVal || currentVal === '' || currentVal === 'NaN') currentVal = 0;
	// 		if (max === '' || max === 'NaN') max = '';
	// 		if (min === '' || min === 'NaN') min = 0;
	// 		if (step === 'any' || step === '' || step === undefined || parseFloat(step) === 'NaN') step = '1';

	// 		// Change the value
	// 		if ($(this).is('.quantity-plus')) {
	// 			if (max && (currentVal >= max)) {
	// 				$qty.val(max + ' шт.');
	// 				$qty.attr('data-quantity-value', max);
	// 			} else {
	// 				var maxValue = (currentVal + parseFloat(step)).toFixed(step.getDecimals())
	// 				$qty.val(maxValue + ' шт.');
	// 				$qty.attr('data-quantity-value', maxValue);
	// 			}
	// 		} else {
	// 			if (min && (currentVal <= min)) {
	// 				$qty.val(min + ' шт.');
	// 				$qty.attr('data-quantity-value', min);
	// 			} else if (currentVal > 0) {
	// 				var minValue = (currentVal - parseFloat(step)).toFixed(step.getDecimals());

	// 				$qty.val(minValue + ' шт.');
	// 				$qty.attr('data-quantity-value', minValue);
	// 			}
	// 		}
	// 		// console.log($qty.attr('data-quantity-value'));
	// 		$qty.attr('data-quantity-value', parseInt( $qty.val() ));

	// 		// Trigger change event
	// 		$qty.trigger('change');
	// 	})
	// }
	// productQuantity()

})
/**
 * Run scripts before loaded page
 */
$(function () {

	// Hide Promo string & setup «key -> hide-promo-string» into sessionStorage
	$('.promo .btn-close').on('click', function () {
		$('.promo').hide()
		sessionStorage.setItem('promo-string', 'hide')
	})
	// Check if «hide-promo-string» set «true» in sessionStorage...
	if( sessionStorage.getItem('promo-string') == 'hide' ) {
		// ... and then hide this.
		$('.promo').hide()
	} else {
		$('.promo').removeClass('d-none')
	}

})

/**
 * Run scripts when loaded page
 */
jQuery(document).ready( function($) {

	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * LazyLoad init
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	var callback_finish = function () {
		allLoaded = true;
		if (printRequested) {
			openPrintDialog();
		}
	}

	var lazyLoadInstance = new LazyLoad({
		elements_selector: ".lazy",
		load_delay: 250,
		callback_loaded: function(element) {
			// console.log("👍 LOADED", element);
			$(element).siblings('.lazy-preloader').remove();
		},
		callback_finish: callback_finish,
	})

	// Callback function for AJAX dynamic content
	reinitLazyLoad = function () {
		lazyLoadInstance.update();
	}

	// lazyLoadAll when page printing
	if( $('.print').length ) {
		var printRequested = false;
		var allLoaded = false;

		function printButtonHandler(event) {
			printButton.innerHTML = "Подготовка...";
			printButton.disabled = true;
			if (allLoaded) {
				openPrintDialog();
			} else {
				printRequested = true;
				lazyLoadInstance.loadAll();
			}
		}

		function openPrintDialog() {
			printButton.innerHTML = printButtonContent;
			printButton.disabled = false;
			window.print();
		}

		var printButton = document.querySelector(".print");
		printButtonContent = printButton.innerHTML
		printButton.addEventListener("click", printButtonHandler)

		var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
		if (!isSafari) {
			window.onbeforeprint = function () {
				lazyLoadInstance.loadAll()
			}
		} else {
			// Safari doesn't support the onbeforeprint event
			var mediaQueryList = window.matchMedia("print");
			mediaQueryList.addListener(function (mql) {
				if (mql.matches) {
					lazyLoadInstance.loadAll()
				}
			})
		}
	}


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Bootstrap Modal (fix scroll when change modal, etc.)
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	$('body').on('show.bs.modal', '.modal', function () {
		$('.modal:visible').removeClass('fade').modal('hide').addClass('fade');
	});
	$('a[href="#userLoginModal"]').on('click', function () {
		$('#userLoginModal').modal('show')
	})
	$('a[href="#userRegisterModal"]').on('click', function () {
		$('#userRegisterModal').modal('show')
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Bootstrap Tooltip
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	$('[data-toggle="tooltip"]').tooltip({
		// trigger: 'click',
		template: '<div class="tooltip base-tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
	})

	$('[data-toggle="filter-tooltip"]').tooltip({
		html: true,
		trigger: 'manual',
		placement: 'right',
		template: '<div class="tooltip base-tooltip filter-tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
	})
	if( $('[data-toggle="filter-tooltip"]').length ) {
		$('.widget-filters [data-toggle="filter-tooltip"]').click(function () {
			$('.widget-filters [data-toggle="filter-tooltip"]').tooltip('hide')
			$(this).tooltip('show')
		})
	}

	if( window.matchMedia('(min-width: 992px)').matches ) {
		$('[data-toggle="variative-product"]').tooltip({
			html: true,
			// trigger: 'click',
			placement: 'left',
			template: '<div class="tooltip variative-tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
			title: function (e) {
				var ttHtml = $(this).find('.product-variative-info').clone();

				return ttHtml;
			}
		})
		$('[data-toggle="variative-comment"]').tooltip({
			html: true,
			// trigger: 'click',
			placement: 'top',
			template: '<div class="tooltip variative-tooltip-comment"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
			title: function (e) {
				var ttCommentHtml = $(this).parent().find('.product-variative-comment').clone();

				return ttCommentHtml;
			}
		})
	}


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Back to Top button
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	var back_to_top = $('#back-to-top');

	$(window).scroll(function() {
		if ($(window).scrollTop() > 1000) {
			back_to_top.addClass('_shown');
		} else {
			back_to_top.removeClass('_shown');
		}
	});

	back_to_top.on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop:0}, 1000);
	});


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Sticky header
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	if( window.matchMedia('(min-width: 1230px)').matches ) {
		var stickyHeader = $('.header'),
				headerOffset = $('.header .header-bottom').offset().top;

		$(window).on('scroll load', function() {
			if( $(window).scrollTop() >= headerOffset ) {
				stickyHeader.addClass('_sticky')
			} else {
				stickyHeader.removeClass('_sticky')
			}
		})
	}


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Mobile header actions
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	if( window.matchMedia('(max-width: 1299.98px)').matches ) {
		// Mobile Menu
		$('.header-bottom .m-actions-item .menu-btn').on('click', function() {
			$(this).toggleClass('_toggled')
			$('.m-menu').toggleClass('_shown')
			$('.header-bottom').toggleClass('m-menu-toggled')
		})

		// Slide submenu
		$('.m-menu-nav ul > li > a.has-submenu').on('click', function(e) {
			e.preventDefault()
			$(this).siblings('.submenu').addClass('_toggled')
			$(this).siblings('.submenu').find('.back-btn').on('click', function() {
				$(this).parents('.submenu').removeClass('_toggled')
			})
		})

		// Mobile Search
		$('.header-bottom .m-actions-item .search-btn').on('click', function() {
			$(this).toggleClass('_toggled')
			$('.header-bottom').toggleClass('search-toggled')
			$('.header-bottom .navigation .search-form').toggleClass('_shown')
			$(document).on('click', function (e) {
				if ($(e.target).closest('.header-bottom').length === 0) {
					$('.header-bottom').removeClass('search-toggled')
					$('.header-bottom .m-actions-item .search-btn').removeClass('_toggled')
					$('.header-bottom .navigation .search-form').removeClass('_shown')
				}
			})
		})
	}


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Header Search form
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	if( window.matchMedia('(min-width: 1230px)').matches ) {
		$('.header-bottom .navigation .search-form input').on('click', function() {
			$(this).parents('.search-form').addClass('_shown')
			$('.header-bottom').addClass('search-toggled')
			$('.header-bottom .navigation .menu').addClass('_hidden')
			$(document).on('click', function (e) {
				if ($(e.target).closest('.header-bottom .navigation .search').length === 0) {
					$('.header-bottom').removeClass('search-toggled')
					$('.header-bottom .navigation .search-form').removeClass('_shown')
					$('.header-bottom .navigation .menu').removeClass('_hidden')
				}
			})
		})
	}


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Mega menu
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	$('.mega-menu-sections .nav-item .has-submenu, .m-menu-nav > ul > li .has-dropmenu, [data-toggle="toggle-box"]').on('click', function(e) {
		e.preventDefault()
		$submenu = $(this)
		//getting the next element
		$content = $submenu.next()
		//open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
		$submenu.toggleClass('_toggled')
		$content.slideToggle(250)
	})
	// Show submenu when page location equail category menu
	$('.mega-menu-sections .nav-item .has-submenu._toggled, .m-menu-nav > ul > li .has-dropmenu._toggled').next().css('display', 'block')


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Product card gallery slideshow on hover
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	$(document).on('mouseenter', '.card-product .card-gallery-item', function() {
		$(this).siblings().removeClass('_active')
		$(this).addClass('_active')
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Marquee Promo string (header)
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	$('.promo-content-marquee').marquee({
		// duration: 12000,
		delayBeforeStart: 0,
		startVisible: true,
		duplicated: true,
		pauseOnHover: true,
		gap: 350,
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Product card actions (wishlist, compare & order buttons)
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	// $('.card-product, .product-single .product-actions').on('click', '.wishlist-btn, .compare-btn, .order-btn', function(e) {
	// 	e.preventDefault()
	// 	$(this).toggleClass('_active')
	// })


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Stores contacts button (fixed)
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	$('.btn-stores-button').on('click', function() {
		$(document).on('click', function (e) {
			if ($(e.target).closest('.btn-stores-content').length === 0) {
				$('.btn-stores').removeClass('_toggled')
			}
		})
		$(this).parents('.btn-stores').toggleClass('_toggled')
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Fix closing dropdown menu when selecting the text
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	$('.dropdown-menu').on('click', function (e) {
		e.stopPropagation()
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Page navigation (Bootstrap ScrollSpy)
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	if( $('#page-navigation').length ) {

		// Init Bootstrap ScrollSpy if #page-navigation id registered on the page
		if( window.matchMedia('(min-width: 768px)').matches ) {
			$('body').scrollspy({
				target: '#page-navigation',
				offset: 300,
			})
		}

		// Animated scroll
		$('.page-navigation-list > li > a').on('click', function(e) {
			var section_id = $(this).attr('href')

			e.preventDefault()
			$('html, body').stop(true).animate({scrollTop: $(section_id).offset().top - 100}, 600)
		})
	}


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Read more button (readmore.js)
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	$('[data-readmore="inline"]').readmore({
		embedCSS: false,
		speed: 75,
		moreLink: '<button type="button" class="read-more"><span>Читать все</span><svg class="icon icon-arrow"><use xlink:href="/images/symbol-defs.svg#arrow"></use></svg></button>',
		lessLink: '<button type="button" class="read-more _toggled"><span>Скрыть</span><svg class="icon icon-arrow"><use xlink:href="/images/symbol-defs.svg#arrow"></use></svg></button>',
	})
	$('[data-readmore="button"]').readmore({
		embedCSS: false,
		collapsedHeight: 160,
		collapsedMoreHeight: 320,
		speed: 75,
		moreLink: '<button type="button" class="btn btn-more btn-primary">Показать еще</button>',
		lessLink: '<button type="button" class="btn btn-more btn-primary">Скрыть</button>',
		afterToggle: function( trigger, element, expanded ) {
			if ( expanded ) {
					element.css( "height", "" );
					element.css( "height", element.height() + "px" );
			}
		},
	})
	$('.brands-card .brand-categories').readmore({
		embedCSS: false,
		speed: 75,
		moreLink: '<button type="button" class="read-more"><span>Показать все</span></button>',
		lessLink: '<button type="button" class="read-more _toggled"><span>Скрыть</span></button>',
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Compare products
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	$('#compare-differences').on('click', function (e) {
		e.preventDefault();

		$('#compare-differences').addClass('_active')

		$('.compare-table-key').each(function(index, el){
			var rowValues = [];
	
			$('.compare-table-slide').each(function() {
				rowValues.push($(this).find('.compare-table-value').eq(index).text())
			})
	
			var toHide = isStringArrayEqual(rowValues);
	
			if( toHide ) {
				$(this).addClass('d-none')
				$('.compare-table-slide').each(function() {
					$(this).find('.compare-table-value').eq(index).addClass('d-none')
				})
			}
		})
	
		function isStringArrayEqual(stringArr) {
			var outArr = true, i = 0;

			while (++i < stringArr.length) {
				outArr = outArr && (stringArr[i-1] === stringArr[i]);
			}

			return outArr;
		}

		$('#compare-all').removeClass('_active')
	})

	$('#compare-all').on('click', function (e) {
		e.preventDefault()
		$('#compare-all').addClass('_active')
		$('.compare-table-key, .compare-table-value').each(function() {
			if( $(this).hasClass('d-none') ) {
				$(this).removeClass('d-none')
			}
		})
		$('#compare-differences').removeClass('_active')
	})

})