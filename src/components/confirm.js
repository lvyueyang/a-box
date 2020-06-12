import Modal from './modal'

const noneFn = () => {
}
export default {
	install(aBox) {
		aBox.confirm = function ({title = '', content = '', confirmText = '确定', confirm = noneFn, cancelText = '取消', cancel = noneFn} = {}) {
			const cover = aBox.createCover()
			cover.show()
			const example = new Modal(aBox, {
				title,
				content
			})
			example.target.addClass('a-box-confirm')

			function hide() {
				cover.hide()
				example.hide()
			}

			const cancelBtn = example.createBtn('a-box-cancel-btn', cancelText)
			const confirmBtn = example.createBtn('a-box-confirm-btn', confirmText)
			confirmBtn.addEventListener('click', () => {
				confirm()
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