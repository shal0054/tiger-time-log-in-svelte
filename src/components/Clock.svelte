<script>
	import { editing, formate12, times } from '../stores';
	import { onMount } from 'svelte';

	let now = new Date();
	let amPm;
	let currentTime;

	onMount(async () => {
		currentTime = await $times.formateTime(now, $formate12);
		amPm = currentTime.slice(-1) === 'M' ? currentTime.slice(-2) : '';
	});

	setInterval(async () => {
		now = new Date();
		currentTime = await $times.formateTime(now, $formate12);
		amPm = currentTime.slice(-1) === 'M' ? currentTime.slice(-2) : '';
	}, 1000);

	function toggleClockFormate() {
		if ($editing) return;

		if ($formate12) {
			formate12.set(false);
		} else {
			formate12.set(true);
		}

		currentTime = $times.formateTime(now, $formate12);
		amPm = currentTime.slice(-1) === 'M' ? currentTime.slice(-2) : '';
	}
</script>

<main>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div id="clock" on:click={toggleClockFormate}>
		{#if $formate12 && currentTime}
			<span id="current-time">{currentTime.slice(0, -3)}</span>
		{:else}
			<span id="current-time">{currentTime}</span>
		{/if}
		{#if $formate12 && currentTime}
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
