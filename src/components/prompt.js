import Modal from './modal'
import {createDom} from '../utils/util'

const noneFn = () => {
}
export default {
	install(aBox) {
		aBox.prompt = function ({title = '', type = 'text', placeholder = '请输入', confirmText = '确定', confirm = noneFn, cancelText = '取消', cancel = noneFn} = {}) {
			const cover = aBox.createCover()
			cover.show()
			const example = new Modal(aBox, {
				title,
			})
			example.target.addClass('a-box-prompt')

			function hide() {
				cover.hide()
				example.hide()
			}

			let input
			if (type === 'textarea') {
				input = createDom({
					className: 'a-box-input',
					tagName: 'textarea'
				})
			} else {
				input = createDom({
					className: 'a-box-input',
					tagName: 'input'
				})
				input.type = type
			}

			input.placeholder = placeholder
			example.setBody(input)

			const cancelBtn = example.createBtn('a-box-cancel-btn', cancelText)
			const confirmBtn = example.createBtn('a-box-confirm-btn', confirmText)
			confirmBtn.addEventListener('click', () => {
				confirm(input.value)
				hide()
			})
			cancelBtn.addEventListener('click', () => {
				cancel()
				hide()
			})
			example.show()
			return {
				example,
				hide
			}
		}
	}
}