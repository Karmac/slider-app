const DOMHelpers = {
	hide(element) {
		if (!element.classList.contains('hide')) {
			element.classList.add('hide');
		}
	},
	show(element) {
		if (element.classList.contains('hide')) {
			element.classList.remove('hide');
		}
	},
	toggleButton(element) {
		if (!element.classList.contains('disabled')) {
			element.classList.add('disabled');
		} else {
			element.classList.remove('disabled');
		}
	},
	togglePreloader(element) {
		if (!element.classList.contains('active')) {
			element.classList.add('active');
		} else {
			element.classList.remove('active');
		}
	}
}
