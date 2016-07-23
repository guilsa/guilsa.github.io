/* jshint node:true */
module.exports = function( grunt ) {
	'use strict';

	require( 'load-grunt-tasks' )( grunt );

	var heConfig = {

		// gets the package vars
		pkg: grunt.file.readJSON( 'package.json' ),

		// setting folder templates
		dirs: {
			css: 'css',
			js: '_js',
			sass: '_sass'
		},

    concat: {
      dist: {
        src: ["<%= dirs.js %>/jquery.js","<%= dirs.js %>/jquery.validate.js", "<%= dirs.js %>/jquery.fullPage.min.js", "<%= dirs.js %>/script.js"],
        dest: "js/site.js"
      }
    },

    uglify: {
      app: {
        options: {
         //beautify: true
        },
        files: {
          "js/site.min.js" : "js/site.js"
        }
      }
    },

		// compile scss/sass files to CSS
		sass: {
			dist: {
				options: {
					style: 'compressed', // compressed
					sourcemap: 'none',
					loadPath: require('node-neat').includePaths
				},
				files: [{
					expand: true,
					cwd: '<%= dirs.sass %>',
					src: ['*.scss'],
					dest: '<%= dirs.css %>',
					ext: '.min.css'
				}]
			}
		},

		watch: {
      sass: {
        files: [
              '<%= dirs.sass %>/**', '<%= dirs.js %>/*.js'
        ],
        tasks: ['sass']
      },
      js: {
        files: [
              '<%= dirs.js %>/**'
        ],
        tasks: ['concat','uglify']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '_site/*.html'
        ]
      },
      options: {
        spawn: false
      }
    }

	};


	// Initialize Grunt Config
	// --------------------------
	grunt.initConfig( heConfig );
	require('time-grunt')(grunt);

	// Register Tasks
	// --------------------------

	// Default Task
	grunt.registerTask( 'default', [
		'sass',
    'concat',
		'uglify'
	] );

	grunt.registerTask( 'w', ['watch'] );

};
