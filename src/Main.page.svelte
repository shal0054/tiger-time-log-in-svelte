<script>
	import TodaysDate from './TodaysDate.svelte';
	import Clock from './Clock.svelte';
	import Timer from './Timer.svelte';
	import DayActivity from './DayActivity.svelte';
	import Button from './Button.svelte';
	import SubmitModal from './SubmitModal.svelte';

	let btnState = 'start'; // start | end | submit
	let dayStartTime = '--';
	let dayEndTime = '--';
	let showModal = false;
	let bgColor = '#fff201';
	let btnText = 'Start Your Day';

	console.log('btnState on mount:', btnState);

	function buttonClick() {
		// send info for the new state of the button back to the button
		// capture the time the button was clicked and send it to
		// update btnState
		switch (btnState) {
			case 'start':
				console.log('btnState on start:', btnState);
				// start day timer
				bgColor = 'red';
				btnText = 'End Your Day';
				dayStartTime = new Date();
				btnState = 'end';
				break;
			case 'end':
				console.log('btnState on end:', btnState);
				// pause day timer
				// present confirmation modal
				bgColor = 'green';
				btnText = 'Submit Your Day';
				dayEndTime = new Date();
				btnState = 'submit';
				break;
			case 'submit':
				console.log('btnState on submit:', btnState);
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
	<Clock />
	<Timer />
	<DayActivity {dayStartTime} {dayEndTime} />
	<Button on:click={buttonClick} {bgColor} {btnText} />
</main>

<style>
</style>
