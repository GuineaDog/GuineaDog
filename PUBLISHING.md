# Package Publishing Guide

This monorepo uses NPM workspaces to manage packages. Below is the process for updating and publishing new versions.

## 1. Preparation and Verification

Before publishing, ensure the package builds correctly and all tests pass - check commands in the [Quick Start Guide](QUICKSTART.md).

## 2. Update Changelog

Update the `CHANGELOG.md` file in the package directory (`packages/<package-name>/CHANGELOG.md`) with the new version and changes.

## 3. Version Update

Update the version in the package's `package.json` and the root `package-lock.json`.

```
npm version <patch|minor|major> -w packages/<package-name>
```

_Example:_

```
npm version minor -w packages/normalize-typography
```

## 4. Committing Changes to Git

When using workspaces, `npm version` updates the files but often does not create a commit or tag automatically. This must be done manually:

```
# Create a commit
git commit -m "chore(release): <package-name> v<version>"

# Create a tag (recommended format: package@version)
git tag <package-name>@<version>
```

_Example:_

```
git commit -m "chore(release): @guineadog/normalize-typography v0.3.0"

git tag @guineadog/normalize-typography@0.3.0
```

## 5. Publishing to NPM

Since these packages are under the `@guineadog` scope, you must use the `--access public` flag to publish to the public registry.

```
cd ./packages/<package-name>/ && npm run clean && cd ../../
npm publish -w packages/<package-name> --access public
```

_Example:_

```
cd ./packages/normalize-typography/ && npm run clean && cd ../../
npm publish -w packages/normalize-typography --access public
```

## 6. Completion

Push the commit and tags to the remote repository:

```
git push origin main --tags
```

---

**Tip:** Make sure you are logged into NPM (`npm login`) before attempting to publish.
