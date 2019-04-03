const gulp = require('gulp');
const sonarqubeScanner = require('sonarqube-scanner');

const {
  createBabelNodeBuildTask,
  lint,
  buildLocalDependenciesTask,
  installLocalDependenciesTask,
  testTask,
  buildCleanTask,
  mergeConfigTask,
  testCoverageTask,
  cleanTestCoverageTask,
} = require('ezr3d-build-utils');

gulp.task('lint', lint(__dirname));

gulp.task('merge-default-config', mergeConfigTask(__dirname));

gulp.task('build-deps', gulp.series(buildLocalDependenciesTask(__dirname)));

gulp.task('build-clean', buildCleanTask(__dirname));

gulp.task('build', gulp.series('build-clean', createBabelNodeBuildTask(), 'merge-default-config'));

gulp.task('build-all', gulp.series('build-deps', 'build'));

gulp.task('install-dev', gulp.series(installLocalDependenciesTask(__dirname)));

gulp.task('test', gulp.series('build', testTask));

gulp.task('coverage-clean', cleanTestCoverageTask(__dirname));

gulp.task('coverage', gulp.series('coverage-clean', testCoverageTask(__dirname)));

gulp.task('sonar', cb =>
  sonarqubeScanner(
    {
      serverUrl: 'https://sonar.bcloud.zpd.lhind.dlh.de',
    },
    cb
  )
);
