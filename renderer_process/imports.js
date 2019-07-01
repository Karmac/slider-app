const {join} = require('path')
const { show, hide } = reqRenderer('DOMHelpers')

const config = {
    template: '.js-sectionTemplate',
    container: '.js-wrapper'
}

const importSectionsToDOM = () => {
    // Seleccionar todas las páginas por cargar.
    const links = document.querySelectorAll('link[rel="import"]')

    links.forEach(link => {
        // Obtener el contenido de <template>.
        let template = link.import.querySelector(config.template)
        // Clonarlo, junto con sus elementos descendientes.
        let clone = document.importNode(template.content, true)
        // Añadirlo al final de la página principal.
        document.querySelector(config.container).appendChild(clone)
    })
}

const setMenuOnClickEvent = () => {
    const anchors = document.querySelectorAll('[data-section]')

    // Cuando se haga click en un elemento con data-section=?,
    // se navega hasta la página que indique.
    anchors.forEach(anchor => {
        anchor.addEventListener('click', event => {
            navigateToSection(event.currentTarget.dataset.section)
        })
    })
}

const hideAllSections = () => {
    // Seleccionar todas las secciones y ocultarlas.
    const sections = document.querySelectorAll(config.container + ' section')
    sections.forEach(section => hide(section))
}

const showSection = sectionID => {
    show(document.getElementById(sectionID))
}

const navigateToSection = sectionID => {
    hideAllSections()
    showSection(sectionID)
}

// Añadir al documento todas las secciones.
importSectionsToDOM()
// Ocultar todas las secciones.
hideAllSections()
// Click sobre un elemento con data-section=""
setMenuOnClickEvent()

module.exports = { navigateToSection }
