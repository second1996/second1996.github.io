



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


	/**
	 * Particles.js
	 */
	particlesJS('particles-js', {
		"particles": {
			"number": {
				"value": 6,
				"density": {
					"enable": true,
					"value_area": 750
				}
			},
			"color": {
				"value": ["#F5E3FF", "#ABDCFB", "#1158F2"]
			},
			"shape": {
				"type": "circle",
				"stroke": {
					"width": 0,
					"color": "#fff"
				},
				// "polygon": {
				// 	"nb_sides": 5
				// },
				// "image": {
				// 	"src": "img/github.svg",
				// 	"width": 100,
				// 	"height": 100
				// }
			},
			"opacity": {
				"value": 1,
				"random": true,
				"anim": {
					"enable": true,
					"speed": 0.2,
					"opacity_min": 0,
					"sync": false
				}
			},
			"size": {
				"value": 30,
				"random": true,
				"anim": {
					"enable": true,
					"speed": 5,
					"size_min": 50,
					"sync": false
				}
			},
			"line_linked": {
				"enable": false,
				"distance": 150,
				"color": "#000",
				"opacity": 0.4,
				"width": 1
			},
			"move": {
				"enable": true,
				"speed": 1,
				"direction": "top",
				"random": true,
				"straight": false,
				"out_mode": "out",
				"bounce": false,
				"attract": {
					// "enable": true,
					"rotateX": 600,
					"rotateY": 600
				}
			}
		},
		"interactivity": {
			"detect_on": "canvas",
			"events": {
				"onhover": {
					"enable": false,
					"mode": "bubble"
				},
				"onclick": {
					"enable": false,
					"mode": "repulse"
				},
				"resize": true
			},
			"modes": {
				"grab": {
					"distance": 400,
					"line_linked": {
						"opacity": 1
					}
				},
				"bubble": {
					"distance": 250,
					"size": 0,
					"duration": 15,
					"opacity": 0,
					"speed": 5
				},
				"repulse": {
					"distance": 400,
					"duration": 0.4
				},
				"push": {
					"particles_nb": 4
				},
				"remove": {
					"particles_nb": 2
				}
			}
		},
		"retina_detect": true
	});


})