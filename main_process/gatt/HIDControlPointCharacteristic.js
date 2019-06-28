const { Characteristic } = require('bleno')

class HIDControlPointCharacteristic extends Characteristic {
	constructor() {
		super({
			uuid: '2A4C',
			properties: ['writeWithoutResponse'],
		})
	}
}

module.exports = HIDControlPointCharacteristic
