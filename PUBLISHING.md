# Package Publishing Guide

This monorepo uses NPM workspaces to manage packages. Below is the process for publishing new releases.

## 1. Preparation and Verification

Before publishing, ensure the package builds correctly and all tests pass - check commands in the [Quick Start Guide](QUICKSTART.md).
Also make sure that all necessary changes are merged into the `main` branch.

## 2. Create a Release Branch

```
git checkout -b release/<package-name>-<version>
```

_Example:_

```
git checkout -b release/normalize-typography-0.4.0
```

## 3. Update Changelog

Update the `CHANGELOG.md` file in the package directory (`packages/<package-name>/CHANGELOG.md`) with the new version and changes.

## 4. Version Update

This command will update the version in the `packages/<package-name>/package.json` file and in the root `package-lock.json` file.

Check https://semver.org/ and https://docs.npmjs.com/about-semantic-versioning for difference between `patch|minor|major`.

```
npm version <patch|minor|major> -w packages/<package-name>
```

_Example:_

```
npm version minor -w packages/normalize-typography
```

## 5. Committing Changes to Git

When using workspaces, `npm version` updates the files but often does not create a commit automatically. This must be done manually:

1. Add files to commit:

   ```
   git add ./package-lock.json ./packages/<package-name>/package.json ./packages/<package-name>/CHANGELOG.md
   ```

   _Example:_

   ```
   git add ./package-lock.json ./packages/normalize-typography/package.json ./packages/normalize-typography/CHANGELOG.md
   ```

2. Create commit:

   ```
   git commit -m "chore(release): @guineadog/<package-name>@<version>"
   ```

   _Example:_

   ```
   git commit -m "chore(release): @guineadog/normalize-typography@0.3.0"
   ```

3. Push commit(s) to the remote repository.
   ```
   git push
   ```

## 6. Pull Request (PR)

Create, review and merge it into the `main` branch. This will allow you to pass CI checks, linting and tests.

## 7. Push the Tag to the Remote Repository on the `main` Branch

**❗❗❗ ONCE MORE: SWITCH TO THE `main` BRANCH AND UPDATE IT❗❗❗**

```
git checkout main && git fetch && git pull
```

Create a tag and push it:

```
git tag @guineadog/<package-name>@<version>
git push origin @guineadog/<package-name>@<version>
```

_Example:_

```
git tag @guineadog/normalize-typography@0.3.0
git push origin @guineadog/normalize-typography@0.3.0
```

When you push a tag to GitHub, the `publish` workflow ([.github/workflows/publish.yml](.github/workflows/publish.yml)) will automatically build and publish the package to NPM (https://www.npmjs.com/): check https://github.com/GuineaDog/GuineaDog/actions/workflows/publish.yml

Since these packages are under the `@guineadog` scope, we must use the `--access public` flag. We also use the `--provenance` flag to provide a verifiable link between the package and its source code. Both flags are specified in the `publish` workflow mentioned above.
