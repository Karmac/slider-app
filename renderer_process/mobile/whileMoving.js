const { ipcRenderer } = require('electron')

document.querySelector('.js-mobile_startMovement').addEventListener('click', event => {
    ipcRenderer.send('mobile_startMotor', {
        stops: parseInt(stopsSlider.noUiSlider.get()),
        duration: parseInt(durationSlider.noUiSlider.get()),
    })

    ipcRenderer.once('mobile_startMotorResponse', (event, response) => {
        if (response === true) {
            navigateToSection('mobile_movement-completed')
        } else if (response == 'emergencyStop') {
            navigateToSection('mobile_emergency-stop')
        } else {
            triggerFatalError()
        }
    })
})
document.querySelector('.js-emergencyStop').addEventListener('click', event => {
    ipcRenderer.send('mobile_emergencyStop', true)
})
