# @guineadog/normalize-typography

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

### CLI Options

You can use the full command `normalize-typography` or the shortened alias: `nrm-tpgr`.

#### Auto-fix everything (respects `.prettierignore`)

```
npx @guineadog/normalize-typography
```

#### Only check (lint mode)

```
npx @guineadog/normalize-typography --check
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

## License

MIT
