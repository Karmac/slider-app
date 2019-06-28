const { ipcRenderer } = require('electron')

const timeoutInterval = 60000

const elements = {
	button: document.querySelector('.js-mobile_startAdvertising'),
	preloader: document.querySelector('.js-mobile_preloaderWrapper'),
	notice: {
		timeUp: document.querySelector('.js-mobile_advertisingTimeUp'),
		bluetoothError: document.querySelector('.js-mobile_bluetoothError'),
	},
}

const disableInterface = function() {
	// Desabilitar botón y mostrar el icono de carga.
	DOMHelpers.toggleButton(elements.button)
	elements.button.childNodes[0].innerHTML = 'bluetooth_searching'
	DOMHelpers.togglePreloader(elements.preloader)

	hideAllNotifications()
}
const enableInterface = function() {
	// Habilitar el botón y ocultar el icono de carga.
	DOMHelpers.toggleButton(elements.button)
	elements.button.childNodes[0].innerHTML = 'bluetooth'
	DOMHelpers.togglePreloader(elements.preloader)
}
const hideAllNotifications = function() {
	for (let key in elements.notice) {
		DOMHelpers.hide(elements.notice[key])
	}
}

let timeoutCounter = null

elements.button.addEventListener('click', (event) => {
	// Se envía una orden al proceso principal para que comience a
	// publicitar el dispositivo.
	// Si el proceso principal nos devuelve false mostramos un mensaje.
	if (ipcRenderer.sendSync('mobile_startAdvertising', true) === true) {
		disableInterface()

		timeoutCounter = setTimeout(function() {
			ipcRenderer.send('mobile_stopAdvertising', true)
			DOMHelpers.show(elements.notice.timeUp)
		}, timeoutInterval)
	}
	else {
		hideAllNotifications()
		DOMHelpers.show(elements.notice.bluetoothError)
	}
})

ipcRenderer.on('mobile_unexpectedStateChange', (event, arg) => {
	clearTimeout(timeoutCounter)
	enableInterface()
	DOMHelpers.show(elements.notice.bluetoothError)
	navigateToSection('mobile_advertising')
})

ipcRenderer.on('mobile_connectionAccepted', (event, arg) => {
	clearTimeout(timeoutCounter)
	navigateToSection('mobile_confirmation')
})

ipcRenderer.on('mobile_enableInterface', (event, arg) => {
	if (arg === true) {
		enableInterface()
	}
})
