# @guineadog/normalize-typography

A CLI tool to replace non-standard typography with standard ASCII equivalents. It targets common "smart" characters often introduced by word processors or copy-pasting from styled text.

## What it fixes:
- **Dashes:** Replaces `—` (em dash), `–` (en dash), `‒`, `―` with `-`.
- **Double Quotes:** Replaces `“` and `”` with `"`.
- **Single Quotes:** Replaces `‘` and `’` with `'`.

## Installation

```bash
npm install -g @guineadog/normalize-typography
```

## Usage

You can use the full command or the shortened alias: `nrm-tpgr`.

### Auto-fix everything (respects `.prettierignore`)

```bash
npx @guineadog/normalize-typography
# or after global install:
nrm-tpgr
```

### Only check (lint mode)

```bash
npx @guineadog/normalize-typography --check
```

### Specific files

```bash
npx @guineadog/normalize-typography src/index.js README.md
```

## License

MIT
