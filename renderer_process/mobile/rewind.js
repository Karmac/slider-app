const {ipcRenderer } = require('electron')
const fileSystem = require('fs')

// Nombre del archivo para guardar los pasos actuales.
const filename = 'currentSteps.txt'
let currentSteps = null

fileSystem.readFile(filename, 'utf8', (error, data) => {
    if (data == 0) {
        navigateToSection('home')
    } else {
        currentSteps = data
        navigateToSection('mobile_rewind')
    }
})

document.addEventListener('DOMContentLoaded', event => {
    document.querySelector('.js-rewindStepper').addEventListener('click', event => {
        ipcRenderer.send('mobile_rewindMotor', currentSteps)

        ipcRenderer.once('mobile_rewindMotorResponse', (event, response) => {
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
