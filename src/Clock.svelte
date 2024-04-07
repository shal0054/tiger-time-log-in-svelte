<script>
	let now = new Date();
	let hours = now.getHours().toString();
	let formate12 = false;
	let amPm;

	$: {
		if (formate12) {
			hours = now.getHours();
			hours = hours % 12;
			hours = hours ? hours : 12; // hour 0 will be 12
			hours = hours.toString();
		} else {
			hours = now.getHours().toString().padStart(2, '0');
		}
	}

	setInterval(() => {
		now = new Date();
	}, 1000);

	function toggleTimeFormate() {
		formate12 = !formate12;
		if (formate12) {
			amPm = hours >= 12 ? 'PM' : 'AM';
			hours = hours % 12;
			hours = hours ? hours : 12; // hour 0 will be 12
			hours = hours.toString();
		} else {
			hours = now.getHours().toString().padStart(2, '0');
		}
	}
</script>

<main>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div id="clock" on:click={toggleTimeFormate}>
		<span id="current-hours">{hours}</span><span id="colon">:</span><span
			id="current-minutes">{now.getMinutes().toString().padStart(2, '0')}</span
		>
		{#if formate12}
			<span id="am-pm">{amPm}</span>
		{/if}
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Moul&display=swap');
	/* TODO: text-shadow and imported font not working */

	#clock {
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
