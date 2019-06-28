const { ipcRenderer } = require('electron')

document.querySelector('.js-mobile_startMovement').addEventListener('click', event => {
    ipcRenderer.send('mobile_startMotor', {
        stops: stopsSlider.noUiSlider.get(),
        duration: durationSlider.noUiSlider.get(),
    })

    ipcRenderer.once('mobile_startMotorResponse', (event, response) => {
        if (response === true || response == 'emergencyStop') {
            navigateToSection('mobile_movement-completed')
        } else {
            triggerFatalError()
        }
    })
})
document.querySelector('.js-emergencyStop').addEventListener('click', event => {
    ipcRenderer.send('mobile_emergencyStop', true)
})
