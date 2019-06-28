const HIDService = reqMain('gatt/HIDService')
const BatteryService = reqMain('gatt/BatteryService')
const DeviceInformationService = reqMain('gatt/DeviceInformationService')
const GenericAccessService = reqMain('gatt/GenericAccessService')

const buildServices = function() {
	const services = [
		new HIDService(),
		new BatteryService(),
		new DeviceInformationService(),
		new GenericAccessService(),
	]
	const uuids = services.map(s => s.uuid)

	return {
		services,
		uuids,
	}
}

module.exports = buildServices
