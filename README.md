# Nerd Saturn Hash Generator

A modern, responsive browser-based hash generator built with SvelteKit, TypeScript, and Cloudflare Pages.

## Installation

```sh
npm install
```

## Development

```sh
npm run dev
```

To open it in a browser tab:

```sh
npm run dev -- --open
```

## Build

```sh
npm run build
```

## Deploy to Cloudflare Pages

1. Push this project to a Git provider.
2. Create a Cloudflare Pages project and connect the repository.
3. Set the build command to:

```sh
npm run build
```

4. Use the project’s Cloudflare Pages adapter and deploy the generated production output.

## Supported algorithms

- SHA-1
- SHA-256
- SHA-384
- SHA-512

## Browser compatibility

This app uses the Web Crypto API for the supported SHA algorithms, which is available in modern evergreen browsers. The UI is fully client-side and works on Cloudflare Pages without a backend server.
# hash-generator
