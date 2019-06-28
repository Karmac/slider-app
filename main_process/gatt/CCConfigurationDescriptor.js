const { Descriptor } = require('bleno')

class CCConfigurationDescriptor extends Descriptor {
	constructor() {
		super({
			uuid: '2902',
			value: Buffer.from([0x00, 0x01]), // Notifications enabled
		})
	}
}

module.exports = CCConfigurationDescriptor
