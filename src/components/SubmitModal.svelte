<script>
	import { times, format12 } from '../stores';

	export let showModal = false;

	let startTimeStr;
	let endTimeStr;

	$: {
		startTimeStr = $times.dayStartTimeObj
			? $times.dayStartTimeObj.toLocaleTimeString('en-US', {
					hour: 'numeric',
					minute: 'numeric',
					hour12: $format12,
				})
			: '-:-';
		endTimeStr = $times.dayEndTimeObj
			? $times.dayEndTimeObj.toLocaleTimeString('en-US', {
					hour: 'numeric',
					minute: 'numeric',
					hour12: $format12,
				})
			: '-:-';
	}
</script>

{#if showModal}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="backdrop" on:click|self={() => (showModal = !showModal)}>
		<div class="modal">
			<header>
				<h2>Submit Your Day</h2>
			</header>
			<body>
				<h4>Start time:</h4>
				<p>{startTimeStr}</p>
				<h4>End time:</h4>
				<p>{endTimeStr}</p>
				<h4>breaks:</h4>
				<p>-:-</p>
				<h4>Total hours:</h4>
				<p>-:-</p>
				<footer>
					<button on:click|self={() => (showModal = !showModal)}>Cancel</button>
					<button>Submit</button>
				</footer>
			</body>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		width: 100%;
		height: 100%;
		top: 0;
		position: fixed;
		background-color: rgba(0, 0, 0, 0.7);
		text-align: center;
		z-index: 1;
	}

	.modal {
		padding: 10px;
		border-radius: 10px;
		max-width: 76%;
		margin: 25% auto;
		background-color: white;
	}
</style>
