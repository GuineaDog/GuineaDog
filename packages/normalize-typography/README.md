# @guineadog/normalize-typography

<p align="center">
  <a href="https://www.npmjs.com/package/@guineadog/normalize-typography">
    <img src="https://img.shields.io/npm/v/@guineadog/normalize-typography.svg?logo=npm" alt="npm version">
  </a>
  <a href="https://github.com/GuineaDog/GuineaDog/actions/workflows/ci.yml">
    <img src="https://github.com/GuineaDog/GuineaDog/actions/workflows/ci.yml/badge.svg" alt="CI">
  </a>
  <a href="https://www.npmjs.com/package/@guineadog/normalize-typography">
    <img src="https://img.shields.io/npm/dm/@guineadog/normalize-typography?logo=npm" alt="npm downloads">
  </a>
  <a href="https://bundlephobia.com/package/@guineadog/normalize-typography">
    <img src="https://img.shields.io/bundlephobia/min/@guineadog/normalize-typography" alt="minified size">
  </a>
  <a href="https://socket.dev/npm/package/@guineadog/normalize-typography">
    <img src="https://badge.socket.dev/npm/package/@guineadog/normalize-typography/latest" alt="Socket Badge">
  </a>
  <a href="https://www.npmjs.com/package/@guineadog/normalize-typography">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript logo">
  </a>
  <a href="https://nodejs.org">
    <img src="https://img.shields.io/node/v/@guineadog/normalize-typography?logo=Node.js" alt="Node.js Version">
  </a>
</p>

A CLI tool to replace non-standard typography with standard ASCII equivalents. It targets common "smart" characters often introduced by word processors or copy-pasting from styled text.

## What it fixes:

- **Dashes:** Replaces `—` (em dash), `–` (en dash), `‒`, `―` with `-`.
- **Double Quotes:** Replaces `“` and `”` with `"`.
- **Single Quotes:** Replaces `‘` and `’` with `'`.

## Installation

### As a dev dependency (recommended)

It is best to install the tool locally in your project as a dev dependency:

```
npm install --save-dev @guineadog/normalize-typography
```

**Why local?**
- **Easy Automation:** You can use the short alias `nrm-tpgr` or `normalize-typography` directly in your `package.json` scripts without needing `npx`.
- **Team Consistency:** The tool is automatically installed for everyone on the team when they run `npm install`.
- **Version Control:** Everyone uses the same version of the tool, preventing "works on my machine" issues.

### Run without installation

You can run it directly using `npx`:

```
npx @guineadog/normalize-typography
```

## Usage

If installed locally, you can add it to your `package.json` scripts:

```json
{
  "scripts": {
    "format:typography": "normalize-typography",
    "lint:typography": "normalize-typography --check"
  }
}
```

Then run it using your package manager:

```
npm run format:typography
```

Result:

```
🔍 Searching for non-standard typography (dashes, smart quotes)...
path/fixme.txt       ✅ Fixed
fixme.ts       ✅ Fixed
ok.ts

✅ Fixed:
path/fixme.txt
fixme.txt
```

### CLI Options

You can use the full command `normalize-typography` or the shortened alias: `nrm-tpgr`.

#### Auto-fix everything (respects `.gitignore` and `.prettierignore`)

```
npx @guineadog/normalize-typography
```

#### Only check (lint mode)

```
npx @guineadog/normalize-typography --check
```

Result:

```
🔍 Searching for non-standard typography (dashes, smart quotes)...
path/fixme.txt       ❗ Warning: Non-standard typography found.
fixme.ts       ❗ Warning: Non-standard typography found.
ok.ts

❗ Warning: Non-standard typography found. Use "npx normalize-typography" to auto-fix it:
path/fixme.txt
fixme.txt
```

#### Specific files

```
npx @guineadog/normalize-typography src/index.js README.md
```

### Update

To update the tool to the latest version:

#### Local installation
```
npm install --save-dev @guineadog/normalize-typography@latest
```

#### Global installation
```
npm install -g @guineadog/normalize-typography@latest
```

## Known issues

None.

## Roadmap

- Add config file (https://github.com/GuineaDog/GuineaDog/issues/4)

## Changelog

See the [CHANGELOG](./CHANGELOG.md) for a history of changes.

## Contributing

Please refer to the [CONTRIBUTING.md](../../CONTRIBUTING.md) file for information on how to report bugs, suggest features, or submit pull requests.

## License

This project is licensed under the [MIT License](../../LICENSE).

<p align="left">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
  </a>
</p>
