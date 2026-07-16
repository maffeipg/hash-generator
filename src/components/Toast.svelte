<script lang="ts">
	let { visible = false, message = '' } = $props<{
		visible?: boolean;
		message?: string;
	}>();
</script>

{#if visible}
	<div class="toast" role="status" aria-live="polite" aria-atomic="true">
		{message}
	</div>
{/if}

<style>
	.toast {
		position: fixed;
		bottom: 1.25rem;
		right: 1.25rem;
		padding: 0.75rem 1rem;
		border-radius: 0.9rem;
		background: #0f172a;
		color: #f8fafc;
		box-shadow: 0 14px 32px rgba(15, 23, 42, 0.24);
		font-size: 0.92rem;
		z-index: 20;
		animation: toastIn 140ms ease;
	}

	@keyframes toastIn {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
