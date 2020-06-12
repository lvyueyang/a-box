/**
 * 创建dom节点
 * @param {String} className 节点Class
 * @param {String} tagName 节点标签名
 * @param {String} style 节点内联style
 * @return Node
 * */
export function createDom({className = '', tagName = 'div', style = {}} = {}) {
	const dom = document.createElement(tagName)
	dom.setAttribute('class', className)
	for (let i in style) {
		if (style.hasOwnProperty(i)) {
			dom.style[i] = style[i]
		}
	}
	dom.show = () => {
		dom.style.display = 'block'
	}
	dom.hide = () => {
		dom.style.display = 'none'
	}
	dom.addClass = name => {
		const cls = dom.getAttribute('class')
		const clsArr = cls.split(' ')
		if (!clsArr.includes(name)) {
			dom.setAttribute('class', cls + ' ' + name)
		}
	}
	return dom
}