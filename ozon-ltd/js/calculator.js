/**
 * GLOBAL VARIABLES.
 */
const calcForm = $("#c-calc-form")
const cModalLink = $("#c-modal-link")
const reqPay = 10000
const firstpaySlider = $('#c-first-pay')
const termSlider = $('#c-term-pay')
const termTab = $('.form-range-tabs > .tab-item')
const houseTab = $(".calculator-houses .house")
let houseCost = parseInt($(".house--selected").data('house-price'))
let firstpaySliderValue = parseInt(firstpaySlider.val())
let termSliderValue = parseInt(termSlider.val())
let firstpayValue = ''
let termValue = ''


/**
 * Обираємо тип будинку: перезаписуємо ціну будинку.
 */
houseTab.on('click', function() {
  // Забираємо активний клас у всіх елементів
  houseTab.removeClass('house--selected')
  // Додаємо активний клас
  $(this).addClass('house--selected')
  // Перезаписуємо змінну houseCost
  houseCost = $(this).data('house-price')
  // Виконуємо перерахунок функцій
  calcHouseCost()
  calcFirstpay(houseCost, firstpaySlider.val())
  calcTermpay(houseCost, termSlider.val())
})


/**
 * Термін розтермінування: помісячно/квартально
 */
const currentDate = new Date()
const endDate = new Date(2022, 11, 31)
const monthsLeft = (endDate.getFullYear() - currentDate.getFullYear()) * 12 + endDate.getMonth() - currentDate.getMonth() + 1
const quartersLeft = Math.floor(monthsLeft / 3)
const quartersArr = []
const monthsArr = []

for(let q = 1; q <= quartersLeft; q++) {
  quartersArr.push(q)
}
for(let m = 1; m <= monthsLeft; m++) {
  monthsArr.push(m)
}


/**
 * Ініціалізація ionRangeSlider();
 */
firstpaySlider.ionRangeSlider({
  skin: 'round',
  values: [30,40,50,60,70,80,90],
  step: 10,
  hide_min_max: true,
  grid: true,
})
termSlider.ionRangeSlider({
  skin: 'round',
  values: monthsArr,
  hide_min_max: true,
  grid: true,
})


/**
 * Таби помісячно/квартально.
 * Оновлюємо значення слайдерів.
 */
termTab.on('click', function() {
  const termType = $(this).data('term-type')
  const termTypeLabel = $("#c-term-type")
  const termTypeDescrLabel = $("#c-descr-term-label")
  const termTypeModalValue = $("#cModal-term-label")
  const termTypeModalLabel = $("#cModalLabel-term-label")
  const termRS = termSlider.data('ionRangeSlider')

  termTab.removeClass('tab-item--selected')
  $(this).addClass('tab-item--selected')
  if( termType === 'months' ) {
    termRS.update({
      values: monthsArr,
    })
    termTypeLabel.text('міс.')
    termTypeDescrLabel.text('міс.')
    termTypeModalLabel.text('міс.')
    termTypeModalValue.val('помісячно')
  } else {
    termRS.update({
      values: quartersArr,
    })
    termTypeLabel.text('кв.')
    termTypeDescrLabel.text('кв.')
    termTypeModalLabel.text('кв.')
    termTypeModalValue.val('квартально')
  }
})


/**
 * Обраховуэмо вартість за будинок на основні вибраного типу будинку.
 */
function calcHouseCost() {
  const houseName = $(".house--selected > .house-meta > .title").text();
  const houseCostFormat = houseCost.toLocaleString('uk-UA')
  // Записуємо значення в блок "Загальні обрахунки"
  $("#c-total-cost-val").text(houseCostFormat)
  // Записуємо значення в модальне вікно "Залишити заявку"
  $("#cModal-house").val(houseName)
  $("#cModalLabel-house").text(houseName)
  $("#cModal-price").val(houseCostFormat)
  $("#cModalLabel-price").text(houseCostFormat)
};
calcHouseCost()


/**
 * Обраховуємо перший внесок
 */
function calcFirstpay(price = houseCost, persent = firstpaySliderValue) {
  let fpVal = Math.round(parseInt(price * persent / 100 - reqPay))
  let fpFormat = fpVal.toLocaleString('uk-UA')
  // Записуємо значення в блок "Загальні обрахунки"
  $('#c-first-pay-val').text(fpFormat)
  $('#c-descr-firstpay').text(fpFormat)
  // Записуємо значення в модальне вікно "Залишити заявку"
  $("#cModal-firstpay").val(fpFormat)
  $("#cModalLabel-firstpay").text(fpFormat)
  // Записуємо повернене значення в змінну
  return firstpayValue = fpVal
}
calcFirstpay()


/**
 * Обраховуємо платіж на період розтермінування
 */
function calcTermpay(price = houseCost, term = termSliderValue) {
  let termVal = Math.round( parseInt(price - firstpayValue) / term )
  let termFormat = termVal.toLocaleString('uk-UA')
  // Записуємо значення в блок "Загальні обрахунки"
  $('#c-term-val').text(termSlider.val())
  $('#c-term-pay-val').text(termFormat)
  $('#c-descr-term').text(termSlider.val())
  $('#c-descr-termpay').text(termFormat)
  // Записуємо значення в модальне вікно "Залишити заявку"
  $("#cModal-term").val(termSlider.val())
  $("#cModal-termpay").val(termFormat)
  $("#cModalLabel-term").text(termSlider.val())
  $("#cModalLabel-termpay").text(termFormat)
  // Записуємо повернене значення в змінну
  return termVal = term
}
calcTermpay()


/**
 * Перераховуємо платежі, якщо користувач рухає повзунком.
 * Показуємо кнопку "Залишити заявку".
 */
firstpaySlider.on("input change", function() {
  calcFirstpay(houseCost, $(this).val())
  calcTermpay(houseCost, termSlider.val())
})
termSlider.on("input change", function() {
  calcTermpay(houseCost, $(this).val())
})
calcForm.on('input change', function() {
  cModalLink.addClass('shown')
})