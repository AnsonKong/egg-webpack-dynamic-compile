const MemoryFileBuilder = require('./lib/MemoryFileBuilder');

module.exports = app => {
	console.log('worker enter');
	app.messenger.on('egg-ready', () => {
		console.log('egg-ready from worker');
		if (app.config.env === 'local') {
			app.memoryFileBuilder = new MemoryFileBuilder(app);
		}
	});
}