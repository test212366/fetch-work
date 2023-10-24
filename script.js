const getTemplate = (data = [], text = 'some-thing text default') => {
	console.log(data);

	const items = data.map(item => {
		return `
		<li data-type="item" data-id="${item.id}">${item.value}</li>
		
		`
	})

	return `
			<div class="select__input" data-type="input">
					<span data-type="value">${text}</span>
				</div>
				<div class="select__dropdown">
					<ul class="select__dropdown-ul">
					 	${items.join('')}
					</ul>
				</div>
	
	`
}

class Select {
	constructor(selector, options) {
		this.options = options
		this.selectedId = null
		this.$el = document.querySelector(selector)
		this.#render()
		this.#setup()

	}

	#render() {
		const { label, data } = this.options
		this.$el.innerHTML = getTemplate(data, label)
	}
	#setup() {
		this.clickHandler = this.clickHandler.bind(this)
		this.$el.addEventListener('click', this.clickHandler)
		this.$value = this.$el.querySelector('[data-type="value"]')
	}
	clickHandler(event) {
		const { type } = event.target.dataset
		if (type === 'input') {
			this.toggle()
		} else if (type === 'item') {
			const id = event.target.dataset.id
			console.log(id);
		}
	}
	get isOpen() {
		return this.$el.classList.contains('open')
	}

	toggle() {
		this.isOpen ? this.close() : this.open()
	}

	open() {
		this.$el.classList.add('open')

	}
	get current() {
		return this.options.data.find(item => item.id === this.selectedId)
	}
	select(id) {
		this.selectedId = id
		this.$value.textContent = this.current.value
		this.close()
	}
	close() {
		this.$el.classList.remove('open')
	}
	destroy() {

	}
}

const select = new Select('#select', {
	label: 'instance label',
	data: [
		{ id: '1', value: 'react' },
		{ id: '2', value: 'angular' },
		{ id: '3', value: 'vue' },
		{ id: '4', value: 'react native' },
		{ id: '5', value: 'next' },
		{ id: '6', value: 'nest' },

	]
})