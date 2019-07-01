const { app, BrowserWindow } = require('electron')
const path = require('path')
const glob = require('glob')

let mainWindow = null

// Funciones de ayuda para incluir archivos.
global.APP_PATH = __dirname
global.reqMain = filename => {
	return require(APP_PATH + '/main_process/' + filename + '.js')
}

app.once('ready', () => {

	mainWindow = new BrowserWindow({
		title: app.getName(),
		webPreferences: {
			preload: path.join(APP_PATH, 'preload.js'),
			nodeIntegration: true,
		},
		show: false,
		width: 700,
		height: 400,
	})

	mainWindow.loadURL(path.join('file://', APP_PATH, 'index.html'))

	// mainWindow.webContents.openDevTools()

	mainWindow.once('ready-to-show', () => {
		// Ocultar el menú de herramientas.
		mainWindow.setMenuBarVisibility(false)
		// Ampliar y mostrar la ventana.
		mainWindow.maximize()
		// Evitar que se modifique el tamaño de la ventana.
		// mainWindow.setResizable(false)
		// Mostrar la ventana.
		mainWindow.show()
	})

	// Cargar automáticamente todos los archivos en ./main_process/autoload/
	const files = glob.sync(path.join(APP_PATH, 'main_process/autoload/*.js'))
	files.forEach(file => require(file))

})
