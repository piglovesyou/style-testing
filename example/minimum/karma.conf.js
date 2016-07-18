module.exports = function(config) {
    config.set({

        basePath: __dirname,

        frameworks: [
            'mocha',
            'browserify',
        ],

        files: [
            'components/**/*.js',
            // 'components/**/*.html',
            {pattern: '**/*.css', included: false},
            'components/**/*.less',
        ],

        exclude: [],

        preprocessors: {
            'components/**/*.js': ['browserify'],
            // 'components/**/*.html': ['html2js'],
            'components/**/*.less': ['less'],
        },

        browserify: {
            debug: true,
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

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['Chrome'],

        singleRun: false,

        concurrency: Infinity
    })
}
