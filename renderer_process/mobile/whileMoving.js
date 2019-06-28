const { ipcRenderer } = require('electron')

document.querySelector('.js-mobile_startMovement').addEventListener('click', event => {
    if (ipcRenderer.sendSync('mobile_startMotor', {
        stops: stopsSlider.noUiSlider.get(),
        duration: durationSlider.noUiSlider.get(),
    }) === true) {
        navigateToSection('mobile_movement-completed')
    }
})

document.querySelector('.js-emergencyStop').addEventListener('click', event => {
    ipcRenderer.send('mobile_emergencyStop', true)
})
