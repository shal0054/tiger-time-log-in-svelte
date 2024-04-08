<script>
	export let showModal = false;
</script>

{#if showModal}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="backdrop"
		class:showModal
		on:click={() => (showModal = !showModal)}
	>
		<div class="modal">
			<p>Submit Your Day</p>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: rgba(0, 0, 0, 0.7);
		text-align: center;
	}

	.modal {
		padding: 10px;
		border-radius: 10px;
		max-width: 80%;
		margin: 35% auto;
		background-color: white;
	}
</style>
