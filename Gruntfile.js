module.exports = function(grunt) {
	grunt.initConfig({
		concat: {
			chrome: {
				src: ['./config.js', './chrome/index.js', './index.js'],
				dest: 'builds/chrome/index.js'
			}
		}
	})
	
	grunt.loadNpmTasks('grunt-contrib-concat')
	
	grunt.registerTask('concat-chrome', ['concat:chrome'])
}