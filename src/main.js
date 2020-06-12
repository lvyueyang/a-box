import {createDom} from './utils/util'
import alert from './components/alert'
import confirm from './components/confirm'
import prompt from './components/prompt'
import message from './components/message'

export default class ABox {
	constructor() {
		this.init()
		this.use(alert)
		this.use(confirm)
		this.use(prompt)
		this.use(message)
	}

	init() {
		this.createRootContainer()
	}

	// 创建根容器
	createRootContainer() {
		const rootDom = createDom({
			className: 'a-box-root-container',
		})
		document.body.appendChild(rootDom)
		this.rootDom = rootDom
	}

	// 创建浮层
	createCover() {
		const cover = createDom({className: 'a-box-cover'})
		cover.show = () => this.rootDom.appendChild(cover)
		cover.hide = () => this.rootDom.removeChild(cover)
		return cover
	}

	use(c, ...args) {
		c.install(this, ...args)
	}
}