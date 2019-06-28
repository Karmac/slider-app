const { Characteristic, Descriptor } = require('bleno')

class BatteryLevelCharacteristic extends Characteristic {
	constructor() {
		super({
			uuid: '2A19',
			properties: ['read'],
			descriptors: [
				new Descriptor({
					uuid: '2901',
					value: 'Battery level between 0 and 100 percent',
				}),
				new Descriptor({
					uuid: '2904',
					value: Buffer.from([0x04, 0x01, 0x27, 0xAD, 0x01, 0x00, 0x00]),
				})
			],
		})
	}

	onReadRequest(offset, callback) {
		console.log('BatteryLevelCharacteristic onReadRequest')
		callback(this.RESULT_SUCCESS, Buffer.from([100]))
	}
}

module.exports = BatteryLevelCharacteristic
