const { ipcRenderer } = require('electron')
const helpers = reqRenderer('DOMHelpers')

// Cuenta atrás para desactivar la publicitación.
const timeoutInterval = 30000
let timeoutCounter = null

const elements = {
	button: document.querySelector('.js-mobile_startAdvertising'),
	preloader: document.querySelector('.js-mobile_preloaderWrapper'),
	notice: {
		timeUp: document.querySelector('.js-mobile_advertisingTimeUp'),
		bluetoothError: document.querySelector('.js-mobile_bluetoothError'),
	},
}

const disableInterface = () => {
	// Desabilitar botón, cambiar su icono y mostrar el icono de carga.
	helpers.toggleButton(elements.button)
	elements.button.childNodes[0].innerHTML = 'bluetooth_searching'
	helpers.togglePreloader(elements.preloader)

	hideAllNotifications()
}

const enableInterface = () => {
	// Habilitar el botón, cambiar su icono y ocultar el icono de carga.
	helpers.toggleButton(elements.button)
	elements.button.childNodes[0].innerHTML = 'bluetooth'
	helpers.togglePreloader(elements.preloader)
}

const hideAllNotifications = () => {
	for (let key in elements.notice) {
		helpers.hide(elements.notice[key])
	}
}

elements.button.addEventListener('click', () => {
	// Se envía una orden al proceso principal para que comience a
	// publicitar el dispositivo.
	// Si el proceso principal nos devuelve false mostramos un mensaje.
	if (ipcRenderer.sendSync('mobile_startAdvertising') === true) {
		disableInterface()

		// Cuenta atrás para apagar el Bluetooth.
		timeoutCounter = setTimeout(() => {
			// Argumento: enableInterface? true
			ipcRenderer.send('mobile_stopAdvertising', true)
			helpers.show(elements.notice.timeUp)
		}, timeoutInterval)
	} else {
		hideAllNotifications()
		helpers.show(elements.notice.bluetoothError)
	}
})

ipcRenderer.on('mobile_unexpectedStateChange', () => {
	clearTimeout(timeoutCounter)
	enableInterface()
	helpers.show(elements.notice.bluetoothError)
	// navigateToSection('mobile_advertising')
})

ipcRenderer.on('mobile_connectionAccepted', () => {
	clearTimeout(timeoutCounter)
	navigateToSection('mobile_confirmation')
})

ipcRenderer.on('mobile_enableInterface', (event, arg) => {
	if (arg === true) {
		enableInterface()
	}
})
