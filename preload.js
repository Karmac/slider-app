window.APP_PATH = __dirname

window.reqRenderer = filename => {
	return require(APP_PATH + '/renderer_process/' + filename + '.js')
}
