const { app, BrowserWindow } = require('electron')
const path = require('path')
const glob = require('glob')

let mainWindow = null

// Funciones de ayuda para incluir archivos.
global.base_dir = __dirname
global.reqMain = function(filename) {
	return require(base_dir + '/main_process/' + filename + '.js')
}
global.reqRenderer = function(filename) {
	return require(base_dir + '/renderer_process/' + filename + '.js')
}

app.once('ready', () => {

	resizable: false
	mainWindow = new BrowserWindow({
		title: app.getName(),
		webPreferences: {
			nodeIntegration: true,
		},
		show: false,
		width: 700,
		height: 400,
	})

	mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

	// mainWindow.webContents.openDevTools()

	mainWindow.once('ready-to-show', () => {
		mainWindow.setMenuBarVisibility(false)
		mainWindow.maximize()
		mainWindow.show()
	})

	// Cargar automáticamente de main_process/autoload/
	const files = glob.sync(path.join(__dirname, 'main_process/autoload/*.js'))
	files.forEach((file) => {
		require(file)
	})

})
