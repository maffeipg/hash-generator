<script lang="ts">
  import OutputCard from "./OutputCard.svelte";
  import Toast from "./Toast.svelte";
  import {
    copyToClipboard,
    countCharacters,
    generateHash,
    SUPPORTED_ALGORITHMS,
    type HashAlgorithm,
  } from "$lib/crypto/hash";

  let text = $state("");
  let algorithm = $state<HashAlgorithm>("SHA-256");
  let hash = $state("");
  let isGenerating = $state(false);
  let copyToastVisible = $state(false);
  let error = $state("");

  let latestRun = 0;
  const largeTextThreshold = 5000;

  $effect(() => {
    void updateHash();
  });

  async function updateHash(): Promise<void> {
    const runId = ++latestRun;

    if (text.length === 0) {
      if (runId === latestRun) {
        hash = "";
        error = "";
        isGenerating = false;
      }
      return;
    }

    isGenerating = text.length > largeTextThreshold;
    error = "";

    try {
      const nextHash = await generateHash(text, algorithm);
      if (runId !== latestRun) {
        return;
      }
      hash = nextHash;
    } catch (caughtError) {
      if (runId !== latestRun) {
        return;
      }
      hash = "";
      error =
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to generate the requested hash.";
    } finally {
      if (runId === latestRun) {
        isGenerating = false;
      }
    }
  }

  async function handleCopy(): Promise<void> {
    if (!hash) {
      return;
    }

    try {
      await copyToClipboard(hash);
      copyToastVisible = true;
      window.setTimeout(() => {
        copyToastVisible = false;
      }, 1800);
    } catch (caughtError) {
      error =
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to copy the hash.";
    }
  }

  function handleClear(): void {
    text = "";
    hash = "";
    error = "";
    copyToastVisible = false;
  }
</script>

<section class="layout-card" aria-label="Hash generator form">
  <div class="control-panel">
    <label class="field-label" for="algorithm">Algorithm</label>
    <select
      id="algorithm"
      bind:value={algorithm}
      aria-label="Select hash algorithm"
    >
      {#each SUPPORTED_ALGORITHMS as item}
        <option value={item}>{item}</option>
      {/each}
    </select>

    <label class="field-label" for="input-text">Input text</label>
    <textarea
      id="input-text"
      bind:value={text}
      placeholder="Type or paste text here..."
      rows="10"
      aria-describedby="character-count"
    ></textarea>

    <div class="meta-row">
      <p id="character-count">Characters: {countCharacters(text)}</p>
      <p>UTF-8 encoded in the browser</p>
    </div>
  </div>

  <OutputCard
    {hash}
    {algorithm}
    isLoading={isGenerating}
    {error}
    onCopy={handleCopy}
    onClear={handleClear}
  />
</section>

<Toast visible={copyToastVisible} message="Hash copied to clipboard" />

<style>
  .layout-card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 2rem;
    align-items: start;
    padding: 1rem;
    background: #ffffff;
    border: 1px solid #dbe6f0;
    border-radius: 1.25rem;
    box-shadow: 0 12px 35px rgba(15, 23, 42, 0.06);
  }

  .control-panel {
    display: grid;
    align-content: start;
    gap: 0.75rem;
    padding: 0.1rem 0;
    max-width: 26rem;
  }

  .field-label {
    display: block;
    font-size: 0.92rem;
    font-weight: 700;
    color: #0f172a;
  }

  select,
  textarea {
    width: 100%;
    max-width: 27rem;
    border: 1px solid #bfd0df;
    border-radius: 0.9rem;
    padding: 0.9rem 1rem;
    font: inherit;
    font-size: 0.96rem;
    line-height: 1.5;
    background: #f8fafc;
    color: #0f172a;
    transition:
      border-color 140ms ease,
      box-shadow 140ms ease,
      background-color 140ms ease;
  }

  select {
    width: 100%;
    height: 3rem;
    min-height: 3rem;
  }

  textarea {
    width: 100%;
    resize: vertical;
    height: 12rem;
    min-height: 12rem;
    font-family: inherit;
  }

  select:focus,
  textarea:focus {
    outline: none;
    border-color: #0ea5e9;
    box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15);
    background: #ffffff;
  }

  .meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem 1rem;
    flex-wrap: wrap;
    color: #64748b;
    font-size: 0.9rem;
    margin-top: 0.2rem;
  }

  .meta-row p {
    margin: 0;
  }

  @media (max-width: 820px) {
    .layout-card {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    textarea {
      height: 14rem;
      min-height: 14rem;
    }
  }
</style>
