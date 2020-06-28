import {createDom, getIcon, isMobile} from '../utils/util'
import {Message} from './message'

const noneFn = () => {
}

const cName = 'notice'

class Notice extends Message {
	constructor(options = {}) {
		super(options)
		this.createTarget()
		const title = createDom({
			className: `a-box-title`
		})
		this.title = title
		this.wrap.appendChild(title)
		this.wrap.insertBefore(title, this.icon)
		this.setTitle(options.title)
	}

	setTitle(text) {
		if (text) {
			this.title.innerHTML = text
		} else {
			this.target.removeChild(this.title)
		}
	}
}

export default {
	install(aBox) {
		const noticeList = createDom({
			className: `a-box-${cName}-list`,
			style: {
				display: 'none'
			}
		})
		noticeList.close = () => {
			if (noticeList.childNodes.length === 0) {
				noticeList.hide()
			}
		}
		aBox.rootDom.appendChild(noticeList)

		aBox.notice = function ({title = '', content = '', timer = 2000, type = 'info', close = noneFn} = {}) {
			const example = new Notice({
				content,
				title,
				type,
			})

			function hide() {
				example.target.addClass('hide')
				setTimeout(() => {
					example.hide()
					noticeList.close()
				}, 300)
			}

			setTimeout(() => {
				hide()
			}, timer)

			noticeList.appendChild(example.target)
			noticeList.show()
			example.show()
			return {
				example,
				hide
			}
		}
	}
}