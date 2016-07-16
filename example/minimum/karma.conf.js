// Karma configuration
// Generated on Tue Jun 28 2016 21:04:17 GMT+0900 (JST)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: __dirname,


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'mocha',
            'browserify',
        ],


        // list of files / patterns to load in the browser
        files: [
            'components/**/*.js',
            // 'components/**/*.html',
            {pattern: '**/*.css', included: false},
            'components/**/*.less',
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'components/**/*.js': ['browserify'],
            // 'components/**/*.html': ['html2js'],
            'components/**/*.less': ['less'],
        },

        browserify: {
            debug: true,
            transform: [
                ['babelify', {
                  'plugins': [
                    // Pass module directly because somehow babel tries to
                    // find plugings fron style-testing/node_modules.
                    require('babel-plugin-transform-async-to-generator'),
                    require('babel-plugin-transform-es2015-modules-commonjs')
                  ]
                }]
            ]
        },

        lessPreprocessor: {
            options: {
                paths: ['src'],
                save: true,
            },
            additionalData: {
                modifyVars: {
                    'bodyColor': 'grey',
                    'secondBoxColor': 'blue',
                },
                globalVars: {
                    'globalBoxColor': 'red'
                },
            },
            transformPath: (path) => {
            console.log(path);
                return path.replace(/\.less$/, '.compiled.css')
            }
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
