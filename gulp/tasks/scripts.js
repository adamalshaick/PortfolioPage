const gulp = require("gulp"),
  webpack = require("webpack");

gulp.task("scripts", function() {
  webpack(require("../../webpack.config.js"), function(err, stats) {
    if (err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    callback();
  });
});

gulp.task(
  "scriptsRefresh",
  gulp.series("scripts", function() {
    browserSync.reload();
  })
);
