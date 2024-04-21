<script>
	export let startTimer;
	let timerStr = '00:00:00';
	let timer;
	let totalSeconds = 0;

	$: {
		if (startTimer) {
			// console.log('Timer Stared');
			clearTimer(false);
		} else {
			// console.log('Timer Stopped');
			clearTimer(true);
		}
	}

	function clearTimer(stop) {
		if (stop) {
			clearInterval(timer);
		} else {
			timer = setInterval(countTimer, 1000);
		}
	}

	function countTimer() {
		++totalSeconds;
		let hour = Math.floor(totalSeconds / 3600);
		let minute = Math.floor((totalSeconds - hour * 3600) / 60);
		let seconds = totalSeconds - (hour * 3600 + minute * 60);
		if (hour < 10) hour = '0' + hour;
		if (minute < 10) minute = '0' + minute;
		if (seconds < 10) seconds = '0' + seconds;
		timerStr = hour + ':' + minute + ':' + seconds;
	}
</script>

<main>
	<div id="worked-hours" {startTimer}>
		<p>Total work hours today:</p>
		<p id="timer">{timerStr}</p>
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
