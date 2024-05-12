<script>
	import { editing, format12, times } from '../stores';
	import { onMount } from 'svelte';

	let now = new Date();
	let amPm;
	let currentTime;

	onMount(() => {
		currentTime = now.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: $format12,
		});
		amPm = currentTime.slice(-1) === 'M' ? currentTime.slice(-2) : '';
	});

	setInterval(() => {
		now = new Date();
		currentTime = now.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: $format12,
		});
		amPm = currentTime.slice(-1) === 'M' ? currentTime.slice(-2) : '';
	}, 1000);

	function toggleClockFormate() {
		if ($editing) return;

		if ($format12) {
			format12.set(false);
		} else {
			format12.set(true);
		}

		currentTime = now.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: $format12,
		});
		amPm = currentTime.slice(-1) === 'M' ? currentTime.slice(-2) : '';
	}
</script>

<main>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div id="clock" on:click={toggleClockFormate}>
		{#if $format12 && currentTime}
			<span id="current-time">{currentTime.slice(0, -3)}</span>
		{:else}
			<span id="current-time">{currentTime}</span>
		{/if}
		{#if $format12 && currentTime}
			<span id="am-pm">{amPm}</span>
		{/if}
	</div>
</main>

<style>
	#clock {
		margin: 0;
		text-align: center;
		font-family: 'Moul', serif;
		font-size: 15vw;
		font-weight: 400;
		font-style: normal;
	}

	#clock span {
		text-shadow: 0 0 80px #fff201;
	}

	#am-pm {
		font-size: 5vw;
	}
</style>
