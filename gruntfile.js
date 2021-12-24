const NODE_ENV = process.env.NODE_ENV
const is_dev = NODE_ENV === 'development'
const is_pro = NODE_ENV === 'production'
console.log({ is_dev, is_pro })

module.exports = function (grunt) {
  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-ejs')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-htmlmin')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-replace')
  grunt.loadNpmTasks('grunt-postcss')
  // 默认被执行的任务列表。
  grunt.registerTask('default', ['ejs', 'replace', 'uglify', 'postcss', 'cssmin', 'htmlmin', 'copy'])

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['src/ejs/**/*.ejs'],
      tasks: ['ejs'],
    },
    // 替换内置变量，@@开头。
    replace: {
      options: {
        patterns: [
          {
            match: 'NODE_ENV',
            replacement: NODE_ENV,
          },
        ],
      },
      build: {
        expand: true,
        cwd: 'src',
        src: '**/*',
        dest: 'replace/',
      },
    },
    ejs: {
      options: {
        banner: '/*! <%= pkg.description %> <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      build: {
        expand: true,
        cwd: 'replace/ejs',
        src: ['**/*.ejs', '!common/**/*.ejs'],
        dest: 'src/',
        ext: '.html',
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.description %> <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      build: {
        expand: true,
        cwd: 'replace',
        src: 'js/**/*.js',
        dest: 'dist/',
      },
    },
    postcss: {
      options: {
        processors: [
          require('postcss-px-to-viewport')({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 750, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['wrap'], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
            landscape: false, // 是否处理横屏情况
          }),
        ],
      },
      dist: {
        expand: true,
        cwd: 'replace',
        src: 'css/**/*.css',
        dest: 'postcss/',
      },
    },
    cssmin: {
      options: {
        banner: '/*! <%= pkg.description %> <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      build: {
        expand: true,
        cwd: 'postcss',
        src: 'css/**/*.css',
        dest: 'dist/',
      },
    },
    htmlmin: {
      options: {
        banner: '/*! <%= pkg.description %> <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true,
      },
      build: {
        expand: true,
        cwd: 'replace',
        src: '**/*.html',
        dest: 'dist/',
      },
    },
    copy: {
      lib: {
        expand: true,
        cwd: 'src',
        src: 'lib/**/*',
        dest: 'dist/',
      },
      img: {
        expand: true,
        cwd: 'src',
        src: 'img/**/*',
        dest: 'dist/',
      },
      icon: {
        expand: true,
        cwd: 'src',
        src: 'icon/**/*',
        dest: 'dist/',
      },
    },
  })
}
