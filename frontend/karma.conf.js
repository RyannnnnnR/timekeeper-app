module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '.',
		frameworks: ['jasmine'],
		files: [
            'tests/**/*.spec.js'
		],
		autoWatch: true,
		singleRun: false,
		browsers: ['PhantomJS']
	});
};