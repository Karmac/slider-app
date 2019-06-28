const { ipcRenderer } = require('electron')
const { getCurrentWindow } = require('electron').remote

// Función para llamar al error fatal desde el proceso de renderizado.
// Se exporta; hay que llamarla usando { triggerFatalError } = require(archivo).
const triggerFatalError = () {
	navigateToSection('fatal-error')
}

// Si se emite la orden desde el proceso principal.
ipcRenderer.on('triggerFatalError', (event, arg) => {
	triggerFatalError()
})

// Manejar todos los botones de cierre de la aplicación, para no repetir código.
const buttons = document.querySelectorAll('.js-closeApp')
buttons.forEach(button => {
	button.addEventListener('click', event => {
		getCurrentWindow().close()
	})
})

module.exports = { triggerFatalError }
