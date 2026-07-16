<script lang="ts">
  import HashForm from "../components/HashForm.svelte";

  const currentYear = new Date().getFullYear();
</script>

<svelte:head>
  <title>Nerd Saturn Hash Generator</title>
  <meta
    name="description"
    content="A fast, responsive browser-based hash generator built with SvelteKit, TypeScript, and Cloudflare Pages."
  />
</svelte:head>

<div class="page-shell">
  <header class="app-header">
    <div>
      <h1>Hash Generator</h1>
      <p class="subtitle">
        Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly in your
        browser.
      </p>
    </div>
  </header>

  <main>
    <HashForm />
  </main>

  <footer class="app-footer">
    <p>{currentYear} All Right reserved</p>
  </footer>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: Inter, "Segoe UI", sans-serif;
    background: #f8fafc;
    color: #0f172a;
  }

  .page-shell {
    min-height: 100vh;
    padding: 1.5rem;
    max-width: 1120px;
    margin: 0 auto;
    display: grid;
    gap: 1.5rem;
    align-content: start;
  }

  .app-header {
    padding: 0.5rem 0 0;
  }

  h1 {
    margin: 0;
    font-size: clamp(2.1rem, 4vw, 3rem);
    line-height: 1.05;
    letter-spacing: -0.04em;
  }

  .subtitle {
    margin: 0.65rem 0 0;
    color: #475569;
    max-width: 42rem;
    font-size: 1rem;
    line-height: 1.6;
  }

  .app-footer {
    padding: 1.5rem 0 0.5rem;
    text-align: center;
    color: #64748b;
    font-size: 0.9rem;
    letter-spacing: 0.01em;
  }

  @media (max-width: 640px) {
    .page-shell {
      padding: 1rem;
      gap: 1rem;
    }

    .subtitle {
      font-size: 0.95rem;
    }
  }
</style>
