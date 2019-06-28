/*const { ipcMain } = require('electron')
const sudo = require('sudo-prompt')

ipcMain.on('mobile_startMotor', (event, arg) => {

	const options = {
		name: 'Run Motor',
	}

	sudo.exec('node ' + global.base_dir + '/main_process/motor/runMotor.js', options, (error, stdout, stderr) => {
		if (error) {
			throw error
		}
		console.log('stdout: ' + stdout)
	})

})*/
/*
const { ipcMain } = require('electron')
const RasPI = require('raspi-io').RaspiIO
const five = require('johnny-five')

const board = new five.Board({
	io: new RasPI()
})

board.on('ready', () => {

	let servoMotor = new five.Servo("P1-11")

	ipcMain.on('mobile_startMotor', (event, arg) => {
		servoMotor.sweep()
	})

})
*/
