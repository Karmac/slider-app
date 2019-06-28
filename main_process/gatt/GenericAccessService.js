const { PrimaryService } = require('bleno')

const AppearanceCharacteristic = reqMain('gatt/AppearanceCharacteristic')
const DeviceNameCharacteristic = reqMain('gatt/DeviceNameCharacteristic')

class GenericAccessService extends PrimaryService {
	constructor() {
		super({
			uuid: '1800',
			characteristics: [
				new AppearanceCharacteristic(),
				new DeviceNameCharacteristic(),
			],
		})
	}
}

module.exports = GenericAccessService
