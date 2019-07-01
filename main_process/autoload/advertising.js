const { ipcMain, BrowserWindow } = require('electron')
const bleno = require('bleno')
const { green, red, magenta } = require('chalk')

// Carga de los servicios y UUIDs GATT.
const buildServices = reqMain('gatt/buildServices')
const { services, uuids } = buildServices()

// Necesitamos la instacia de la ventana  para enviar mensajes al proceso de renderizado.
let rendererWindow = BrowserWindow.getAllWindows()[0]

// Guardamos en una variable si actualmente se está emitiendo o no, para
// que solo se detenga el proceso si es necesario.
let isAdvertising = false

// Se recibe la orden para comenzar a mostrar el dispositivo.
ipcMain.on('mobile_startAdvertising', (event, arg) => {
	// Si el Bluetooth está encendido devuelve true, sino se devuelve false
	// para que el proceso de renderizado muestre un mensaje.
	if (bleno.state === 'poweredOn') {
		bleno.startAdvertising('Slider', uuids)
		event.returnValue = true
	} else {
		console.log(red('Bluetooth ERROR:') + ' state is not poweredOn, cannot start advertising')
		event.returnValue = false
	}
});

// Se recibe la orden para que se deje de mostrar el dispositivo.
ipcMain.on('mobile_stopAdvertising', (event, enableInterface) => {
	bleno.stopAdvertising()
	rendererWindow.webContents.send('mobile_enableInterface', enableInterface)
})

// Desconectar el cliente cuando sea incorrecto.
ipcMain.on('mobile_wrongConnectedDevice', () => {
	bleno.disconnect()
})

// Hay que detener el proceso cuando se desactiva el Bluetooth mientras
// aún se está publicitando el dispositivo.
bleno.on('stateChange', (state) => {
	console.log(magenta('Bluetooth:') + ' stateChange -> ' + green(state))

	if (isAdvertising === true && state !== 'poweredOn') {
		console.log(red('Bluetooth ERROR:') + ' Bluetooth state changed unexpectedly')
		bleno.stopAdvertising()
		// Notificar al proceso de renderizado el cambio repentino del estado del
		// Bluetooth, para mostrar un mensaje de alerta.
		rendererWindow.webContents.send('mobile_unexpectedStateChange', true)
	}
})

bleno.on('advertisingStart', (error) => {
	if (error) {
		console.log(red('Bluetooth ERROR: ') + error)
	} else {
		console.log(magenta('Bluetooth:') + ' advertisingStart')

		isAdvertising = true
		bleno.setServices(services, (error) => {
			if (error) {
				console.log(red('Bluetooth ERROR:') + ' cannot set services -> ' + error)
			}
		})
	}
})
bleno.on('advertisingStop', () => {
	console.log(magenta('Bluetooth:') + ' advertisingStop')
	isAdvertising = false
})

// Otros eventos.
bleno.on('accept', (clientAddress) => {
	console.log(magenta('Bluetooth:') + ' accept -> ' + green(clientAddress))
	// Enviar los datos del dispositivo conectado para poder realizar la confirmación.
	rendererWindow.webContents.send('mobile_connectionAccepted', clientAddress)
})

bleno.on('disconnect', (clientAddress) => {
	console.log(magenta('Bluetooth:') + ' disconnect -> ' + green(clientAddress))
})
