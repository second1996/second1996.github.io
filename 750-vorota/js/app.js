$(document).ready(function() {

	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	* Fancybox config
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$.fancybox.defaults.animationEffect = 'fade'
	$.fancybox.defaults.buttons = ['zoom', 'thumbs', 'close']


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	* Bootstrap Tooltip
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$('[data-toggle="tooltip"]').tooltip()


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	* Sticky header
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	new Headhesive('.header-middle', {
		offset: 400,
		classes: {
			clone:   'header--clone',
			stick:   'header--stick',
			unstick: 'header--unstick'
		},
		onInit: function() {
			$('.header--clone').find('.search-results').remove()
		}
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	* Toggle Search results
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$(document).on('click', '.header-middle:not(.header--clone) #header-search-field, .header-middle-actions .search', function() {
		const searchEl = $('.header-middle-search')

		searchEl.addClass('_is-focused')
		searchEl.find('.search-results').addClass('_is-opened')

		$(document).on('click', function(e) {
			if ((!searchEl.is(e.target) && !$('.header-middle-actions .search').is(e.target)) && (searchEl.has(e.target).length === 0 && $('.header-middle-actions .search').has(e.target).length === 0)) {
				$('body').removeClass('lock-scroll')
				searchEl.removeClass('_is-focused')
				searchEl.find('.search-results').removeClass('_is-opened')
			}
		})

		if( window.matchMedia('(max-width: 1239.98px)').matches ) {
			$('body').addClass('lock-scroll')
		}
	})

	$(document).on('click', '.header-middle-search .heading .btn-close', function() {
		const searchEl = $('.header-middle-search')

		$('body').removeClass('lock-scroll')
		searchEl.removeClass('_is-focused')
		searchEl.find('.search-results').removeClass('_is-opened')
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	* Mobile menu
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	function mmenuBackdrop() {
		if (!$('.mmenu-backdrop').length) {
			$('body').append('<div class="mmenu-backdrop fade"></div>')
			$('.mmenu-backdrop').delay(5).queue(function() {
				$(this).addClass('show').dequeue()
				$(this).on('click', function () {
					mmenuBackdrop()
					$('body').removeClass('lock-scroll')
					$('.mmenu').removeClass('_is-active')
				})
			})
		} else {
			$('.mmenu-backdrop').remove()
		}
	}

	// Open menu
	$(document).on('click', '.toggle-mmenu-btn', function() {
		mmenuBackdrop()

		$('body').addClass('lock-scroll')
		$('.mmenu').addClass('_is-active')
	})

	// Close menu
	$('.mmenu .mmenu-heading .btn-close').on('click', function() {
		mmenuBackdrop()

		$('body').removeClass('lock-scroll')
		$('.mmenu').removeClass('_is-active')
	})

	// Toggle Submenu
	$('.mmenu-main-catalog > .btn, .mmenu-main-nav .menu-item > span').on('click', function() {
		$(this).siblings('.submenu').addClass('_is-opened')
	})

	// Close Submenu
	$('.mmenu-main-catalog > .submenu > .submenu-back-btn, .mmenu-main-nav .menu-item > .submenu > .submenu-back-btn').on('click', function() {
		$(this).parent().removeClass('_is-opened')
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
	* Hide Shop Promo string and setup «key -> hide-shop-promo into the sessionStorage
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$('.shop-promo .btn-close').on('click', function () {
		$('.shop-promo').hide()
		sessionStorage.setItem('shop-promo', 'hide')
	})

	// Check if «hide-shop-promo set «true» in sessionStorage...
	if (sessionStorage.getItem('shop-promo') == 'hide') {
		// ... and then hide this
		$('.shop-promo').hide()
	} else {
		// ... or show
		$('.shop-promo').removeClass('d-none')
	}


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	* Switch phone mask in forms
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	function switchPhoneMask(selector) {
		var maskCheckbox = $(selector).find('input[type="checkbox"]'),
				maskInput = maskCheckbox.parents('.form-group').find('input[type="tel"]');

		if (maskCheckbox.is(':checked')) {
			maskInput.mask('+7 (999) 999-99-99')
			maskInput.attr('placeholder', '+7 (___) ___ __ __')
		} else {
			maskInput.mask('0#')
			maskInput.attr('placeholder', 'Номер телефона')
		}
	}

	window.initSwitchPhoneMask = function() {
		$('.switch-input-mask').each(function(index, element) {
			switchPhoneMask(element)
	
			$(element).find('input[type="checkbox"]').on('input checked', function() {
				switchPhoneMask(element)
			})
		})
	}
	initSwitchPhoneMask()


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	* Product card gallery slideshow on hover
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	if (window.matchMedia('(min-width: 992px)').matches) {
		$(document).on('mouseenter', '.card-product .card-gallery-item', function() {
			$(this).siblings().removeClass('_active')
			$(this).addClass('_active')
		})
	}


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	* Go up button
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	var go_up_btn = $('#go-up-button')

	$(window).on('scroll', function() {
		if ($(window).scrollTop() > 1000) {
			go_up_btn.addClass('_is-shown')
		} else {
			go_up_btn.removeClass('_is-shown')
		}
	})

	go_up_btn.on('click', function(e) {
		e.preventDefault()
		$('html, body').animate({scrollTop:0}, 1000)
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Smooth scroll
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$('a[data-smoothscroll]').bind('click.smoothscroll', function(){
		var target = $(this).attr('href'),
				bl_top = $(target).offset().top - 75;

		$('body, html').animate({scrollTop: bl_top}, 1000)

		return false
	})

})
