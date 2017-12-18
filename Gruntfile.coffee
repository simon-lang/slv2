module.exports = (grunt) ->

  target = grunt.option('target') or 'dev'

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    cssmin:
      combine:
        files:
          'www/css/main.css': ['www/css/main.css']

    copy:
      build:
        cwd: 'assets'
        src: ['**/*']
        dest: 'www'
        expand: true
        filter: 'isFile'

    connect:
      server:
        options:
          port: 3000
          useAvailablePort: true
          hostname: '*'
          base: 'www'
          livereload: port: 12345
          # keepalive: true

    'gh-pages':
      options:
        base: 'www'
      src: ['**']

    stylus:
      compile:
        files:
          'www/css/main.css': 'styles/main.styl'

    browserify:
      dist:
        files:
          'www/js/app.js': ['src/app.coffee']
        options:
          transform: ['coffeeify']
          extensions: '.coffee'

    pug:
      compile:
        options:
          data:
            DEBUG: target is 'dev'
        files:
          'www/index.html': ['views/index.pug']

    uglify:
      options:
        mangle: false
        nonull: true
        banner: '/*! <%= pkg.name %> <%= grunt.template.today(\'yyyy-mm-dd HH:mm:ss\') %> */\n'
      prod:
        src: ['www/js/app.js']
        dest: 'www/js/app.min.js'

    autoprefixer:
      options: {}
      no_dest:
        src: 'www/css/main.css'

    watch:
      stylus:
        files: ['styles/**/*.styl']
        tasks: ['stylus']
      browserify:
        files: ['src/**/*.coffee']
        tasks: ['browserify']
      pug:
        files: ['views/**/*.pug']
        tasks: ['pug']
      livereload:
        options:
          livereload: port: 12345
        files: [
          'www/css/main.css'
          'www/index.html'
          'www/js/app.js'
        ]

    clean:
      www: ['www']

  grunt.loadNpmTasks 'grunt-autoprefixer'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-pug'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-gh-pages'

  grunt.registerTask 'default', ['clean', 'browserify', 'stylus', 'pug', 'autoprefixer', 'copy']
  grunt.registerTask 'server', ['connect', 'watch']
  grunt.registerTask 'dev', ['connect', 'watch']
