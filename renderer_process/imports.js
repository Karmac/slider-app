const config = {
	template: '.js-sectionTemplate',
	container: '.js-wrapper',
	default: 'home',
}

const importSectionsToDOM = function() {
	// Seleccionar todas las páginas por cargar.
	const links = document.querySelectorAll('link[rel="import"]')

	Array.prototype.forEach.call(links, (link) => {
		// Obtener el contenido de <template>.
		let template = link.import.querySelector(config.template)
		// Clonarlo, junto con sus elementos descendientes.
		let clone = document.importNode(template.content, true)
		// Añadirlo al final de la página principal.
		document.querySelector(config.container).appendChild(clone)
	})
}

const setMenuOnClickEvent = function() {
	for (let element of document.querySelectorAll('[data-section]')) {
		element.addEventListener('click', (event) => {
			navigateToSection(event.currentTarget.dataset.section)
		})
	}
}

const hideAllSections = function() {
	// Seleccionar todas las secciones.
	const sections = document.querySelectorAll(config.container + ' section')
	Array.prototype.forEach.call(sections, (section) => {
		DOMHelpers.hide(section)
	})
}

const showSection = function(sectionID) {
	DOMHelpers.show(document.getElementById(sectionID))
}

const navigateToSection = function(sectionID) {
	hideAllSections()
	showSection(sectionID)
}

// Añadir al documento todas las secciones.
importSectionsToDOM()
// Ocultar todas las secciones.
hideAllSections()
// Click sobre un elemento con data-section=""
setMenuOnClickEvent()
