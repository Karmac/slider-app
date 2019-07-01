const hide = element => {
    const cls = element.classList
    if (!cls.contains('hide')) {
        cls.add('hide')
    }
}

const show = element => {
    const cls = element.classList
    if (cls.contains('hide')) {
        cls.remove('hide')
    }
}

const toggleButton = element => {
    const cls = element.classList
    if (!cls.contains('disabled')) {
        cls.add('disabled')
    } else {
        cls.remove('disabled')
    }
}

const togglePreloader = element => {
    const cls = element.classList
    if (!cls.contains('active')) {
        cls.add('active')
    } else {
        cls.remove('active')
    }
}

module.exports = {
    hide,
    show,
    toggleButton,
    togglePreloader
}
