export class Select {
	constructor(selector, options) {
		this.$el = document.querySelector(selector)
	}
	open() {
		this.$el.classList.add('open')

	}

	close() { }
}