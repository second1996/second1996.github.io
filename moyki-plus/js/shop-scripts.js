document.addEventListener("DOMContentLoaded", function() {

	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Catalog Categories slider
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	var categoriesSlider = document.querySelectorAll('.s-catalog .s-catalog-category-slider');
	var subcategoriesSlider = document.querySelectorAll('.s-subcategory .s-subcategory-list');
	var breakpoint = window.matchMedia( '(min-width: 767.98px)' );

	/**
	 * Shop Categories page slider
	 */
	if( categoriesSlider.length ) {
		categoriesSlider.forEach( (element, index) => {
			let categoriesSwiper;

			// Add extra class for each slider
			element.classList.add('s-catalog-category-slider-' + index);

			var breakpointChecker = function() {
				// if larger viewport and multi-row layout needed
				if ( breakpoint.matches === true ) {
						// clean up old instances and inline styles when available
						if ( categoriesSwiper !== undefined ) categoriesSwiper.destroy( true, true );
						// or/and do nothing
						return;
				// else if a small viewport and single column layout needed
				} else if ( breakpoint.matches === false ) {
						// fire small viewport version of swiper
						return enableSwiper();
				}
			}

			var enableSwiper = function() {
				categoriesSwiper = new Swiper('.s-catalog .s-catalog-category-slider-' + index, {
					loop: false,
					speed: 650,
					spaceBetween: 10,
					autoHeight: true,
					pagination: {
						el: '.s-catalog .s-catalog-category-slider-' + index + ' .swiper-pagination',
						type: 'bullets',
						clickable: true,
					}
				})
			}

			// keep an eye on viewport size changes
			breakpoint.addListener(breakpointChecker)
			// kickstart
			breakpointChecker()
		})
	}

	/**
	 * Shop Subcategories page slider
	 */
	if( subcategoriesSlider.length ) {
		subcategoriesSlider.forEach( (element, index) => {
			let subcategoriesSwiper;

			var breakpointChecker = function() {
				// if larger viewport and multi-row layout needed
				if ( breakpoint.matches === true ) {
						// clean up old instances and inline styles when available
						if ( subcategoriesSwiper !== undefined ) subcategoriesSwiper.destroy( true, true );
						// or/and do nothing
						return;
				// else if a small viewport and single column layout needed
				} else if ( breakpoint.matches === false ) {
						// fire small viewport version of swiper
						return enableSwiper();
				}
			}

			var enableSwiper = function() {
				subcategoriesSwiper = new Swiper('.s-subcategory .s-subcategory-list-slider', {
					loop: false,
					speed: 650,
					spaceBetween: 10,
					autoHeight: true,
					pagination: {
						el: '.s-subcategory .s-subcategory-list-slider .swiper-pagination',
						type: 'bullets',
						clickable: true,
					}
				})
			}

			// keep an eye on viewport size changes
			breakpoint.addListener(breakpointChecker);
			// kickstart
			breakpointChecker();
		})
	}


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Brands Alpabet Masonry grid
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	var rowHeight = 20;

	brandsGrid = function() {
		let items = document.querySelectorAll('.s-catalog-brands-item');

		for (let i = 0, item; item = items[i]; i++) {
			item.classList.remove('s-catalog-brands-item-ready');

			let height = item.offsetHeight;
			let rowSpan = Math.ceil(height / rowHeight);

			item.style.gridRowEnd = 'span ' + rowSpan;
			item.classList.add('s-catalog-brands-item-ready');
		}
	}

	window.addEventListener('load', brandsGrid);
	window.addEventListener('resize', () => {
		clearTimeout(brandsGrid.resizeTimer);
		brandsGrid.resizeTimer = setTimeout(brandsGrid, 50);
	})


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

	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Single Product: Discount Modal (noUiSlider)
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	var discountSlider = document.querySelector('#m-discount-slider');

	if( typeof(discountSlider) != 'undefined' && discountSlider != null ) {
		var discountSliderMin = parseInt( discountSlider.dataset.slidermin );
		var discountSliderMax = parseInt( discountSlider.dataset.slidermax );
		var discountSliderInputValue = document.querySelector('.discount-modal-slider-value');

		// Create noUiSlide
		noUiSlider.create(discountSlider, {
			start: discountSliderMin + 1,
			step: 1,
			connect: [true, false],
			range: {
					'min': discountSliderMin,
					'max': discountSliderMax
			}
		})

		// Set default value
		discountSliderInputValue.value = Math.round(discountSlider.noUiSlider.get()) + '%';

		// Change value on toggle slider
		discountSlider.noUiSlider.on('update', function (value) {
			discountSliderInputValue.value = Math.round(value) + '%';
			discountNewPrice(value);
		})

		// Write new price
		function discountNewPrice(value) {
			var productPriceEl = document.querySelector('.product-single .product-price .price-wrapper ins').dataset.finalPrice;
			var productPriceValue = parseInt(productPriceEl);
			var discountNewPriceInput = document.querySelector('.discount-modal-new-price');
			var discountNewPriceValue = productPriceValue * Math.round(value) / 100;

			discountNewPriceInput.value = Math.round(productPriceValue - discountNewPriceValue).toLocaleString('ru') + ' Руб.';
		}
	}

})


jQuery(document).ready( function($) {

	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Move widgets (shop filters) into .clone-widgets wrapper
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	if( $('.clone-widgets').length && window.matchMedia('(max-width: 991.98px)').matches ) {
		$('.page-widgets').appendTo('.clone-widgets')
	}


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Single Product: Sticky Product Complectation
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	if( $('.product-complect').length && window.matchMedia('(min-width: 768px)').matches ) {
		var stickyComplect = $('.product-complect'),
				stickyComplectOffset = stickyComplect.offset().top - 100;

		$(window).on('scroll load', function() {
			if( $(window).scrollTop() >= stickyComplectOffset ) {
				stickyComplect.addClass('_sticky')
			} else {
				stickyComplect.removeClass('_sticky')
			}
		})
	}


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Add display:block for hide container widget (widget title must has class '_toggled')
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	$('.filter-toggle-header._toggled, .widget-header._toggled').next().css('display', 'block')


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Show filter triggers when form has been changed
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	$('.widget-filters-form').on('change', function() {
		$(this).find('.filter-triggers').show();
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Single Product: Product Preview slider
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	var productPreviewThumbsSlider = new Swiper('.product-single .product-preview-thumbs-slider', {
		allowTouchMove: true,
		loop: false,
		slidesPerView: 5,
		spaceBetween: 6,
		pagination: {
			el: '.product-preview-thumbs-slider .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			576: {
				allowTouchMove: false,
				slidesPerView: 'auto',
				spaceBetween: 0,
				pagination: false,
			},
		}
	})

	var productPreviewSlider = new Swiper('.product-single .product-preview-photo-slider', {
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		grabCursor: true,
		loop: false,
		slidesPerView: 1,
		// spaceBetween: 10,
		thumbs: {
			swiper: productPreviewThumbsSlider,
		}
	})

	// Zoom preview photo
	$('.product-preview-photo-zoom > a').on('click', function () {
		var fullPreviewSrc = $('.product-preview-photo-slider .swiper-slide-active').data('product-full-preview')

		$(this).attr('href', fullPreviewSrc)
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Move widgets (shop filters) into .clone-widgets wrapper
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	if( $('.clone-product-summary').length && window.matchMedia('(max-width: 991.98px)').matches ) {
		$('.product-main-right').appendTo('.clone-product-summary')
	}


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Cart page: Datepicker for delivery
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 */
	if( $('[data-toggle="delivery-datepicker"]').length ) {
		moment.locale('ru')

		$('[data-toggle="delivery-datepicker"]').each(function (index, element) {
			$(element).dateRangePicker({
				language: 'ru',
				autoClose: true,
				startDate: new Date(),
				selectForward: true,
				startOfWeek: 'monday',
				minDays: 1,
				maxDays: 30,
				setValue: function(range, from, to) {
					var dateFrom = $(this).find('input.delivery-from')
					var dateTo = $(this).find('input.delivery-to')
					var dateOutput = $(this).find('.delivery-output')
					var dateFormatOuputFrom = moment(from)
					var dateFormatOuputTo = moment(to)

					// Set values
					dateFrom.val(from)
					dateTo.val(to)

					// Output Date format
					dateOutput.text('От ' + dateFormatOuputFrom.format('D MMMM') + ' до ' + dateFormatOuputTo.format('D MMMM'))
				},
				customOpenAnimation: function(cb) {
					$(this).fadeIn(200, cb);
				},
				customCloseAnimation: function(cb) {
					$(this).fadeOut(200, cb);
				}
			})
		})
	}

})