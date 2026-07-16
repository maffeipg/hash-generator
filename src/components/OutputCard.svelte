<script lang="ts">
  let {
    hash = "",
    algorithm = "SHA-256",
    isLoading = false,
    onCopy,
    onClear,
    error = "",
  } = $props<{
    hash?: string;
    algorithm?: string;
    isLoading?: boolean;
    onCopy?: () => void;
    onClear?: () => void;
    error?: string;
  }>();

  const lengthByAlgorithm: Record<string, number> = {
    "SHA-1": 40,
    "SHA-256": 64,
    "SHA-384": 96,
    "SHA-512": 128,
  };

  const digestLength = $derived(lengthByAlgorithm[algorithm] ?? hash.length);
  const displayLength = $derived(`${digestLength} hex characters`);
</script>

<section class="output-card" aria-label="Generated hash output">
  <div class="output-header">
    <h2>Generated hash</h2>
    <span class="status-pill" aria-live="polite">
      {isLoading ? "Generating…" : "Ready"}
    </span>
  </div>

  <div class="hash-output" class:has-content={Boolean(hash)} aria-label="Hash output text">
    {#if error}
      <p class="error-message">{error}</p>
    {:else if hash}
      <output>{hash}</output>
    {:else}
      <p class="placeholder">Your hash will appear here.</p>
    {/if}
  </div>

  <div class="meta-row" aria-label="Hash metadata">
    <span>{algorithm}</span>
    <span>•</span>
    <span>{displayLength}</span>
  </div>

  <div class="action-row">
    <button
      class="primary"
      type="button"
      disabled={!hash || isLoading}
      onclick={onCopy}
    >
      Copy hash
    </button>
    <button class="secondary" type="button" disabled={!hash} onclick={onClear}>
      Clear
    </button>
  </div>
</section>

<style>
  .output-card {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }

  .output-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    min-height: 1.75rem;
  }

  .output-header h2 {
    margin: 0;
    font-size: 1rem;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: #0f172a;
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.22rem 0.55rem;
    border-radius: 999px;
    background: #dcfce7;
    color: #166534;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    flex-shrink: 0;
  }

  .hash-output {
    min-height: 10rem;
    padding: 1.25rem;
    border-radius: 0.95rem;
    background: #0f172a;
    border: 1px solid #1e293b;
    color: #e2e8f0;
    font-family: "JetBrains Mono", "Fira Code", Consolas, monospace;
    font-size: 0.95rem;
    line-height: 1.7;
    word-break: break-all;
    overflow-wrap: anywhere;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
  }

  .hash-output.has-content {
    align-items: flex-start;
    justify-content: flex-start;
  }

  .hash-output output {
    display: block;
    width: 100%;
    white-space: pre-wrap;
    user-select: text;
    animation: hashFade 140ms ease;
  }

  .placeholder,
  .error-message {
    margin: 0;
    line-height: 1.6;
    animation: hashFade 140ms ease;
  }

  .placeholder {
    color: #94a3b8;
    text-align: center;
  }

  .error-message {
    color: #fca5a5;
    text-align: left;
  }

  .meta-row {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    color: #64748b;
    font-size: 0.8rem;
    letter-spacing: 0.01em;
  }

  .action-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  button {
    min-height: 2.85rem;
    border: 1px solid transparent;
    border-radius: 0.8rem;
    padding: 0.78rem 1rem;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition:
      transform 140ms ease,
      opacity 140ms ease,
      box-shadow 140ms ease,
      background-color 140ms ease,
      border-color 140ms ease;
  }

  button:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  button:active:not(:disabled) {
    transform: translateY(0);
  }

  button:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.18);
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  .primary {
    background: #0ea5e9;
    color: #ffffff;
  }

  .primary:hover:not(:disabled) {
    background: #0284c7;
  }

  .secondary {
    background: #e2e8f0;
    color: #0f172a;
    border-color: #cbd5e1;
  }

  .secondary:hover:not(:disabled) {
    background: #cbd5e1;
  }

  @keyframes hashFade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 640px) {
    .output-card {
      gap: 0.8rem;
    }

    .hash-output {
      min-height: 7rem;
      padding: 1rem;
    }

    .meta-row {
      flex-wrap: wrap;
    }

    .action-row {
      flex-direction: column;
    }

    button {
      width: 100%;
    }
  }
</style>
