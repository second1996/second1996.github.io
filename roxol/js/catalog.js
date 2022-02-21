document.addEventListener('DOMContentLoaded', function () {
  /**
   * Product card gallery slideshow on hover
   */
  // if (window.matchMedia('(min-width: 992px)').matches) {
  $(document).on('mouseenter', '.card-product .card-gallery-item', function () {
    $(this).siblings().removeClass('_is-active');
    $(this).addClass('_is-active');
  });
  // }

  /**
   * Aside: Categories toggler
   */
  $('.catalog-aside-toggler').on('click', function () {
    $(this).next('.catalog-aside-wrapper').slideToggle(0);
  });

  /**
   * Filters: Scrollbar
   */
  $('.filter-group-checkboxes, .catalog-filters-inner, .catalog-aside-wrapper, .catalog-tags-inner').each(function () {
    new SimpleBar($(this)[0], {
      autoHide: false
    })
  })

  /**
   * Filters: Toggle filters
   */
  var filters = $('.catalog-filters');

  $('.catalog-actions-filter-btn, .catalog-filters-heading .close-btn').on('click', function () {
    toggleFilters();
  });

  filters.on('click', function (event) {
    if ($(event.target).is('.catalog-filters')) {
      toggleFilters();
    }
  });

  function toggleFilters() {
    $('body').toggleClass('_is-locked');
    filters.toggleClass('_is-shown');
  }


  /**
   * Filters: Show Reset & Submit buttons
   */
  var filterActions = $('.catalog-filters-form .filter-actions');

  $('.catalog-filters-form').on('change', function () {
    filterActions.addClass('_is-shown');
  });

  /**
   * Filters: Toggle subfilters
   */
  $('.filter-group-heading').on('click', function () {
    var parent = $(this).parent();
    var mainGroup = $(this).next('.filter-group-main');

    if (parent.hasClass('_is-toggled')) {
      parent.removeClass('_is-toggled');
      mainGroup.slideUp(250);
    } else {
      parent.addClass('_is-toggled');
      mainGroup.slideDown(250);
    }
  });

  /**
   * Filters: Toggle subfilters
   */
  $('.gallery-slider').slick({
    asNavFor: '.thumbs-slider',
    slidesToShow: 1,
    speed: 400,
    infinite: false,
    prevArrow: '<button type="button" class="slick-prev"><svg class="icon" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M10.75 3.757L9.338 2.343 3.68 8l1.414 1.414 5.657-5.657z"/><path d="M9.336 13.657l1.414-1.415-5.657-5.656L3.68 8l5.657 5.657h-.001z"/></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg class="icon" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M10.75 3.757L9.338 2.343 3.68 8l1.414 1.414 5.657-5.657z"/><path d="M9.336 13.657l1.414-1.415-5.657-5.656L3.68 8l5.657 5.657h-.001z"/></svg></button>',
  })
  $('.thumbs-slider').slick({
    asNavFor: '.gallery-slider',
    slidesToShow: 4,
    infinite: false,
    arrows: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 374.98,
        settings: {
          slidesToShow: 3,
        }
      },
    ],
  });

  /**
   * Toggle FAQ ask form
   */
  $('#toggle-faq-form').on('click', function() {
    $(this).hide();
    $(this).next().fadeIn(250);
  })

	/**
	 * Fancybox settings
	 */
	$('[data-fancybox]').fancybox({
		smallBtn: true,
	});
});
