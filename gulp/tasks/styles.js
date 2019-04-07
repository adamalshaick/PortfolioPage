var gulp = require("gulp"),
  autoprefixer = require("gulp-autoprefixer");
var sass = require("gulp-sass");

gulp.task("styles", function() {
  return gulp
    .src("./app/assets/styles/styles.css")
    .pipe(sass(autoprefixer))
    .on("error", function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit("end");
    })
    .pipe(autoprefixer())
    .pipe(gulp.dest("./app/temp/styles"));
});
