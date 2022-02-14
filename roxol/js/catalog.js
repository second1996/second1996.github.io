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
});
