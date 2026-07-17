<script lang="ts">
  import HashForm from "../components/HashForm.svelte";
  import * as Card from "$components/ui/card";
  import { Badge } from "$components/ui/badge";

  const currentYear = new Date().getFullYear();
</script>

<svelte:head>
  <title>Nerd Saturn Hash Generator</title>
  <meta
    name="description"
    content="A fast, responsive browser-based hash generator built with SvelteKit, TypeScript, and Cloudflare Pages."
  />
</svelte:head>

<div class="mx-auto grid min-h-screen max-w-6xl gap-6 p-4 md:p-6">
  <Card.Root class="p-5 md:p-6">
    <Card.Header class="gap-3">
      <div class="space-y-3">
        <Badge variant="secondary">Browser-native</Badge>
        <div>
          <h1 class="text-4xl font-semibold tracking-tight md:text-5xl">
            Hash Generator
          </h1>
          <p class="mt-3 max-w-3xl text-sm text-muted-foreground md:text-base">
            Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly in
            your browser with a clean, modern interface.
          </p>
        </div>
      </div>
    </Card.Header>
  </Card.Root>

  <main>
    <HashForm />
  </main>

  <footer class="pt-1 text-center text-sm text-muted-foreground">
    <p>{currentYear} All rights reserved</p>
  </footer>
</div>
