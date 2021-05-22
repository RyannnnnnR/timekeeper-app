var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    del = require('del'),
    // sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    ngAnnotate = require('browserify-ngannotate');


var Server = require('karma').Server;
var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

gulp.task('clean', async function (cb) {
    del([
        'dist'
    ], cb);
});

gulp.task('build-template-cache', gulp.series('clean'), function() {
    
    var ngHtml2Js = require("gulp-ng-html2js"),
        concat = require("gulp-concat");
    
    return gulp.src("src/templates/*.html")
        .pipe(ngHtml2Js({
            moduleName: "timekeeperTemplates",
            prefix: "/templates/"
        }))
        .pipe(concat("templatesCache.js"))
        .pipe(gulp.dest("./dist"));
});

gulp.task('build-js', gulp.series('clean'),  function() {  
    var b = browserify({
        entries: 'src/app.js',
        debug: true,
        paths: ['src/controllers', 'src/services', 'src/directives'],
        transform: [ngAnnotate]
    });
 
    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(cachebust.resources())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('jshint', function(done) {  
    gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));

    done()
});

gulp.task('sprite', function (done) {
 
    var spriteData = gulp.src('src/assets/img/*.png')
        .pipe(spritesmith({
            imgName: 'timekeeper-sprite.png',
            cssName: '_timekeeper-sprite.css',
            algorithm: 'top-down',
            padding: 5
        }));
 
    spriteData.css.pipe(gulp.dest('./dist'));
    spriteData.img.pipe(gulp.dest('./dist'))

    done();
});

gulp.task('build', gulp.series('clean','build-template-cache', /*'jshint'*/ 'build-js'), function(done) {  
    return gulp.src('src/index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});

gulp.task('test', function(done) {  
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
      }, function() {
        done();
    }).start();
});


gulp.task('watch', async function() {
    return gulp.watch(['src/index.html','src/templates/*.html', 'src/styles/*.*css', 'src/**/*.js'], gulp.series('build'));
});

gulp.task('webserver', gulp.series('watch','build'), function(done) {  
    gulp.src('.')
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            open: "http://localhost:8000/dist/index.html"
        }));

        done();
});

gulp.task('dev', gulp.series('watch', 'webserver'));

gulp.task('default', gulp.series('sprite','build', 'test'));