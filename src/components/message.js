import {createDom} from '../utils/util'

const noneFn = () => {
}


class Message {
	constructor(rootDom, options = {}) {
		this.rootDom = rootDom
		this.options = options
		this.createTarget()
	}

	createTarget() {
		const target = createDom({
			className: 'a-box-message-container'
		})
		this.target = target
		const {content} = this.options
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
		this.target.innerHTML = html
	}
}

export default {
	install(aBox) {
		const messageList = createDom({
			className: 'a-box-message-list',
			style: {
				display: 'none'
			}
		})
		messageList.close = () => {
			console.dir(messageList)
		}
		aBox.rootDom.appendChild(messageList)

		aBox.message = function ({content = '', timer = 2000, type = '', close = noneFn} = {}) {
			const example = new Message(messageList, {
				content
			})
			example.target.addClass('a-box-message-item ' + type)

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