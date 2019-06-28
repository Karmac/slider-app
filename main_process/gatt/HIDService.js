const { PrimaryService } = require('bleno')

const ReportMapCharacteristic = reqMain('gatt/ReportMapCharacteristic')
const BootKeyboardInputReportCharacteristic = reqMain('gatt/BootKeyboardInputReportCharacteristic')
const ReportCharacteristic = reqMain('gatt/ReportCharacteristic')
const HIDInformationCharacteristic = reqMain('gatt/HIDInformationCharacteristic')
const HIDControlPointCharacteristic = reqMain('gatt/HIDControlPointCharacteristic')
const ProtocolModeCharacteristic = reqMain('gatt/ProtocolModeCharacteristic')

class HIDService extends PrimaryService {
	constructor() {
		super({
			uuid: '1812',
			characteristics: [
				new ReportMapCharacteristic(),
				new BootKeyboardInputReportCharacteristic(),
				new ReportCharacteristic(),
				new HIDInformationCharacteristic(),
				new HIDControlPointCharacteristic(),
				new ProtocolModeCharacteristic(),
			],
		})
	}
}

module.exports = HIDService
