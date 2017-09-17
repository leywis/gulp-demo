var gulp = require('gulp'),   // 本地引入gulp
    runSequence = require('run-sequence'),  // gulp执行队列
    rev = require('gulp-rev'),  // 生产MD5后缀文件
    revCollector = require('gulp-rev-collector');  // 引入文件替换

var minifyCss = require('gulp-minify-css');//- 压缩CSS为一行；
var uglify = require('gulp-uglify'); // 压缩js

var clean = require('gulp-clean'); // 清除文件

var cssSrc = './css/*.css'; // css源文件路径
var jsSrc = './js/*.js'; // js源文件路径

// 清空旧文件
gulp.task('clean', function() {
    return gulp.src('dist',{read:false}).pipe(clean());
  });

// 清除manifest文件
gulp.task('cleanManifest', function() {
    return gulp.src('./dist/**/*.json',{read:false}).pipe(clean());
  });
gulp

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射  
gulp.task('revCss', function(){  
    return gulp.src(cssSrc)
        .pipe(minifyCss())  
        .pipe(rev())  
        .pipe(gulp.dest('./dist/css'))  
        .pipe(rev.manifest())  
        .pipe(gulp.dest('./dist/css'));  
});  
   
//js生成文件hash编码并生成 rev-manifest.json文件名对照映射  
gulp.task('revJs', function(){  
    return gulp.src(jsSrc)
        .pipe(uglify())  
        .pipe(rev())                                //给文件添加hash编码  
        .pipe(gulp.dest('./dist/js'))  
        .pipe(rev.manifest())                       //生成rev-mainfest.json文件作为记录  
        .pipe(gulp.dest('./dist/js'));  
});

//Html替换css、js文件版本  
gulp.task('revHtmlCss', function () {  
    return gulp.src(['./dist/*/*.json', './*.html'])  
        .pipe(revCollector())                         //替换html中对应的记录  
        .pipe(gulp.dest('./dist'));                     //输出到该文件夹中  
});  
gulp.task('revHtmlJs', function () {  
    return gulp.src(['./dist/*/*.json', './*.html'])  
        .pipe(revCollector())  
        .pipe(gulp.dest('./dist'));  
});

//开发构建  
gulp.task('dev', function (done) {  
    condition = false;  
    //依次顺序执行  
    runSequence(
        ['clean'],  
        ['revCss'],  
        ['revHtmlCss'],  
        ['revJs'],  
        ['revHtmlJs'],  
        ['cleanManifest'],
        done);  
});
  