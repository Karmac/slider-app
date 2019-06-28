const { Characteristic } = require('bleno')

class ProtocolModeCharacteristic extends Characteristic {
	constructor() {
		super({
			uuid: '2A4E',
			properties: ['read'],
			value: Buffer.from([0x01]), // Report Protocol Mode
		})
	}
}

module.exports = ProtocolModeCharacteristic
