const { Characteristic } = require('bleno')

class ReportMapCharacteristic extends Characteristic {
	constructor() {
		super({
			uuid: '2A4B',
			properties: ['read'],
			value: Buffer.from([
				0x05, 0x01, // Usage Page (Generic Desktop Ctrls)
				0x09, 0x06, // Usage (Keyboard)
				0xA1, 0x01, // Collection (Application)
				0x85, 0x01, //   Report ID (1)
				0x05, 0x07, //   Usage Page (Kbrd/Keypad)
				0x19, 0xE0, //   Usage Minimum (0xE0)
				0x29, 0xE7, //   Usage Maximum (0xE7)
				0x15, 0x00, //   Logical Minimum (0)
				0x25, 0x01, //   Logical Maximum (1)
				0x75, 0x01, //   Report Size (1)
				0x95, 0x08, //   Report Count (8)
				0x81, 0x02, //   Input (Data,Var,Abs,No Wrap,Linear,Preferred State,No Null Position)
				0x75, 0x08, //   Report Size (8)
				0x95, 0x01, //   Report Count (1)
				0x81, 0x03, //   Input (Const,Var,Abs,No Wrap,Linear,Preferred State,No Null Position)
				0x75, 0x08, //   Report Size (8)
				0x95, 0x06, //   Report Count (6)
				0x15, 0x00, //   Logical Minimum (0)
				0x25, 0x65, //   Logical Maximum (101)
				0x81, 0x00, //   Input (Data,Array,Abs,No Wrap,Linear,Preferred State,No Null Position)
				0xC0,       // End Collection

				// 41 bytes
			]),
		})
	}
}

module.exports = ReportMapCharacteristic
