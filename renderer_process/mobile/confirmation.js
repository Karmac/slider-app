const { ipcRenderer } = require('electron')

const elements = {
	span: document.querySelector('.js-mobile_clientAddress'),
	buttonFalse: document.querySelector('.js-mobile_confirmationFalse'),
	// buttonTrue: document.querySelector('.js-mobile_confirmationTrue')
}

ipcRenderer.on('mobile_connectionAccepted', (event, clientAddress) => {
	elements.span.innerHTML = clientAddress
})

// Si se ha conectado un dispositivo incorrecto.
elements.buttonFalse.addEventListener('click', (event) => {
	ipcRenderer.send('mobile_wrongConnectedDevice', true)
	ipcRenderer.send('mobile_stopAdvertising', true)
})
