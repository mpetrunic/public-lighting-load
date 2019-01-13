const { run, help } = require('runjs');

function clean() {
  run('rm -rf node_modules');
  run('rm -rf build');
}

function lint() {
  run('docker-compose run --rm backend npm run lint');
}

function npm(task = '--help') {
  run('docker-compose run --rm backend npm run ' + task);
}

function compile() {
  run('docker-compose run --rm backend npm run build');
}

function osmImport() {
  run('osm2pgsql district-of-columbia-latest.osm.pbf -d geoinf -U geoinf -H localhost -P 9876 --password --hstore');
}

function build() {
  run('docker-compose down');
  run('docker-compose -f docker-compose-cleanup.yml down -v');
  run('docker-compose build');
}

function test() {
  run('docker-compose run -e NODE_ENV=test --rm backend npm run test');
}

function dev() {
  run('docker-compose up');
}

help(test, 'Runs nodejs tests');
help(dev, 'Starts application and all dependent services');
help(npm, 'Executes npm script');
help(compile, 'Transpiles files to es5');
help(clean, 'Removes all build directories and dependencies');
help(lint, 'Runs eslint on current project');
help(build, 'Builds new docker image');

module.exports = {
  clean,
  lint,
  npm,
  build,
  osmImport,
  test,
  compile,
  dev,
};
