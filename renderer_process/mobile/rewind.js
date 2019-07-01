const { ipcRenderer } = require('electron')
const fileSystem = require('fs')

// Nombre del archivo para guardar los pasos actuales.
const filename = 'currentSteps.txt'
let currentSteps = null

// Leer los pasos guardados.
fileSystem.readFile(filename, 'utf8', (error, data) => {
    currentSteps = data

    if (data == 0) {
        // Si el motor está en su posición inicial.
        navigateToSection('home')
    } else {
        // Si el motor no está al comienzo de la carrera.
        navigateToSection('mobile_rewind')
    }
})

// Esperar a que el documento termine de cargar.
document.addEventListener('DOMContentLoaded', event => {
    // Enviar la señal de retroceso cuando se haga click en el botón.
    document.querySelector('.js-rewindStepper').addEventListener('click', event => {
        ipcRenderer.send('mobile_rewindMotor', currentSteps)

        // En el proceso principal hay un try...catch que envía
        // una orden aquí, para ejecutar el código que corresponda.
        ipcRenderer.once('mobile_rewindMotorResponse', (event, response) => {
            if (response === true) {
                navigateToSection('home')
            } else if (response == 'emergencyStop') {
                navigateToSection('mobile_emergency-stop')
            } else {
                triggerFatalError()
            }
        })
    })
})
