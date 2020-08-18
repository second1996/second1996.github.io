/**
 * Toggle «Show all analogs» button
 */
$('.show-more').on('click', function () {
	var hiddenItems = $(this).siblings('.materials-item--hide')

	$(this).remove()
	$.each(hiddenItems, function (index, element) {
		$(element).toggleClass('hidden')
	})
})