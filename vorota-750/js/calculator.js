// Output price format
const currencyFormat = {
	style: 'currency',
	currency: 'RUB',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
}

// Calculator constructor
function Calculator(form, prices, combineImagePreview = false) {
	this.combineImagePreviewBool = combineImagePreview;
	this.form = document.querySelector(form);
	this.prices = prices;
	this.imagePreview = this.form.querySelector('.calculator-preview-image');
	this.deliveryInput = this.form.querySelector('.delivery-field');
	this.marketPriceEl = this.form.querySelector('.calculator-price-market .calculator-price');
	this.currentPriceEl = this.form.querySelector('.calculator-price-current .calculator-price');
	this.bsModal = document.querySelector('#calculatorModal');
	this.orderBtn = this.form.querySelector('.calculator-order-btn');
	this.summary = {
		'area': 0,
		'total': 0,
		'delivery': 0,
	};

	// Calculate current price method
	this.calcCurrentPrice = () => {
		const width = this.form.querySelector('input[name*="shyrina-proema[]"]:checked').value;
		const height = this.form.querySelector('input[name*="vysota-proema[]"]:checked').value;
		const checkedInputsValues = [...this.form.querySelectorAll('.calculator-options-item .options:not(.options-sizes) input:checked, .calculator-setup input:checked')].map((input) => !isNaN(Number(input.value)) ? Number(input.value) : 0);

		this.summary.area = this.prices[width][height];
		this.summary.total = checkedInputsValues.reduce((acc, val) => acc + val, 0);

		const totalPrice = this.summary.area + this.summary.total + this.summary.delivery;

		this.currentPriceEl.textContent = totalPrice.toLocaleString('ru-Ru', currencyFormat);
		this.calcMarketPrice(totalPrice);
	};

	// Calculate market price method
	this.calcMarketPrice = (currentPrice) => {
		const discount = currentPrice * 0.1;

		this.marketPriceEl.textContent = (currentPrice + discount).toLocaleString('ru-Ru', currencyFormat);
	};

	// Calculate delivery cost method
	this.calcDeliveryCost = (km = 0, kmCost = 0) => {
		this.summary.delivery = km * kmCost;
		this.calcCurrentPrice();
	};

	// Add IMask for delivery input
	const deliveryMask = IMask(this.deliveryInput, {
		mask: Number,
		signed: false,
		min: this.deliveryInput.getAttribute('min') ? this.deliveryInput.getAttribute('min') : 1,
		max: this.deliveryInput.getAttribute('max') ? this.deliveryInput.getAttribute('max') : 1000,
	});

	// Calculate delivery cost
	this.deliveryInput.addEventListener('input', (event) => {
		let km = parseFloat(event.currentTarget.value);
		const kmCost = parseFloat(event.currentTarget.dataset.kmCost);

		if (isNaN(km)) {
			km = 0;
		}

		this.calcDeliveryCost(km, kmCost);
	});

	// Combine image preview method
	this.combineImagePreview = () => {
		if (!this.combineImagePreviewBool) return;

		const imagePath = [];
		const imageCategory = this.form.querySelector('input[data-image-category]:checked').dataset.imageCategory;
		const gate = this.form.querySelector('input[data-gate]:checked').dataset.gate;
		const color = this.form.querySelector('input[data-color]:checked').dataset.color;

		if (imageCategory.includes('empty')) {
			imagePath.push(imageCategory, gate);
		} else {
			gate !== 'net' ? imagePath.push(imageCategory, gate, color) : imagePath.push(imageCategory, color);
		}

		this.checkImageExists(
			`${imagePath.join('/')}.png`,
			() => { this.imagePreview.setAttribute('src', `${imagePath.join('/')}.png`); },
			() => { return; }
		);
	};

	this.checkImageExists = (imageSrc, good, bad) => {
		let img = new Image();

		img.onload = good; 
		img.onerror = bad;
		img.src = imageSrc;
	};

	// Trigger methods on form's change
	this.form.addEventListener('change', () => {
		this.calcCurrentPrice();
		this.combineImagePreview();
	});

	// Disable submting form
	this.form.addEventListener('submit', (event) => {
		event.preventDefault();
	});

	// Generate form data
	this.orderBtn.addEventListener('click', (event) => {
		event.preventDefault();

		const buttonTitle = event.currentTarget.dataset.modalTitle; 
		const modalTitle = this.bsModal.querySelector('.modal-calculator .modal-title');
		const modalForm = this.bsModal.querySelector('.modal-calculator-inputs');
		const modalData = this.bsModal.querySelector('.modal-calculator-data');
		const calcData = this.form.querySelectorAll('.calculator-options-item .options input:checked, .calculator-setup input:checked');

		modalTitle.textContent = buttonTitle;
		modalForm.innerHTML = '';
		modalData.innerHTML = '';

		calcData.forEach((item, index) => {
			const parentNode = item.closest('.calculator-options-item') || item.closest('.calculator-setup');
			const title = parentNode.querySelector('.calculator-heading .title').textContent.trim();
			const value = item.nextElementSibling.textContent.trim();

			modalForm.insertAdjacentHTML('beforeend', `<input type="hidden" name="calc-modal-input-${index}" value="${title}: ${value}">`);
			modalData.insertAdjacentHTML('beforeend', `<li><b>${title}:</b> ${value}</li>`);
		});

		if (this.deliveryInput.value !== '') {
			modalForm.insertAdjacentHTML('beforeend', `<input type="hidden" name="calc-modal-delivery" type value="Доставка: ${this.deliveryInput.value} км от МКАД">`);
			modalData.insertAdjacentHTML('beforeend', `<li><b>Доставка:</b> ${this.deliveryInput.value} км от МКАД (${this.deliveryInput.dataset.kmCost} руб./км)</li>`);
		}
	});

	// Init methods
	this.calcCurrentPrice();
}

// Pricelists
const otkatnyePrices = {
	'3000': {
		'1800': 33500,
		'2000': 33500,
		'2200': 36500,
		'2400': 39500,
		'2600': 40500,
		'2800': 41500,
		'3000': 42500,
	},
	'3250': {
		'1800': 36500,
		'2000': 36500,
		'2200': 39500,
		'2400': 42500,
		'2600': 43500,
		'2800': 44500,
		'3000': 45500,
	},
	'3500': {
		'1800': 36500,
		'2000': 36500,
		'2200': 39500,
		'2400': 42500,
		'2600': 43500,
		'2800': 44500,
		'3000': 45500,
	},
	'3750': {
		'1800': 36500,
		'2000': 36500,
		'2200': 39500,
		'2400': 42500,
		'2600': 43500,
		'2800': 44500,
		'3000': 45500,
	},
	'4000': {
		'1800': 36500,
		'2000': 36500,
		'2200': 39500,
		'2400': 42500,
		'2600': 43500,
		'2800': 44500,
		'3000': 45500,
	},
	'4250': {
		'1800': 36500,
		'2000': 36500,
		'2200': 39500,
		'2400': 42500,
		'2600': 43500,
		'2800': 44500,
		'3000': 45500,
	},
	'4500': {
		'1800': 39500,
		'2000': 39500,
		'2200': 42500,
		'2400': 45500,
		'2600': 46500,
		'2800': 47500,
		'3000': 48500,
	},
	'4750': {
		'1800': 39500,
		'2000': 39500,
		'2200': 42500,
		'2400': 45500,
		'2600': 46500,
		'2800': 47500,
		'3000': 48500,
	},
	'5000': {
		'1800': 39500,
		'2000': 39500,
		'2200': 42500,
		'2400': 45500,
		'2600': 46500,
		'2800': 47500,
		'3000': 48500,
	},
}
const raspashnyePrices = {
	'3000': {
		'1800': 23460,
		'1900': 23460,
		'2000': 23460,
		'2100': 23460,
		'2200': 23460,
		'2300': 23460,
		'2400': 23510,
		'2500': 23340,
		'2600': 24280,
		'2700': 25210,
		'2800': 26140,
		'2900': 27080,
		'3000': 28010,
	},
	'3200': {
		'1800': 23460,
		'1900': 23460,
		'2000': 23460,
		'2100': 23460,
		'2200': 23510,
		'2300': 23510,
		'2400': 23900,
		'2500': 24900,
		'2600': 25890,
		'2700': 26890,
		'2800': 27890,
		'2900': 27770,
		'3000': 28730,
	},
	'3400': {
		'1800': 23460,
		'1900': 23460,
		'2000': 23460,
		'2100': 23520,
		'2200': 23580,
		'2300': 24340,
		'2400': 25400,
		'2500': 26460,
		'2600': 27510,
		'2700': 27470,
		'2800': 28490,
		'2900': 29500,
		'3000': 30530,
	},
	'3600': {
		'1800': 23460,
		'1900': 23460,
		'2000': 23510,
		'2100': 23530,
		'2200': 24650,
		'2300': 25770,
		'2400': 26890,
		'2500': 28010,
		'2600': 28010,
		'2700': 29090,
		'2800': 30170,
		'2900': 31240,
		'3000': 32320,
	},
	'3800': {
		'1800': 23460,
		'1900': 23470,
		'2000': 23650,
		'2100': 24830,
		'2200': 26020,
		'2300': 27200,
		'2400': 27290,
		'2500': 28430,
		'2600': 29560,
		'2700': 30700,
		'2800': 31840,
		'2900': 32980,
		'3000': 34110,
	},
	'4000': {
		'1800': 23510,
		'1900': 23650,
		'2000': 24900,
		'2100': 26410,
		'2200': 27390,
		'2300': 27530,
		'2400': 28730,
		'2500': 29930,
		'2600': 31120,
		'2700': 32320,
		'2800': 33520,
		'2900': 34710,
		'3000': 35910,
	},
	'4200': {
		'1800': 23530,
		'1900': 24840,
		'2000': 26140,
		'2100': 27450,
		'2200': 27650,
		'2300': 28910,
		'2400': 30170,
		'2500': 31420,
		'2600': 32680,
		'2700': 33940,
		'2800': 35190,
		'2900': 32080,
		'3000': 33180,
	},
	'4400': {
		'1800': 24650,
		'1900': 26020,
		'2000': 27390,
		'2100': 27650,
		'2200': 28970,
		'2300': 30290,
		'2400': 31600,
		'2500': 32920,
		'2600': 34230,
		'2700': 35550,
		'2800': 32440,
		'2900': 33600,
		'3000': 34760,
	},
	'4600': {
		'1800': 25770,
		'1900': 27200,
		'2000': 27530,
		'2100': 28910,
		'2200': 30290,
		'2300': 31660,
		'2400': 33040,
		'2500': 34420,
		'2600': 35790,
		'2700': 32710,
		'2800': 33920,
		'2900': 35130,
		'3000': 36340,
	},
	'4800': {
		'1800': 26890,
		'1900': 27300,
		'2000': 28730,
		'2100': 30165,
		'2200': 31600,
		'2300': 33040,
		'2400': 34480,
		'2500': 35910,
		'2600': 36870,
		'2700': 34130,
		'2800': 35390,
		'2900': 36660,
		'3000': 37920,
	},
	'5000': {
		'1800': 28010,
		'1900': 28430,
		'2000': 29930,
		'2100': 31420,
		'2200': 32920,
		'2300': 34420,
		'2400': 35910,
		'2500': 36920,
		'2600': 37230,
		'2700': 35550,
		'2800': 36870,
		'2900': 38190,
		'3000': 39510,
	},
}

// Create Calculator instances
const otkatnyeCalc = new Calculator('#calculator-otkatnye', otkatnyePrices, true);
const raspashnyeCalc = new Calculator('#calculator-raspashnye', raspashnyePrices);
