$(document).ready(function() {

	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Home page: Heroes main slider
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	new Swiper('.h-heroes-slider', {
		loop: true,
		autoplay: {
			delay: 3500,
		},
		navigation: {
			prevEl: '.h-heroes-slider-nav .swiper-button-prev',
			nextEl: '.h-heroes-slider-nav .swiper-button-next',
		},
		pagination: {
			el: '.h-heroes-slider-dots .swiper-pagination',
			type: 'bullets',
		},
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Home page: Heroes product slider
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	new Swiper('.h-heroes-product-slider', {
		loop: true,
		navigation: {
			prevEl: '.h-heroes-product-slider-nav .swiper-button-prev',
			nextEl: '.h-heroes-product-slider-nav .swiper-button-next',
		},
		pagination: {
			el: '.h-heroes-product-slider-dots .swiper-pagination',
			type: 'bullets',
		},
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Products slider for each section
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$('.products-slider').each(function (index, element) {
		let id = index;

		$(element).addClass(`products-slider-${id}`)

		new Swiper(`.products-slider-${id} .swiper-container`, {
			slidesPerView: 2,
			spaceBetween: 16,
			navigation: {
				prevEl: `.products-slider-${id} .products-slider-nav .swiper-button-prev`,
				nextEl: `.products-slider-${id} .products-slider-nav .swiper-button-next`,
			},
			pagination: {
				el: `.products-slider-${id} .products-slider-dots .swiper-pagination`,
				type: 'bullets',
			},
			breakpoints: {
				576: {
					slidesPerView: 3,
					spaceBetween: 24,
				},
				768: {
					slidesPerView: 4,
				},
				992: {
					slidesPerView: 5,
				},
				1240: {
					slidesPerView: 6,
				}
			}
		})
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Home page: Partners slider
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	new Swiper('.h-partners-slider .swiper-container', {
		slidesPerView: 3,
		spaceBetween: 16,
		loop: true,
		navigation: {
			prevEl: '.h-partners-slider-nav .swiper-button-prev',
			nextEl: '.h-partners-slider-nav .swiper-button-next',
		},
		pagination: {
			el: '.h-partners-slider-dots .swiper-pagination',
			type: 'bullets',
		},
		breakpoints: {
			576: {
				slidesPerView: 4,
				spaceBetween: 24,
			},
			768: {
				slidesPerView: 5,
			},
			992: {
				slidesPerView: 6,
			},
			1240: {
				slidesPerView: 7,
			},
			1468: {
				slidesPerView: 9,
			}
		}
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Home page: Testimonials slider
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	new Swiper('.h-testimonials-slider .swiper-container', {
		slidesPerView: 1,
		spaceBetween: 16,
		autoHeight: true,
		navigation: {
			prevEl: '.h-testimonials-slider-nav .swiper-button-prev',
			nextEl: '.h-testimonials-slider-nav .swiper-button-next',
		},
		pagination: {
			el: '.h-testimonials-slider-dots .swiper-pagination',
			type: 'bullets',
		},
		breakpoints: {
			992: {
				slidesPerView: 2,
				spaceBetween: 24,
				autoHeight: false,
			}
		}
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Quick View gallery slider
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	window.initQuickViewModal = function () {
		// Update BS Tooltip
		$('[data-toggle="tooltip"]').tooltip('update')

		// Thumbs slider
		const qvGalleryThumbsSlider = new Swiper('.modal-quick-view .product-gallery-thumbs .swiper-container', {
			observer: true,
			observeParents: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			allowTouchMove: false,
			slidesPerView: 'auto',
			spaceBetween: 8,
			loop: false
		})

		// Main slider
		const qvGallerySlider = new Swiper('.modal-quick-view .product-gallery-slider .swiper-container', {
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 16,
			loop: false,
			speed: 450,
			navigation: {
				nextEl: '.modal-quick-view .product-gallery-slider-nav .swiper-button-next',
				prevEl: '.modal-quick-view .product-gallery-slider-nav .swiper-button-prev',
			},
			thumbs: {
				swiper: qvGalleryThumbsSlider
			}
		})
	}
	initQuickViewModal()


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Shop Compare slider
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	const compareProductsSlider = new Swiper('.compare-products-slider .swiper-container', {
		slidesPerView: 2,
		spaceBetween: 12,
		navigation: {
			prevEl: '.compare-products-slider-nav .swiper-button-prev',
			nextEl: '.compare-products-slider-nav .swiper-button-next',
		},
		breakpoints: {
			576: {
				slidesPerView: 3,
			},
			992: {
				slidesPerView: 4,
			},
			1240: {
				slidesPerView: 5,
				spaceBetween: 24,
			}
		}
	})
	const compareTableSlider = new Swiper('.compare-table-values .swiper-container', {
		slidesPerView: 2,
		spaceBetween: 0,
		scrollbar: {
			el: '.compare-table-scrollbar',
			draggable: true
		},
		breakpoints: {
			576: {
				slidesPerView: 3,
			},
			992: {
				slidesPerView: 4,
			},
			1240: {
				slidesPerView: 5,
				spaceBetween: 24,
			}
		}
	})

	// Sync Compare sliders
	if( $('.compare .compare-products-slider, .compare .compare-table-values').length ) {
		compareProductsSlider.controller.control = compareTableSlider
		compareTableSlider.controller.control = compareProductsSlider
	}



	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Service single page: Testimonials slider
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	new Swiper('.s-testimonials-slider .swiper-container', {
		slidesPerView: 1,
		spaceBetween: 16,
		autoHeight: true,
		navigation: {
			prevEl: '.s-testimonials-slider-nav .swiper-button-prev',
			nextEl: '.s-testimonials-slider-nav .swiper-button-next',
		},
		pagination: {
			el: '.s-testimonials-slider-dots .swiper-pagination',
			type: 'bullets',
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
				autoHeight: false,
			},
			1468: {
				slidesPerView: 3,
				spaceBetween: 24,
			}
		}
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Product single page: Gallery slider
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	// Thumbs slider
	const productGalleryThumbsSlider = new Swiper('.s-product .product-gallery-thumbs .swiper-container', {
		observer: true,
		observeParents: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		slidesPerView: 6,
		spaceBetween: 8,
		loop: false,
		freeMode: true,
		pagination: {
			el: '.s-product .product-gallery-slider-dots .swiper-pagination'
		}
	})

	// Main slider
	const productGallerySlider = new Swiper('.s-product .product-gallery-slider .swiper-container', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 16,
		loop: false,
		speed: 450,
		navigation: {
			nextEl: '.s-product .product-gallery-slider-nav .swiper-button-next',
			prevEl: '.s-product .product-gallery-slider-nav .swiper-button-prev',
		},
		thumbs: {
			swiper: productGalleryThumbsSlider
		}
	})

})