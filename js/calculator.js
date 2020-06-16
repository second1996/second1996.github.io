/**
 * Installment calculator
 */
const calcForm               = $("#c-calc-form");
const houseType              = $(".calculator-houses > .house");
let   houseCost              = $(".house--selected").data('house-price');
const firstPay               = $("#c-first-pay");
const termPay                = $("#c-term-pay");
const termTabs               = $('.form-range-tabs > .tab-item');
const cTotalCost             = $("#c-total-cost-val > em").text();
const reqPay                 = $("#c-req-pay-val > em").text();
const cFirstPay              = $("#c-first-pay-val > em");
const cMonthlyPay            = $("#c-monthly-val > em");
const cModalLink             = $("#c-modal-link");
const сModalHouse            = $("#cModal-house");
const сModalCost             = $("#cModal-price");
const cModalFirstPay         = $("#cModal-firstPay");
const cModalMonthlyPay       = $("#cModal-monthlyPay");
const cModalLabelHouse       = $("em#cModalLabel-house");
const cModalLabelCost        = $("#cModalLabel-cost");
const cModalLabelFirstPay    = $("#cModalLabel-firstPay");
const cModalLabelMonthlyPay  = $("#cModalLabel-monthlyPay");
const currentDate = new Date(2020, 6, 1);
const endDate = new Date(2022, 11, 31);
const monthsLeft = (endDate.getFullYear() - currentDate.getFullYear()) * 12 + endDate.getMonth() - currentDate.getMonth() + 1;
const quartersLeft = Math.floor(monthsLeft / 3);
const quartersArr = [];
const monthsArr = [];

for(let i = 1; i <= quartersLeft; i++) {
  quartersArr.push(i);
}
for(let i = 1; i <= monthsLeft; i++) {
  monthsArr.push(i);
}

// Set values to range slider
firstPay.ionRangeSlider({
  skin: 'round',
  values: [30,40,50,60,70,80,90],
  step: 10,
  hide_min_max: true,
  grid: true,
});
termPay.ionRangeSlider({
  skin: 'round',
  values: monthsArr,
  hide_min_max: true,
  grid: true,
  // grid_num: 12,
});

termTabs.on('click', function() {
  const termType = $(this).data('term-type');
  const termPaySlider = termPay.data('ionRangeSlider');

  termTabs.removeClass('tab-item--selected');
  $(this).addClass('tab-item--selected');
  if( termType === 'months' ) {
    termPaySlider.update({
      values: monthsArr,
    });
  } else {
    termPaySlider.update({
      values: quartersArr,
    });
  }
});

// Select house type
houseType.on('click', function() {
  houseType.removeClass('house--selected');
  $(this).addClass('house--selected');

  const houseData = $(this).data();
  houseCost = houseData.housePrice;
  $("#c-total-cost-val > em").text(houseData.housePrice);
  calculateFirstPay(houseCost, firstPay.val());
  calculateMonthlyPay(houseCost, termPay.val());
  сModalHouse.val(houseData.houseType);
  сModalCost.val(houseData.housePrice);
  сModalLabelHouse.text(houseData.houseType);
  $сModalLabelCost.text(houseData.housePrice);
});

// Calculate values when load page
$("#c-total-cost-val > em").text(houseCost);
cFirstPay.text(Math.round( parseInt(houseCost * firstPay.val() / 100 - reqPay) ));
cMonthlyPay.text(Math.round( parseInt(houseCost - cFirstPay.text() - reqPay) / termPay.val() ));
cModalFirstPay.val(Math.round( parseInt(houseCost * firstPay.val() / 100 - reqPay) ));
cModalMonthlyPay.val(Math.round( parseInt(houseCost - cFirstPay.text() - reqPay) / termPay.val() ));
cModalLabelFirstPay.text(Math.round( parseInt(houseCost * firstPay.val() / 100 - reqPay) ));
cModalLabelMonthlyPay.text(Math.round( parseInt(houseCost - cFirstPay.text() - reqPay) / termPay.val() ));

// Calculate function
function calculateFirstPay(price, value) {
  // Перший внесок
  cFirstPay.text(Math.round(parseInt(price * value / 100 - reqPay)));
  cModalFirstPay.val(Math.round( parseInt(houseCost * firstPay.val() / 100 - reqPay) ));
  cModalLabelFirstPay.text(Math.round( parseInt(houseCost * firstPay.val() / 100 - reqPay) ));
  // Щомісячний платіж
  cMonthlyPay.text(Math.round(parseInt(price - cFirstPay.text() - reqPay) / termPay.val()));
  cModalMonthlyPay.val(Math.round( parseInt(houseCost - cFirstPay.text() - reqPay) / termPay.val() ));
  cModalLabelMonthlyPay.text(Math.round( parseInt(houseCost - cFirstPay.text() - reqPay) / termPay.val() ));
}
function calculateMonthlyPay(price, value) {
  // Щомісячний платіж
  cMonthlyPay.text(Math.round( parseInt(price - cFirstPay.text() - reqPay) / value ));
  cModalMonthlyPay.val(Math.round( parseInt(houseCost - cFirstPay.text() - reqPay) / termPay.val() ));
  cModalLabelMonthlyPay.text(Math.round( parseInt(houseCost - cFirstPay.text() - reqPay) / termPay.val() ));
}

// Write the value when changing range input
firstPay.on("input change", function() {
  calculateFirstPay(houseCost, $(this).val());
});
termPay.on("input change", function() {
  calculateMonthlyPay(houseCost, $(this).val());
});

// Show "Залишити заявку" when input first time changed
calcForm.one('input change', function() {
  // cModalLink.addClass('show');
});