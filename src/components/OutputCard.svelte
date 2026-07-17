<script lang="ts">
  import * as Card from "$components/ui/card";
  import { Badge } from "$components/ui/badge";
  import { Button } from "$components/ui/button";
  import { cn } from "$lib/utils.js";

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

<Card.Root class="flex h-full flex-col gap-4 p-4 md:p-5">
  <Card.Header class="flex-row items-center justify-between gap-3">
    <div class="space-y-1">
      <Card.Title>Generated hash</Card.Title>
      <Card.Description
        >Preview and copy the digest in one click.</Card.Description
      >
    </div>
    <Badge variant="secondary" aria-live="polite">
      {isLoading ? "Generating…" : "Ready"}
    </Badge>
  </Card.Header>

  <Card.Content
    class={cn(
      "mono flex min-h-[11rem] items-center justify-center rounded-xl border bg-muted/60 p-4 text-sm leading-7 text-foreground",
      hash && "items-start justify-start",
    )}
    aria-label="Hash output text"
  >
    {#if error}
      <p class="m-0 text-left text-destructive">{error}</p>
    {:else if hash}
      <output class="block w-full whitespace-pre-wrap break-all">{hash}</output>
    {:else}
      <p class="m-0 text-center text-muted-foreground">
        Your hash will appear here.
      </p>
    {/if}
  </Card.Content>

  <div class="flex items-center gap-2 text-xs text-muted-foreground">
    <span>{algorithm}</span>
    <span>•</span>
    <span>{displayLength}</span>
  </div>

  <div class="flex flex-col gap-3 sm:flex-row">
    <Button
      type="button"
      class="w-full sm:w-auto"
      disabled={!hash || isLoading}
      onclick={onCopy}
    >
      Copy hash
    </Button>
    <Button
      type="button"
      variant="secondary"
      class="w-full sm:w-auto"
      disabled={!hash}
      onclick={onClear}
    >
      Clear
    </Button>
  </div>
</Card.Root>
