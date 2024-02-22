# Handshake docs

Landing page and documentation for Handshake.

## Development

Install dependencies:

```bash
cd docs
pnpm i
```

Update `providers.json` file with data from `handshake/` library:

```bash
make
```

Run server:

```bash
pnpm dev
```

Deploy:

```bash
vercel --prod
```

Or fork this repo, create a Next.js project inside Vercel and set this folder as root.
