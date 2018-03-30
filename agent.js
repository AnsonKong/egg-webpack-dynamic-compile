const MemoryFileEvent = require('./lib/MemoryFileEvent');
const GlobalReg = require('./lib/GlobalReg');
const path = require('path');
const mime = require('mime');

module.exports = agent => {
	console.log('agent enter');
	agent.messenger.on('egg-ready', () => {
		console.log('egg-ready from agent');
		if (agent.config.env === 'local') {
			const koaWebpack = require('koa-webpack');
			const { dev } = koaWebpack();

			agent.messenger.on(MemoryFileEvent.REQUEST_FILE, filePath => {
				agent.logger.info('request file: ' + filePath);
				// check if file exists in webpack memory
				// filePath: relative path like '/index.html'
				// absPath: absolute path for 'memory-fs' usage
				dev.waitUntilValid(() => {
					let fileData;
					const fs = dev.fileSystem;
					const absPath = path.join(dev.context.compiler.outputPath, filePath);

					if (fs.existsSync(absPath)) {
						const ext = path.extname(filePath).toLocaleLowerCase();
						let encoding;
						// Buffer(default) or String(txt extension)
						if (GlobalReg.txt.test(ext)) {
							encoding = 'utf-8';
						}
						fileData = fs.readFileSync(absPath, encoding);
					}
					agent.messenger.sendToApp(
						fileData ? MemoryFileEvent.FILE_FOUND : MemoryFileEvent.FILE_NOT_FOUND, 
						{ filePath, fileData }
					);
				})
			});
		}
	});
}