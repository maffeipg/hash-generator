<script lang="ts">
  let { visible = false, message = "" } = $props<{
    visible?: boolean;
    message?: string;
  }>();
</script>

{#if visible}
  <div
    class="fixed bottom-5 right-5 z-50 rounded-lg border border-border bg-slate-950 px-4 py-3 text-sm text-white shadow-lg"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    {message}
  </div>
{/if}
