const { ipcRenderer } = require('electron')
const { getCurrentWindow, app } = require('electron').remote

// Función para llamar al error fatal desde el proceso de renderizado.
// Se exporta; hay que llamarla usando { triggerFatalError } = require(archivo).
const triggerFatalError = () => {
	navigateToSection('fatal-error')
}

// Si se emite la orden desde el proceso principal.
ipcRenderer.on('triggerFatalError', (event, arg) => {
	triggerFatalError()
})

// Manejar todos los botones de cierre de la aplicación, para no repetir código.
document.addEventListener('DOMContentLoaded', event => {
	const closeButtons = document.querySelectorAll('.js-closeApp')
	const relauchButtons = document.querySelectorAll('.js-relauchApp')

	closeButtons.forEach(button => {
		button.addEventListener('click', event => {
			getCurrentWindow().close()
		})
	})

	relauchButtons.forEach(button => {
		button.addEventListener('click', event => {
			app.relaunch()
			app.quit()
		})
	})

})

module.exports = { triggerFatalError }
