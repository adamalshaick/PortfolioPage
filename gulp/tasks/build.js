const gulp = require("gulp"),
  imagemin = require("gulp-imagemin"),
  del = require("del"),
  usemin = require("gulp-usemin"),
  rev = require("gulp-rev"),
  cssnano = require("gulp-cssnano"),
  uglify = require("gulp-uglify"),
  browserSync = require("browser-sync").create();

gulp.task("previewDist", function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "docs"
    }
  });
});

gulp.task("deleteDistFolder", function() {
  return del("./docs");
});

gulp.task(
  "copyGeneralFiles",
  gulp.series("deleteDistFolder", function() {
    const pathsToCopy = [
      "./app/**/*",
      "!./app/*.html",
      "!./app/assets/images/**",
      "!./app/assets/styles/**",
      "!./app/assets/scripts/**",
      "!./app/temp",
      "!./app/temp/**"
    ];
    return gulp.src(pathsToCopy).pipe(gulp.dest("./docs"));
  })
);

gulp.task(
  "optimizeImages",
  gulp.series("deleteDistFolder", function() {
    return gulp
      .src(["./app/assets/images/**/*"])
      .pipe(
        imagemin({
          progressive: true,
          interlaced: true,
          multipass: true
        })
      )
      .pipe(gulp.dest("./docs/assets/images"));
  })
);

gulp.task(
  "useminTrigger",
  gulp.series("deleteDistFolder", function() {
    gulp.start("usemin");
  })
);

gulp.task(
  "usemin",
  gulp.series("styles", "scripts", function() {
    return gulp
      .src("./app/*.html")
      .pipe(
        usemin({
          css: [
            function() {
              return rev();
            },
            function() {
              return cssnano();
            }
          ],
          js: [
            function() {
              return rev();
            },
            function() {
              return uglify();
            }
          ]
        })
      )
      .pipe(gulp.dest("./docs"));
  })
);

gulp.task(
  "build",
  gulp.series(
    "deleteDistFolder",
    "copyGeneralFiles",
    "optimizeImages",
    "useminTrigger",
    function() {
      gulp.start("usemin");
    }
  )
);
