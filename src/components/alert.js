import Modal from './modal'

const noneFn = () => {
}
export default {
	install(aBox) {
		aBox.alert = function ({title = '', content = '', confirmText = '确定', confirm = noneFn} = {}) {
			const cover = aBox.createCover()
			cover.show()
			const example = new Modal(aBox, {
				title,
				content
			})
			example.target.addClass('a-box-alert')

			function hide() {
				cover.hide()
				example.hide()
			}

			const confirmBtn = example.createBtn('a-box-confirm-btn', confirmText)
			confirmBtn.addEventListener('click', () => {
				confirm()
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