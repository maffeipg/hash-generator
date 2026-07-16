Create a modern, responsive Hash Generator web application using SvelteKit + TypeScript that is fully compatible with Cloudflare Pages and Cloudflare Workers.

Requirements:

## Tech Stack
- SvelteKit
- TypeScript
- @sveltejs/adapter-cloudflare
- Use Web Crypto API whenever possible.
- Do NOT use Node.js crypto module.
- Do NOT require any backend server.
- Everything should work on Cloudflare Pages.

## Features

Provide these hash algorithms:

- SHA-1
- SHA-256
- SHA-384
- SHA-512

If MD5 is implemented, use a lightweight browser-compatible library since Web Crypto API does not support MD5.

The application must support:

- Text input
- Real-time hash generation
- Copy hash button
- Clear button
- Character counter
- UTF-8 encoding

## UI

Create a clean modern interface.

Layout:

Header
- App name
- Short description

Main Card
- Algorithm selector
- Large textarea
- Generated hash output
- Copy button
- Clear button

Footer
- Powered by SvelteKit
- Cloudflare Pages compatible

## UX

- Responsive desktop/mobile
- Fast
- No page reload
- Hash updates instantly while typing
- Loading state when generating very large text
- Copy confirmation toast
- Accessible keyboard navigation

## Validation

- Empty input should produce the correct hash of an empty string.
- Prevent application crashes.
- Gracefully handle unexpected errors.

## Code Quality

- Modular components
- Strong TypeScript typing
- Reusable utility functions
- Clean folder structure

Suggested structure:

src/
    lib/
        crypto/
            hash.ts
        utils/
    routes/
        +page.svelte
    components/
        HashForm.svelte
        OutputCard.svelte
        Toast.svelte

## Utility Functions

Create reusable functions such as:

generateHash(text, algorithm)

copyToClipboard()

bytesToHex()

## Performance

- Minimize bundle size
- Lazy load optional libraries
- Avoid unnecessary dependencies

## Styling

Use modern minimal styling.

Primary color:
#0ea5e9

Rounded corners
Soft shadows
Dark mode ready
Smooth transitions

## Deployment

Project must run with:

npm install
npm run dev
npm run build

Deployment target:

Cloudflare Pages

using:

@sveltejs/adapter-cloudflare

## Documentation

Generate:

README.md

containing:

- Installation
- Development
- Build
- Deploy to Cloudflare Pages
- Supported algorithms
- Browser compatibility

The generated code should be production-ready, clean, maintainable, and follow modern SvelteKit best practices.