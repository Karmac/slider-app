const { ipcRenderer } = require('electron')

const elements = {
	span: document.querySelector('.js-mobile_clientAddress'),
	buttonFalse: document.querySelector('.js-mobile_confirmationFalse'),
	// buttonTrue: document.querySelector('.js-mobile_confirmationTrue')
}

// Mostrar la dirección del dispositivo conectado.
ipcRenderer.on('mobile_connectionAccepted', (event, clientAddress) => {
	elements.span.innerHTML = clientAddress
})

// Si se ha conectado un dispositivo incorrecto.
elements.buttonFalse.addEventListener('click', () => {
	ipcRenderer.send('mobile_wrongConnectedDevice')
	ipcRenderer.send('mobile_stopAdvertising', true)
})
