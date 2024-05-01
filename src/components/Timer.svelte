<script>
	import { startTimer, totalSecondsWorked } from '../stores';

	let timerStr = '00:00:00';
	let timer;

	$: {
		if ($startTimer) clearTimer(false);
		else clearTimer(true);
	}

	function clearTimer(stop) {
		if (stop) {
			clearInterval(timer);
		} else {
			timer = setInterval(countTimer, 1000);
		}
	}

	function countTimer() {
		totalSecondsWorked.set(++$totalSecondsWorked);
		let hour = Math.floor($totalSecondsWorked / 3600);
		let minute = Math.floor(($totalSecondsWorked - hour * 3600) / 60);
		let seconds = $totalSecondsWorked - (hour * 3600 + minute * 60);
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
