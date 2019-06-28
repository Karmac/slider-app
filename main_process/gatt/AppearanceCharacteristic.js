const { Characteristic } = require('bleno')

class AppearanceCharacteristic extends Characteristic {
	constructor() {
		super({
			uuid: '2A01',
			properties: ['read'],
			value: Buffer.alloc(2).writeUInt16LE(961),
		})
	}
}

module.exports = AppearanceCharacteristic
