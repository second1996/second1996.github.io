



jQuery(document).ready( function($) {
	/**
	 * Anchor smooth scroll link
	 */
	$('a[data-link^="anchor"]').bind('click.smoothscroll', function(){
		var target = $(this).attr('href'),
				bl_top = $(target).offset().top;

		$('body, html').animate({scrollTop: bl_top}, 1000);
		return false;
	});


	/**
	 * Form label animation
	 */
	$('input').on('change', function() {
		var input = $(this);

		if (input.val().length) {
			input.addClass('focused');
		} else {
			input.removeClass('focused');
		}
	});
	// Change start number value on focus input type="tel"
	$('input[type="tel"]').on('focus', function() {
		var input = $(this);

		if( input.val() === '' ) {
			$(this).val('+7')
		}
	})


	/**
	 * Mobile menu
	 */
	$('.header-burger-btn').on('click', function() {
		$('.m-menu').addClass('_toggled')
	})
	$('.m-menu-header .close, .m-menu-nav-list > li > a').on('click', function() {
		$('.m-menu').removeClass('_toggled')
	})


	/**
	 * Slick Carousel for section «Programm»
	 */
	$('.includes-programm-1 .includes-slider-inner').slick({
		infinite: false,
		slidesToShow: 3,
		appendArrows: '.includes-programm-1 .includes-slider-arrows',
		responsive: [
			{
				breakpoint: 575.98,
				settings: {
					initialSlide: 0,
					slidesToShow: 1,
					variableWidth: true,
				}
			}
		]
	})

	var initialSlides = $('.includes-programm-2 .includes-slider-slide').length - 3;
	$('.includes-programm-2 .includes-slider-inner').slick({
		infinite: false,
		initialSlide: parseInt(initialSlides),
		slidesToShow: 3,
		appendArrows: '.includes-programm-2 .includes-slider-arrows',
		responsive: [
			{
				breakpoint: 991.98,
				settings: {
					initialSlide: 0
				}
			},
			{
				breakpoint: 575.98,
				settings: {
					initialSlide: 0,
					slidesToShow: 1,
					variableWidth: true,
				}
			}
		]
	})


	/**
	 * Slick Carousel for section «Comfort»
	 */
	$('.comfort-programm .comfort-slider-inner').slick({
		infinite: false,
		slidesToShow: 3,
		appendArrows: '.comfort-programm .comfort-slider-arrows',
		responsive: [
			{
				breakpoint: 991.98,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 575.98,
				settings: {
					slidesToShow: 1,
					variableWidth: true,
				}
			}
		]
	})

})