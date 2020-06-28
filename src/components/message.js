import {createDom, getIcon, isMobile} from '../utils/util'

const noneFn = () => {
}

export class Message {
	constructor(options = {}) {
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
		this.target.show()
	}

	hide() {
		this.target.hide()
	}

	setBody(html = '') {
		this.body.innerHTML = html
	}

	setType(name, color) {
		if (name) {
			this.target.addClass(name)
		}
		this.icon.innerHTML = getIcon(name, color)
	}
}

export default {
	install(aBox) {
		let messageList
		let example
		let loadingExample
		let exampleTimer
		if (isMobile()) {
			example = new Message()
			loadingExample = new Message()
			example.hide()
			loadingExample.hide()
			aBox.rootDom.appendChild(loadingExample.target)
			aBox.rootDom.appendChild(example.target)
		} else {
			messageList = createDom({
				className: `a-box-message-list`,
				style: {
					display: 'none'
				}
			})
			messageList.close = () => {
				if (messageList.childNodes.length === 0) {
					messageList.hide()
				}
			}
			aBox.rootDom.appendChild(messageList)
		}

		// PC端展示形式
		function pcMessage({content = '', timer = 2000, type = 'info', close = noneFn} = {}) {
			const example = new Message({
				content,
				type
			})

			function hide() {
				example.target.addClass('hide')
				setTimeout(() => {
					messageList.removeChild(example.target)
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

		// 移动端展示形式
		function mobileMessage({content = '', timer = 2000, type = 'success', close = noneFn} = {}) {
			example.setBody(content)
			example.target.setAttribute('class', 'a-box-container mobile')
			example.setType(type, '#fff')

			function hide() {
				example.hide()
			}

			clearTimeout(exampleTimer)
			exampleTimer = setTimeout(() => {
				hide()
			}, timer)

			example.show()
			return {
				example,
				hide
			}
		}

		aBox.message = function (...ars) {
			if (isMobile()) {
				return mobileMessage(...ars)
			} else {
				return pcMessage(...ars)
			}
		}

		function selectorLoading({selector, content} = {}) {
			let dom = selector
			const example = new Message({
				content,
				type: 'loading'
			})

			function setContent(content) {
				example.setBody(content)
			}

			function hide() {
				example.target.addClass('hide')
				setTimeout(() => {
					example.hide()
					dom.removeChild(example.target)
				}, 300)
			}

			if (typeof selector === 'string') {
				dom = document.querySelector(selector)
			}
			example.target.addClass('local-loading')
			dom.appendChild(example.target)
			example.show()
			return {
				example,
				setContent,
				hide
			}
		}

		function pcLoading({content, mask} = {}) {
			const example = new Message({
				content,
				type: 'loading'
			})
			const cover = aBox.createCover({opacity: 0})

			if (mask) {
				cover.show()
			}

			function setContent(content) {
				example.setBody(content)
			}

			function hide() {
				example.target.addClass('hide')
				if (mask) {
					cover.hide()
				}
				setTimeout(() => {
					messageList.removeChild(example.target)
					messageList.close()
				}, 300)
			}

			messageList.appendChild(example.target)
			messageList.show()
			example.show()
			return {
				example,
				setContent,
				hide
			}
		}

		function mobileLoading({content, mask} = {}) {
			loadingExample.setBody(content)
			loadingExample.target.setAttribute('class', 'a-box-container mobile')
			loadingExample.setType('loading', '#fff')

			const cover = aBox.createCover({opacity: 0})
			if (mask) {
				cover.show()
			}

			function setContent(content) {
				loadingExample.setBody(content)
			}

			function hide() {
				loadingExample.target.addClass('hide')
				if (mask) {
					cover.hide()
				}
				setTimeout(() => {
					loadingExample.hide()
				}, 300)
			}

			loadingExample.show()
			return {
				example: loadingExample,
				setContent,
				hide
			}
		}

		aBox.loading = function (...args) {
			if (args[0].selector) {
				return selectorLoading(...args)
			} else if (isMobile()) {
				return mobileLoading(...args)
			} else {
				return pcLoading(...args)
			}
		}
	}
}