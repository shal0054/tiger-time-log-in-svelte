<script>
	import TodaysDate from './TodaysDate.svelte';
	import Clock from './Clock.svelte';
	import Timer from './Timer.svelte';
	import DayActivity from './DayActivity.svelte';
	import Button from './Button.svelte';
	import SubmitModal from './SubmitModal.svelte';

	let btnState = 'start'; // start | end | submit
	let dayStartTime = '-:-';
	let dayEndTime = '-:-';
	let showModal = false;
	let bgColor = '#fff201';
	let btnText = 'Start Your Day';
	let startTimer = false;
	let formate12 = false;

	const toggleTimeFormate = () => {
		formate12 = !formate12;
		formateTime();
	};

	const formateTime = () => {
		let hours = dayStartTime.split(':')[0];
		let minutes = dayStartTime.split(':')[1].substring(0, 2).padStart(2, '0');
		let amPm = dayStartTime.split(':')[1].substring(3, 5);
		if (formate12 && dayStartTime !== '-:-' && !amPm) {
			amPm = hours >= 12 ? 'PM' : 'AM';
			hours = hours % 12;
			hours = hours ? hours : 12; // hour 0 will be 12
			hours = hours.toString();
			dayStartTime = `${hours}:${minutes} ${amPm}`;
		} else if (!formate12 && dayStartTime !== '-:-' && amPm) {
			const [timeWithoutPeriod, period] = dayStartTime.split(' ');
			hours = timeWithoutPeriod.split(':')[0];
			if (period === 'PM' && hours !== '12') {
				hours = String(Number(hours) + 12);
			}
			if (period === 'AM' && hours === '12') {
				hours = '00';
			}
			dayStartTime = `${hours.padStart(2, '0')}:${minutes}`;
		}
	};

	const getTime = () => {
		const now = new Date();
		let hours;
		let minutes = now.getMinutes().toString().padStart(2, '0');

		if (formate12) {
			hours = now.getHours();
			return `${hours}:${minutes}`;
		} else {
			hours = now.getHours().toString().padStart(2, '0');
			return `${hours}:${minutes}`;
		}
	};

	function buttonClick() {
		// send info for the new state of the button back to the button
		// capture the time the button was clicked and send it to
		// update btnState
		switch (btnState) {
			case 'start':
				startTimer = true;
				bgColor = 'red';
				btnText = 'End Your Day';
				dayStartTime = getTime();
				console.log('start time:', dayStartTime);
				formateTime();
				btnState = 'end';
				break;
			case 'end':
				startTimer = false;
				// present confirmation modal
				bgColor = 'green';
				btnText = 'Submit Your Day';
				dayEndTime = getTime();
				btnState = 'submit';
				break;
			case 'submit':
				showModal = true;
				bgColor = '#FFF201';
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
	<DayActivity {dayStartTime} {dayEndTime} />
	<Button on:click={buttonClick} {bgColor} {btnText} />
</main>

<style>
</style>
