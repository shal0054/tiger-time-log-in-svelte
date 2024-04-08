<script>
	export let startTimer = false;
	let timer = '00:00:00';
	let totalSeconds = 0;

	$: {
		if (startTimer) {
			timer = setInterval(countTimer, 1000);
		} else {
			clearInterval(timer);
		}

		function countTimer() {
			++totalSeconds;
			let hour = Math.floor(totalSeconds / 3600);
			let minute = Math.floor((totalSeconds - hour * 3600) / 60);
			let seconds = totalSeconds - (hour * 3600 + minute * 60);
			if (hour < 10) hour = '0' + hour;
			if (minute < 10) minute = '0' + minute;
			if (seconds < 10) seconds = '0' + seconds;
			document.getElementById('timer').innerHTML =
				hour + ':' + minute + ':' + seconds;
		}
	}
</script>

<main>
	<div id="worked-hours">
		<p>Total work hours today:</p>
		<p id="timer">{timer}</p>
	</div>
</main>

<style>
	#worked-hours {
		display: flex;
		justify-content: space-between;
		width: 80%;
		margin: auto;
	}
</style>
