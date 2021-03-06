const { ipcMain } = require('electron')
const fileSystem = require('fs')
const { yellow, red } = require('chalk')
const Gpio = require('onoff').Gpio

// ¿Se debe parar en el siguiente paso?
let mustStop = false
// Nombre del archivo para guardar los pasos actuales.
const filename = 'currentSteps.txt'
// Puertos GPIO en uso.
const connectedPins = [17, 18, 27, 22]
// Cantidad de pasos necesarios para
// llegar al final de los raíles.
const totalSteps = 2000
// Tiempo entre activaciones de los devanados.
const time = 0.05
// Secuencia de activación de los devanados.
const sequence = [
    [0, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 1],
]

// Inicializar los puertos GPIO.
let pins = []
for (let pin of connectedPins) {
    pins.push(new Gpio(pin, 'out'))
}

// Similar a la función sleep() en Python.
const delay = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

// Función de ayuda para anotar los pasos actuales en un archivo.
const writeSteps = value => {
    // Devuelve una Promise, que se completa si la lectura es correcta
    // y se rechazará si hay algún error.
    return new Promise((resolve, reject) => {
        fileSystem.writeFile(filename, value, error => {
            if (error) {
                reject(error)
            } else {
                resolve()
            }
        })
    })
}

// Ejecutar una de las combinaciones de la secuencia.
// La secuencia tiene 8 campos, y cada uno de ellos 4 valores,
// uno para cada clavija.
const step = async i => {
    for (let j = 0; j < 4; j++) {
        if (sequence[i][j] === 1) {
            pins[j].writeSync(1)
        } else {
            pins[j].writeSync(0)
        }
    }
    // Hay que esperar un tiempo para que el rotor
    // gire hasta la nueva posición.
    await delay(time)
    // Apagar todos los puertos GPIO.
    for (let j = 0; j < 4; j++) {
        pins[j].writeSync(0)
    }
}

// Dar un paso adelante; es decir, ejecutar las 8 combinaciones
// que forman la secuencia completa.
const stepForward = async () => {
    for (let i = 0; i < sequence.length; i++) {
        await step(i)
    }
}

// Dar un paso hacia atrás; la secuencia se realiza a la inversa.
const stepBack = async () => {
    for (let i = sequence.length - 1; i >= 0; i--) {
        await step(i)
    }
}

const runStepper = async (stops, duration) => {
    // Cantidad de pasos entre cada parada.
    let stepsPerStop = Math.floor(totalSteps / stops)
    // ¿Cuántos pasos vamos?
    let stepCounter = 1

    for (let i = 0; i < stops; i++) {
        for (let j = 0; j < stepsPerStop; j++) {
            await stepForward()
            // ¡Ojo! Primero se ejecuta writeSteps(), y luego
            // se suma 1 a stepCounter.
            await writeSteps(stepCounter++)

            if (mustStop === true) {
                return Promise.reject('emergencyStop')
            }
        }
        if (i + 1 != stops) {
            await delay(duration)
        }
    }
}

const rewindStepper = async steps => {
    for (let i = steps; i > 0; i--) {
        await stepBack()
        await writeSteps(i - 1)

        if (mustStop === true) {
            return Promise.reject('emergencyStop')
        }
    }
}

const handleRequest = async (name, event, fn) => {
    console.log(yellow('Motor: ') + name + ' -> start')

    // Bucle try...catch. Si falla una función asíncrona saltará un
    // error, porque siempre devuelven una instancia de Promise.
    try {
        let response = await fn()
        event.sender.send(name + 'Response', true)
        console.log(yellow('Motor: ') + name + ' -> completed')
    } catch (error) {
        console.log(red('Motor ERROR:') + name + ' -> ' + error)
        event.sender.send(name + 'Response', error)
    }
}

// Recibir la señal del proceso de renderizado y
// comenzar el movimiento.
ipcMain.on('mobile_startMotor', (event, args) => {
    // Utilizar el método handleRequest para evitar la repetición de código.
    handleRequest('mobile_startMotor', event, async () => {
        await runStepper(args.stops + 1, args.duration * 1000)
    })
})

// Reinciar el motor, según el número de pasos dado.
ipcMain.on('mobile_rewindMotor', async (event, steps) => {
    handleRequest('mobile_rewindMotor', event, async () => {
        await rewindStepper(steps)
    })
})

// Detener el proceso cuando se hace click en
// el botón de parada de emergencia.
ipcMain.on('mobile_emergencyStop', (event, arg) => {
    mustStop = true
})
