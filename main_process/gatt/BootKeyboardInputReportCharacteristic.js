const { Characteristic } = require('bleno')

const CCConfigurationDescriptor = reqMain('gatt/CCConfigurationDescriptor')

class BootKeyboardInputReportCharacteristic extends Characteristic {
	constructor() {
		super({
			uuid: '2A22',
			properties: ['notify'], //  ['read', 'write', 'notify'],
			descriptors: [
				new CCConfigurationDescriptor(),
			],
		})
	}

	onReadRequest(offset, callback) {
		callback(this.RESULT_SUCCESS, Buffer.from([]))
	}
}

module.exports = BootKeyboardInputReportCharacteristic
