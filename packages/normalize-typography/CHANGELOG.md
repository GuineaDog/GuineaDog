# Changelog for the `@guineadog/normalize-typography` package

All notable changes to this project will be documented in this file.

## [0.4.0](https://github.com/GuineaDog/GuineaDog/compare/@guineadog/normalize-typography@0.3.3...@guineadog/normalize-typography@0.4.0) (2026-05-03)

### Added

- Improved console output formatting and status messages.
- Files are now sorted with directories appearing first in the output.

### Changed

- Refactored internal file discovery to use `ignore-walk` for better performance and respect for ignore files.
- Refactored functions for better maintainability.

### Fixed

- Excluded build artifacts from npm publication to reduce package size.
- Fixed file discovery - now respects .gitignore and .prettierignore.

## [0.3.3](https://github.com/GuineaDog/GuineaDog/compare/@guineadog/normalize-typography@0.3.1...@guineadog/normalize-typography@0.3.3) (2026-05-01)

_This release focuses on infrastructure, documentation, and tooling improvements. No functional changes were made to the package code._

## [0.3.1](https://github.com/GuineaDog/GuineaDog/compare/@guineadog/normalize-typography@0.3.0...@guineadog/normalize-typography@0.3.1) (2026-04-30)

_This release focuses on infrastructure, documentation, and tooling improvements. No functional changes were made to the package code._

## 0.3.0 (2026-04-30)

### Changed

- Refactored `@guineadog/normalize-typography` to remove `glob` dependency and enforce Node.js 22+.

## 0.1.0 (2026-04-29)

### Added

- Initial implementation of the `@guineadog/normalize-typography` package.
