const { Characteristic } = require('bleno')

class HIDInformationCharacteristic extends Characteristic {
	constructor() {
		super({
			uuid: '2A4A',
			properties: ['read'],
			value: Buffer.from([0x11, 0x01, 0x00, 0x02]),
		})
	}
}

module.exports = HIDInformationCharacteristic
