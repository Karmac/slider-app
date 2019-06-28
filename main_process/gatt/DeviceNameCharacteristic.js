const { Characteristic } = require('bleno')

class DeviceNameCharacteristic extends Characteristic {
	constructor() {
		super({
			uuid: '2A00',
			properties: ['read'],
			value: Buffer.from('Slider'),
		})
	}
}

module.exports = DeviceNameCharacteristic
