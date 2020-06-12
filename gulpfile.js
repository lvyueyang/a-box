const {watch, task, src, dest} = require('gulp')
const sass = require('gulp-sass')
const path = require('path')
const rollup = require('rollup')
const rollupConfig = require('./rollup.config')
const {uglify} = require('rollup-plugin-uglify')

// 监听错误
function swallowError(error) {
	console.error(error.toString())
	this.emit('end')
}

function scssToCss() {
	console.log('打包css')
	src('src/style/common.scss')
		.pipe(sass())
		.on('error', swallowError)
		.pipe(dest('./dist'))
}

async function rollupBuild(isBuild = false) {
	console.log('打包js')
	let plugins = rollupConfig.plugins
	if (isBuild) {
		plugins.push(uglify())
	}
	const bundle = await rollup.rollup({
		input: rollupConfig.input,
		plugins
	})
	await bundle.write(rollupConfig.output)
	console.log('end')
}

const watch_files = [
	'src/**/*',
	'src/*'
]

// 监视文件改动并重新载入
task('serve', () => {
	try {
		const watcher = watch(watch_files)
		watcher.on('change', function (path) {
			if (path.includes(`src/style/`)) {
				scssToCss()
			} else {
				rollupBuild().catch(e => {
					console.error(e)
				})
			}
		})
	} catch (e) {
		console.log(e)
	}
})

// 监视文件改动并重新载入
task('build', async () => {
	try {
		scssToCss()
		await rollupBuild(true)
	} catch (e) {
		console.log(e)
	}
})

