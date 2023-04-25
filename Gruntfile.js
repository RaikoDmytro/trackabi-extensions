module.exports = function(grunt) {
	grunt.initConfig({
		copy: {
			main: {
				files: [
					{ expand: true, src: './images/*', dest: './dist/builds/chrome/', filter: 'isFile' },
					{ expand: true, src: './images/*', dest: './dist/builds/edge/', filter: 'isFile' },
					{ expand: true, src: './images/*', dest: './dist/builds/opera/', filter: 'isFile' },
					{ expand: true, src: './images/*', dest: './dist/builds/firefox/', filter: 'isFile' },
					{ expand: true, cwd: './src/general/', dest: './dist/builds/chrome/', src: '**', filter: 'isFile' },
					{ expand: true, cwd: './src/general/', dest: './dist/builds/edge/', src: '**', filter: 'isFile' },
					{ expand: true, cwd: './src/general/', dest: './dist/builds/opera/', src: '**', filter: 'isFile' },
					{ expand: true, cwd: './src/firefox/', dest: './dist/builds/firefox/', src: '**', filter: 'isFile' },
				],
			},
		},
		concat: {
			index: {
				files: {
					'dist/builds/chrome/index.js': ['./src/general/index.js', './index.js'],
					'dist/builds/edge/index.js': ['./src/general/index.js', './index.js'],
					'dist/builds/opera/index.js': ['./src/general/index.js', './index.js'],
					'dist/builds/firefox/index.js': ['./src/firefox/index.js', './index.js'],
				}
			}
		},
	})

	grunt.loadNpmTasks('grunt-contrib-copy')
	grunt.loadNpmTasks('grunt-contrib-concat')

	grunt.registerTask('copy-files', ['copy:main',])
	grunt.registerTask('concat-all', ['concat:index'])
}
