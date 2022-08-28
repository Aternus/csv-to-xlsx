# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

## [2.0.3]

### Fixed

- Fixed build issues

## [2.0.0]

### Added

- TypeScript
- Ability to specify Sheet Name
- Ability to overwrite destination XLSX files

### Changed

- Decoupled CLI and API implementations
- Changed API export to conform to CJS and ESM

## [1.1.1]

### Fixed

- Fixed broken CLI due to a missing `fs-extra` module
- Fixed `.npmignore` list

## [1.1.0]

### Changed

- Updated build scripts
- Replaced `fs` with `fs-extra` module
- Updated to node.js v16

### Security

- Updated npm dependencies

## [1.0.19]

### Changed

- README.md

## [1.0.18]

### Changed

- Updated the code responsible for command line arguments processing
- Replaced `fs-extra` with the native `fs` module
- Updated `package.json`: specified engines and module type
- Updated to node.js v14

### Security

- Updated npm dependencies

## [1.0.17]

### Security

- Updated npm dependencies

## [1.0.16]

### Added

- Added test for ture and false values

### Fixed

- Removed unnecessary type conversion

### Security

- Updated npm dependencies

## [1.0.15]

### Security

- Updated npm dependencies

## [1.0.14]

### Changed

- Removed "bin" folder from npmjs.com package. Please get the binaries directly
  from GitHub.

## [1.0.13]

### Security

- Updated npm dependencies

## [1.0.12]

### Security

- Updated npm dependencies

## [1.0.11]

### Changed

- README.md
- Updated to the latest versions of dependencies
- Updated to node.js v12

### Security

- Updated npm dependencies

## [1.0.10]

### Added

- Added the version to the help menu
- Added Prettier code formatter
- Added ESLint prettier config

### Changed

- Adjusted ESLint rules to comply with Prettier

### Security

- Updated npm dependencies

## [1.0.9]

### Changed

- Refactored for loops

### Security

- Updated npm dependencies

## [1.0.8]

### Security

- Updated npm dependencies

## [1.0.7]

### Changed

- Updated the "publish" script

## [1.0.6]

### Added

- The "publish" script now informs about the CHANGELOG.md

### Fixed

- The "publish" script now pushes repo and tags appropriately

## [1.0.5]

### Changed

- README.md
- Updated the package.json scripts
- Updated the "publish" script

## [1.0.4]

### Changed

- README.md

## [1.0.3]

### Fixed

- Updated the structure of package.json to avoid a bug with author name in
  Node.js CLI mode

## [1.0.2]

### Added

- Added sections to README.md

### Changed

- Updated the package description
- Updated the "publish" script

### Fixed

- NPM bin

## [1.0.1]

### Changed

- Updated the "publish" script

## [1.0.0]

- First release
