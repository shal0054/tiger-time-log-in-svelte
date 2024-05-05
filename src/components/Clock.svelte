<script>
	import { editing, formate12 } from '../stores';

	let now = new Date();
	let hours = now.getHours().toString();
	let amPm = hours >= 12 ? 'PM' : 'AM';

	setInterval(() => {
		now = new Date();
	}, 1000);

	function toggleClockFormate() {
		if ($editing) return;

		if ($formate12) {
			amPm = hours >= 12 ? 'PM' : 'AM';
			hours = hours % 12;
			hours = hours ? hours : 12; // hour 0 will be 12
			hours = hours.toString();
			formate12.set(false);
		} else {
			hours = now.getHours().toString().padStart(2, '0');
			formate12.set(true);
		}
	}
</script>

<main>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div id="clock" on:click={toggleClockFormate}>
		<span id="current-hours">{hours}:</span><span id="current-minutes"
			>{now.getMinutes().toString().padStart(2, '0')}</span
		>
		{#if $formate12}
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
