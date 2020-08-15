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