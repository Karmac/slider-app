const stopsSlider = document.querySelector('.js-mobile_movementSettingsStops')
const durationSlider = document.querySelector('.js-mobile_movementSettingsDuration')

// Deslizador para la cantidad de paradas.
noUiSlider.create(stopsSlider, {
	range: {
		'min': 1,
		'max': 5,
	},
	step: 1,
	start: [3],
	behaviour: 'tap',
	connect: [true, false],
	pips: {
		mode: 'positions',
		values: [0, 25, 50, 75, 100],
		// stepped: true,
		density: 3,
	},
	// tooltips: [wNumb({decimals: 0})],
})

// Deslizador para la duración de cada parada.
noUiSlider.create(durationSlider, {
	range: {
		'min': 3,
		'max': 8,
	},
	step: 1,
	start: [5],
	behaviour: 'tap',
	connect: [true, false],
	pips: {
		mode: 'positions',
		values: [0, 20, 40, 60, 80, 100],
		density: 3,
		format: wNumb({ suffix: ' s' }),
	},
})
