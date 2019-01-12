# Public lighting load

## Requirements

Following software is required to be installed to use this repo:
 * [NodeJs](https://nodejs.org/en/) >= v8.4.0
 * [Yarn](https://yarnpkg.com/en/docs/install#debian-stable)
 * Docker
 * docker-compose
 * yarn install

## Usage

On first use of this repo, run `npx run build` which will
build docker image.You will have to run `npx run build` each time
you change dependencies in package.json (yarn.lock).

Run `npx run` to see all available commands and their description.

## Notice
* make sure you update yarn.lock before building
* use sequelize-cli local to generate migrations (because of timestamp)
