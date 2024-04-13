<script>
	import TodaysDate from './TodaysDate.svelte';
	import Clock from './Clock.svelte';
	import Timer from './Timer.svelte';
	import DayActivity from './DayActivity.svelte';
	import Button from './Button.svelte';
	import SubmitModal from './SubmitModal.svelte';

	let btnState = 'start'; // start | end | submit
	let dayStartTimeObj;
	let dayStartTimeStr = '-:-';
	let dayEndTimeObj;
	let dayEndTimeStr = '-:-';
	let showModal = false;
	let bgColor = '#fff201';
	let shadowColor = '#bfc01099';
	let btnText = 'Start Your Day';
	let startTimer = false;
	let formate12 = false;

	const toggleTimeFormate = () => {
		formate12 = !formate12;
		if (dayStartTimeObj) {
			dayStartTimeStr = formateTime(dayStartTimeObj);
		}
		if (dayEndTimeObj) {
			dayEndTimeStr = formateTime(dayEndTimeObj);
		}
	};

	const formateTime = timeObj => {
		let hours = timeObj.getHours();
		let minutes = timeObj.getMinutes().toString().padStart(2, '0');
		if (formate12) {
			let amPm = hours >= 12 ? 'PM' : 'AM';
			hours = hours % 12;
			hours = hours ? hours : 12; // hour 0 will be 12
			hours = hours.toString();
			return `${hours}:${minutes} ${amPm}`;
		} else {
			return `${hours.toString().padStart(2, '0')}:${minutes}`;
		}
	};

	function buttonClick() {
		// send info for the new state of the button back to the button
		// capture the time the button was clicked and send it to DayActivity
		// update btnState
		switch (btnState) {
			case 'start':
				startTimer = true;
				bgColor = 'red';
				shadowColor = '#c0101099';
				btnText = 'End Your Day';
				dayStartTimeObj = new Date();
				dayStartTimeStr = formateTime(dayStartTimeObj);
				btnState = 'end';
				break;
			case 'end':
				startTimer = false;
				// present confirmation modal
				bgColor = 'green';
				shadowColor = '#10c01099';
				btnText = 'Submit Your Day';
				dayEndTimeObj = new Date();
				dayEndTimeStr = formateTime(dayEndTimeObj);
				btnState = 'submit';
				break;
			case 'submit':
				showModal = true;
				bgColor = '#FFF201';
				shadowColor = '#bfc01099';
				btnText = 'Start Your Day';
				// submitDay();
				btnState = 'start';
				break;
		}
	}
</script>

<SubmitModal {showModal} />

<main>
	<TodaysDate />
	<Clock on:click={toggleTimeFormate} {formate12} />
	<Timer {startTimer} />
	<DayActivity {dayStartTimeStr} {dayEndTimeStr} />
	<Button on:click={buttonClick} {bgColor} {btnText} {shadowColor} />
</main>

<style>
</style>
