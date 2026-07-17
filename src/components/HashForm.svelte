<script lang="ts">
  import OutputCard from "./OutputCard.svelte";
  import Toast from "./Toast.svelte";
  import * as Card from "$components/ui/card";
  import * as Select from "$components/ui/select";
  import { Textarea } from "$components/ui/textarea";
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

<Card.Root class="grid gap-5 p-4 md:grid-cols-2 md:p-5">
  <div class="grid gap-4">
    <div class="space-y-2">
      <label class="text-sm font-medium" for="algorithm">Algorithm</label>
      <Select.Root type="single" bind:value={algorithm}>
        <Select.Trigger id="algorithm" class="w-full">
          <span>{algorithm}</span>
        </Select.Trigger>
        <Select.Content>
          {#each SUPPORTED_ALGORITHMS as item}
            <Select.Item value={item} label={item}>{item}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </div>

    <div class="space-y-2">
      <label class="text-sm font-medium" for="input-text">Input text</label>
      <Textarea
        id="input-text"
        bind:value={text}
        placeholder="Type or paste text here..."
        class="min-h-[14rem] md:min-h-[16rem]"
        aria-describedby="character-count"
      />
    </div>

    <div
      class="flex items-center justify-between gap-3 text-sm text-muted-foreground"
    >
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
</Card.Root>

<Toast visible={copyToastVisible} message="Hash copied to clipboard" />
