const { PrimaryService, Characteristic } = require('bleno')

class DeviceInformationService extends PrimaryService {
	constructor() {
		super({
			uuid: '180A',
			characteristics: [
				new Characteristic({
					uuid: '2A29',
					properties: ['read'],
					value: 'Álvaro del Hoyo & Thomas Delbois',
				}),
			],
		})
	}
}

module.exports = DeviceInformationService
