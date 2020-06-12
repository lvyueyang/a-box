const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')

module.exports = {
	input: 'src/main.js',
	output: {
		file: 'dist/a-box.js',
		format: 'umd',
		name: 'ABox',
		sourcemap: true,
		banner: '/**\n原生js开发的自适应的提示框插件\n内置 alert prompt confirm message loading notice \n**/'
	},
	plugins: [
		resolve(),
		babel({
			exclude: 'node_modules/**', // 只编译我们的源代码
		})
	]
}