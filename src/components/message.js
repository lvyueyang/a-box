import {createDom} from '../utils/util'

const noneFn = () => {
}

export class Message {
	constructor(rootDom, options = {}) {
		this.rootDom = rootDom
		this.options = options
		this.createTarget()
	}

	createTarget() {
		const target = createDom({
			className: `a-box-container`
		})
		const wrap = createDom({
			className: `a-box-wrap`
		})
		const icon = createDom({
			className: `a-box-icon`
		})
		const body = createDom({
			className: `a-box-body`
		})
		const close = createDom({
			className: `a-box-close`
		})

		wrap.appendChild(icon)
		wrap.appendChild(body)
		wrap.appendChild(close)
		target.appendChild(wrap)
		this.wrap = wrap
		this.body = body
		this.icon = icon
		this.close = close
		this.target = target
		const {content, type} = this.options
		this.setType(type)
		this.setBody(content)
	}

	show() {
		this.rootDom.appendChild(this.target)
		this.target.show()
	}

	hide() {
		this.rootDom.removeChild(this.target)
		this.target.hide()
	}

	setBody(html = '') {
		this.body.innerHTML = html
	}

	setType(name) {
		this.target.addClass(`a-box-item ` + name)
	}
}

export default {
	install(aBox) {
		const messageList = createDom({
			className: `a-box-message-list`,
			style: {
				display: 'none'
			}
		})
		messageList.close = () => {
			console.dir(messageList)
		}
		aBox.rootDom.appendChild(messageList)

		aBox.message = function ({content = '', timer = 2000, type = 'info', close = noneFn} = {}) {
			const example = new Message(messageList, {
				content,
				type
			})

			function hide() {
				example.target.addClass('hide')
				setTimeout(() => {
					example.hide()
					messageList.close()
				}, 300)
			}

			setTimeout(() => {
				hide()
			}, timer)

			messageList.appendChild(example.target)
			messageList.show()
			example.show()
			return {
				example,
				hide
			}
		}
	}
}