import {createDom} from '../utils/util'

const htmlStr = `
<div class="a-box-header"></div>
<div class="a-box-body"></div>
<div class="a-box-footer"></div>
`

export default class Modal {
	constructor(aBox, options = {}) {
		this.aBox = aBox
		this.options = options
		this.createTarget()
	}

	createTarget() {
		const target = createDom({
			className: 'a-box-modal-container',
			style: {
				display: 'none'
			}
		})
		target.innerHTML = htmlStr
		this.target = target
		this.header = target.querySelector('.a-box-header')
		this.body = target.querySelector('.a-box-body')
		this.footer = target.querySelector('.a-box-footer')

		const {title, content} = this.options
		this.setTitle(title)
		this.setBody(content)
	}

	createBtn(name, htmlStr) {
		const btn = createDom({
			className: `a-box-btn ${name}`,
			tagName: 'button'
		})
		btn.innerHTML = htmlStr
		this.footer.appendChild(btn)
		return btn
	}

	show() {
		this.aBox.rootDom.appendChild(this.target)
		this.target.show()
	}

	hide() {
		this.aBox.rootDom.removeChild(this.target)
		this.target.hide()
	}

	setTitle(htmlStr) {
		if (htmlStr) {
			this.header.innerHTML = htmlStr
		} else {
			this.target.removeChild(this.header)
		}
	}

	setBody(html = '') {
		if (typeof html === 'string') {
			this.body.innerHTML = html
		}
		if (typeof html === 'object') {
			this.body.appendChild(html)
		}
	}
}
