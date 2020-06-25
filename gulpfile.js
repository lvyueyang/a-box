const {watch, task, src, dest} = require('gulp')
const sass = require('gulp-sass')
const path = require('path')
const rollup = require('rollup')
const rollupConfig = require('./rollup.config')
const {uglify} = require('rollup-plugin-uglify')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync')
const reload = browserSync.reload

// 监听错误
function swallowError(error) {
	console.error(error.toString())
	this.emit('end')
}

browserSync({
	server: {
		baseDir: './',
		tunnel: true      //可以解决与wenstrom冲突问题
	}
})

function scssToCss() {
	console.log('打包css')
	src('src/style/common.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.on('error', swallowError)
		.pipe(dest('./lib'))
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
		watcher.on('change', async p => {
			if (p.includes(path.join(`src/style/`))) {
				await scssToCss()
			} else {
				await rollupBuild().catch(e => {
					console.error(e)
				})
			}
			reload()
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

