document.addEventListener('DOMContentLoaded', function() {

	/**
	 * Promo banner
	 */
	const CUT_CODE_PROMO_KEY = 'CutCode_promo_banner';
	const bodyEl = document.querySelector('body');
	const promoBanner = document.querySelector('.promo-banner');
	const promoBannerCloseBtn = promoBanner.querySelector('#closePromoBanner');

	promoBannerCloseBtn.addEventListener('click', function() {
		sessionStorage.setItem(CUT_CODE_PROMO_KEY, 'hidden')
		promoBanner.classList.add('hidden')
		bodyEl.style.paddingTop = '';
	})

	if (sessionStorage.getItem(CUT_CODE_PROMO_KEY) !== 'hidden') {
		promoBanner.classList.remove('hidden')
		bodyEl.style.paddingTop = `${promoBanner.offsetHeight}px`
	}

	/**
	 * Mobile menu
	 */
	const burgerMenu = document.querySelector('#burgerMenu');
	const mobileMenu = document.querySelector('#mobileMenu');
	const mobileMenuNavLink = mobileMenu.querySelectorAll('nav > a');
	const closeMobileMenu = document.querySelector('#closeMobileMenu');

	function toggleMobileMenu() {
		mobileMenu.classList.toggle('hidden');
	}

	burgerMenu.addEventListener('click', function(event) {
		toggleMobileMenu();
	});

	closeMobileMenu.addEventListener('click', function(event) {
		toggleMobileMenu();
	});

	mobileMenuNavLink.forEach(function (el) {
		el.addEventListener('click', function(event) {
			toggleMobileMenu();
		});
	});

	/**
	 * Vacancies slider
	 */
	const vacanciesSwiper = new Swiper('.s-vacancies-slider', {
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 40,
		autoHeight: true,
		pagination: {
			el: '.s-vacancies-slider .swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.s-vacancies-slider-arrows .swiper-button-next',
			prevEl: '.s-vacancies-slider-arrows .swiper-button-prev',
		},
		breakpoints: {
			1140: {
				slidesPerView: 2,
				slidesPerGroup: 2,
				autoHeight: false,
			},
		},
	});

	/**
	 * Testimonials slider
	 */
	const testimonialsSwiper = new Swiper('.s-testimonials-slider', {
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 40,
		autoHeight: true,
		pagination: {
			el: '.s-testimonials-slider .swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.s-testimonials-slider-arrows .swiper-button-next',
			prevEl: '.s-testimonials-slider-arrows .swiper-button-prev',
		},
		breakpoints: {
			960: {
				slidesPerView: 2,
				slidesPerGroup: 2,
				autoHeight: false,
			},
		},
	});

	/**
	 * Curriculum accordion
	 */
	const accordionHeader = document.querySelectorAll('.accordion-header');

	accordionHeader.forEach((header) => {
		header.addEventListener('click', function () {
			const accordionContent = header.parentElement.querySelector('.accordion-content');
			let accordionMaxHeight = accordionContent.style.maxHeight;

			// Condition handling
			if (accordionMaxHeight == '0px' || accordionMaxHeight.length == 0) {
				accordionContent.style.maxHeight = `${accordionContent.scrollHeight + 32}px`;
				header.classList.add('_is-toggled');
			} else {
				accordionContent.style.maxHeight = `0px`;
				header.classList.remove('_is-toggled');
			}
		});
	});

	/**
	 * Price timer
	 */
	const deadline = document.querySelector('.s-price-timer').dataset.deadline;

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date),
					days = Math.floor(t / (1000 * 60 * 60 * 24)),
					hours = Math.floor((t / (1000 * 60 * 60) % 24)),
					minutes = Math.floor((t / 1000 / 60 ) % 60),
					seconds = Math.floor((t / 1000) % 60);

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function getZero(num) {
		if (num < 0) {
			return '00';
		}
		if (num >= 0 && num < 10) {
			return `0${num}`
		} else {
			return `${num}`;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector);
		const days = timer.querySelector('#s-price-timer-days');
		const hours = timer.querySelector('#s-price-timer-hours');
		const minutes = timer.querySelector('#s-price-timer-minutes');
		const seconds = timer.querySelector('#s-price-timer-seconds');
		const timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.s-price-timer', deadline);

	/**
	 * Anchor smooth scroll
	 */
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();

			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});

});