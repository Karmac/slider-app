const { PrimaryService } = require('bleno')

const BatteryLevelCharacteristic = reqMain('gatt/BatteryLevelCharacteristic')

class BatteryService extends PrimaryService {
	constructor() {
		super({
			uuid: '180F',
			characteristics: [
				new BatteryLevelCharacteristic(),
			],
		})
	}
}

module.exports = BatteryService
