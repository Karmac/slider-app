const { Characteristic, Descriptor} = require('bleno')

const CCConfigurationDescriptor = reqMain('gatt/CCConfigurationDescriptor')

class ReportCharacteristic extends Characteristic {
	// notificationInterval = null

	constructor() {
		super({
			uuid: '2A4D',
			properties: ['read', 'notify'],
			value: null,
			descriptors: [
				// Habilita la posibilidad de notificar cambios en el valor.
				new CCConfigurationDescriptor(),
				new Descriptor({
					uuid: '2908',
					value: Buffer.from([0x01, 0x01]), // Report ID, Report Type (Input)
				}),
			],
		})
	}
	/*
	onSubscribe(maxValueSize, updateValueCallback) {
		console.log('Report Map Characteristic Subscribe')

		const releaseBuffer = Buffer.from([
			0x00, // Modifier Key
			0x00, // Reserved
			0x00, // Key 1
			0x00, // Key 2
			0x00, // Key 3
			0x00, // Key 4
			0x00, // Key 5
			0x00, // Key 6
		])
		const clickBuffer = Buffer.from([
			0x00, // Modifier Key
			0x00, // Reserved
			0x00, // Key 1
			0x00, // Key 2
			0x00, // Key 3
			0x00, // Key 4
			0x00, // Key 5
			0x00, // Key 6
		])

		this.notificationInterval = setInterval(() => {
			console.log('Intervalo')

			updateValueCallback(clickBuffer)
			updateValueCallback(releaseBuffer)
		}.bind(this), 2000)
	}

	onUnsubscribe() {
		console.log('Report Map Characteristic Unsubscribe')

		if (this.notificationInterval) {
			clearInterval(this.notificationInterval)
			this.notificationInterval = null
		}
	}
	*/
	onReadRequest(offset, callback) {
		console.log('Report Map Characteristic Read Request')

		const buffer = Buffer.from([
			0x00, // Modifier Key
			0x00, // Reserved
			0x00, // Key 1
			0x00, // Key 2
			0x00, // Key 3
			0x00, // Key 4
			0x00, // Key 5
			0x00, // Key 6
		])

		callback(this.RESULT_SUCCESS, buffer)
	}
}

module.exports = ReportCharacteristic
