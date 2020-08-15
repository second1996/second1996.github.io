// JavaScript
document.addEventListener("DOMContentLoaded", function() {
	// Adaptive menu
	const container = document.querySelector('.header-menu')
	const primary = container.querySelector('.header-menu-primary')
	const primaryItems = container.querySelectorAll('.header-menu-primary > li:not(.more)')
	container.classList.add('--jsfied')

	// insert "more" button and duplicate the list
	primary.insertAdjacentHTML('beforeend', `
		<li class="more">
			<button class="btn btn-more" aria-haspopup="true" aria-expanded="false">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2 2H14V4H2V2Z" />
					<path d="M2 7H14V9H2V7Z" />
					<path d="M2 12H14V14H2V12Z" />
				</svg>
				<span>Все разделы</span>
			</button>
			<ul class="-secondary">
				${primary.innerHTML}
			</ul>
		</li>
	`)
	const secondary = container.querySelector('.-secondary')
	const secondaryItems = secondary.querySelectorAll('li')
	const allItems = container.querySelectorAll('li')
	const moreLi = primary.querySelector('.more')
	const moreBtn = moreLi.querySelector('button')
	moreBtn.addEventListener('click', (e) => {
		e.preventDefault()
		container.classList.toggle('--show-secondary')
		moreBtn.setAttribute('aria-expanded', container.classList.contains('--show-secondary'))
	})

	// adapt tabs
	const doAdapt = () => {
		// reveal all items for the calculation
		allItems.forEach((item) => {
			item.classList.remove('--hidden')
		})

		// hide items that won't fit in the Primary
		let stopWidth = moreBtn.offsetWidth
		let hiddenItems = []
		const primaryWidth = primary.offsetWidth
		primaryItems.forEach((item, i) => {
			if(primaryWidth >= stopWidth + item.offsetWidth) {
				stopWidth += item.offsetWidth
			} else {
				item.classList.add('--hidden')
				hiddenItems.push(i)
			}
		})
		
		// toggle the visibility of More button and items in Secondary
		if(!hiddenItems.length) {
			moreLi.classList.add('--hidden')
			container.classList.remove('--show-secondary')
			moreBtn.setAttribute('aria-expanded', false)
		}
		else {
			secondaryItems.forEach((item, i) => {
				if(!hiddenItems.includes(i)) {
					item.classList.add('--hidden')
				}
			})
		}
	}

	// doAdapt() // adapt immediately on load
	setTimeout(() => {
		doAdapt()
	}, 500)
	window.addEventListener('resize', doAdapt) // adapt on window resize

	// hide Secondary on the outside click
	document.addEventListener('click', (e) => {
		let el = e.target
		while(el) {
			if(el === secondary || el === moreBtn) {
				return;
			}
			el = el.parentNode
		}
		container.classList.remove('--show-secondary')
		moreBtn.setAttribute('aria-expanded', false)
	})

})


// jQuery
jQuery(document).ready(function($) {

	/**
	 * Preloader
	 */
	var preloader = $('.preloader')
	preloader
	.delay(500).queue(function () {
		$(this).css({opacity: '0'})
		$(this).dequeue()
	})
	.delay(250).queue(function () {
		$(this).remove()
		$(this).dequeue()
	})


	/**
	 * Toggle User Profile Modal
	 */
	$(document).on('hidden.bs.modal', '.modal', function () {
		$('.modal:visible').length && $(document.body).addClass('modal-open')
	})


	/**
	 * LazyLoad initialization
	 */
	var lazyLoadInstance = new LazyLoad({
		elements_selector: ".lazy",
		// callback_loaded: function(element) {
		//   console.log("👍 LOADED", element);
		//   $(element).siblings('.lazy-spin').remove();
		// },
	})


	/**
	 * Home slider
	 */
	if( $.fn.slick ) {
		$('.heroes-slider').slick({
			// autoplay: true,
			// autoplaySpeed: 3000,
			infinite: false,
			dots: true,
		})
	}
	/**
	 * Product slider
	 */
	if( $.fn.slick ) {
		$('.product-slider').slick({
			// autoplay: true,
			// autoplaySpeed: 3000,
			infinite: false,
			dots: true,
		})
	}
	// $('.heroes-slide').on('beforeChange', function(event, slick, currentSlide, nextSlide){
	// 	lazyLoadInstance.update();
	// });


	/**
	 * Toggle Search form
	 */
	var searchBlock = $('.header-search')

	$('.mobile-action .search-btn').on('click', function () {
		$('#header-search-form').addClass('is-active')
	})
	$('#header-search-form .search-form-close').on('click', function () {
		$('#header-search-form').removeClass('is-active')
		searchBlock.removeClass('is-active')
		$('.header-search-backdrop').remove()
	})
	$('#header-search-form .search-form-input').on('click', function () {
		searchBlock.addClass('is-active')
		if( !$('.header-search-backdrop').length ) {
			$('body').append('<div class="header-search-backdrop"></div>')
		}
		$('.header-search-backdrop').click(function () {
			searchBlock.removeClass('is-active')
			$(this).remove()
		})
	})


	/**
	 * Toggle Mobile menu
	 */
	$('.mobile-action .burger-btn').on('click', function () {
		$('body').addClass('disable-scroll')
		$('.m-menu').addClass('is-active')
	})
	$('.m-menu-header .close').on('click', function () {
		$('body').removeClass('disable-scroll')
		$('.m-menu').removeClass('is-active')
	})


	/**
	 * Toggle Product filter
	 */
	$('#product-filter-open').on('click', function () {
		$('body').addClass('disable-scroll')
		$('.filter-wrapper').addClass('is-active')
		if( !$('.filter-backdrop').length ) {
			$('body').append('<div class="filter-backdrop fade"></div>')
			$('.filter-backdrop').delay(20).queue(function () {
				$(this).addClass('show')
				$(this).dequeue()
			})
			$('.filter-backdrop').click(function () {
				$(this).remove()
				$('body').removeClass('disable-scroll')
				$('.filter-wrapper').removeClass('is-active')
			})
		}
	})
	$('#product-filter .filter-header .close').on('click', function () {
		$('body').removeClass('disable-scroll')
		$('.filter-wrapper').removeClass('is-active')
		$('.filter-backdrop').remove()
	})
	$('#product-filter input[type="checkbox"]').on('click', function () {
		checkFilters()
	})
	// Toggle '.active-filters' & '.filter-trigger--clear' when input checkbox length > 1
	function checkFilters() {
		var filterInputs = $('#product-filter input[type="checkbox"]:checked')
		// console.log(filterInputs)
		if( filterInputs.length > 0 ) {
			if ( !$('#product-filter-open .active-filters').length ) {
				$('#product-filter-open').append('<span class="active-filters"></span>')
			}
			if ( !$('.filter-trigger--clear').hasClass('is-shown') ) {
				$('.filter-trigger--clear').addClass('is-shown')
			}
		} else {
			$('#product-filter-open .active-filters').remove()
			$('.filter-trigger--clear').removeClass('is-shown')
		}
	}
	// Clear filter input checkboxs
	$('#product-filter-clear').on('click', function () {
		$('.filter-trigger--clear').removeClass('is-shown')
		clearFilters()
	})
	function clearFilters() {
		var filterInputs = $('#product-filter input[type="checkbox"]:checked')
		$('#product-filter-open .active-filters').remove()
		$.each(filterInputs, function (index, element) {
			$(element).prop('checked', false)
		})
	}

	$('.profile-orders-table').footable({
		// "toggleColumn": "last",
		"breakpoints": {
			"xxs": 320,
			"xs": 576,
			"sm": 768,
			"md": 992,
			"lg": 1278
		}
	});
})