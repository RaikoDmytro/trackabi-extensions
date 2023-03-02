module.exports = function(grunt) {
	grunt.initConfig({
		concat: {
			chrome: {
				src: ['./browsers-config/chrome/index.js', './index.js'],
				dest: 'builds/chrome/index.js'
			},
			edge: {
				src: ['./browsers-config/edge/index.js', './index.js'],
				dest: 'builds/edge/index.js'
			},
			firefox: {
				src: ['./browsers-config/firefox/index.js', './index.js'],
				dest: 'builds/firefox/index.js'
			},
			opera: {
				src: ['./browsers-config/opera/index.js', './index.js'],
				dest: 'builds/opera/index.js'
			}
		},
		copy: {
			imgChrome: {
				expand: true,
				dest: './builds/chrome/images/',
				src: './images/*',
				filter: 'isFile'
			},
			imgEdge: {
				expand: true,
				dest: './builds/edge/images/',
				src: './images/*',
				filter: 'isFile'
			},
			imgFirefox: {
				expand: true,
				dest: './builds/firefox/images/',
				src: './images/*',
				filter: 'isFile'
			},
			imgOpera: {
				expand: true,
				dest: './builds/opera/images/',
				src: './images/*',
				filter: 'isFile'
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-concat')
	grunt.loadNpmTasks('grunt-contrib-copy')

	grunt.registerTask('concat-chrome', ['concat:chrome'])
	grunt.registerTask('concat-edge', ['concat:edge'])
	grunt.registerTask('concat-firefox', ['concat:firefox'])
	grunt.registerTask('concat-opera', ['concat:opera'])
	grunt.registerTask('concat-all', ['concat:chrome', 'concat:edge', 'concat:firefox', 'concat:opera'])
	grunt.registerTask('copy-images-chrome', ['copy:imgChrome'])
	grunt.registerTask('copy-images-edge', ['copy:imgEdge'])
	grunt.registerTask('copy-images-firefox', ['copy:imgFirefox'])
	grunt.registerTask('copy-images-opera', ['copy:imgOpera'])
	grunt.registerTask('copy-images', ['copy:imgChrome', 'copy:imgEdge', 'copy:imgFirefox', 'copy:imgOpera'])
}
