<script>
	import TodaysDate from '../components/TodaysDate.svelte';
	import Clock from '../components/Clock.svelte';
	import Timer from '../components/Timer.svelte';
	import DayActivity from '../components/DayActivity.svelte';
	import Button from '../components/Button.svelte';
	import SubmitModal from '../components/SubmitModal.svelte';
	import Nav from '../components/Nav.svelte';
	import BreakBtn from '../components/BreakBtn.svelte';
	import { times, formate12, startTimer } from '../stores';

	let btnState = 'start'; // start | end | submit
	let dayEntryText;
	let dayEntryTime;
	let showModal = false;
	let bgColor = '#FFF201';
	let shadowColor = '#BFC01099';
	let btnText = 'Start Your Day';
	let activeTab = 'home';

	function tabChange(ev) {
		activeTab = ev.detail;
	}

	const toggleTimeFormate = () => {
		if ($formate12) formate12.set(false);
		else formate12.set(true);
	};

	function buttonClick() {
		// send info for the new state of the button back to the button
		// capture the time the button was clicked and send it to DayActivity
		// update btnState
		switch (btnState) {
			case 'start':
				startTimer.set(true);
				bgColor = 'red';
				shadowColor = '#C0101099';
				btnText = 'End Your Day';
				dayEntryText = 'Day Start:';
				times.set({ ...$times, dayStartTimeObj: new Date() });
				dayEntryTime = $times.formateTime($times.dayStartTimeObj);
				btnState = 'end';
				// activate break button
				break;
			case 'end':
				startTimer.set(false);
				// present confirmation modal
				bgColor = 'green';
				shadowColor = '#10C01099';
				btnText = 'Submit Your Day';
				dayEntryText = 'Day End:';
				times.set({ ...$times, dayEndTimeObj: new Date() });
				dayEntryTime = $times.formateTime($times.dayEndTimeObj);
				btnState = 'submit';
				// deactivate break button
				break;
			case 'submit':
				showModal = true;
				bgColor = '#FFF201';
				shadowColor = '#BfC01099';
				btnText = 'Start Your Day';
				dayEntryText = '';
				dayEntryTime = '';
				// submitDay();
				btnState = 'start';
				break;
		}
	}
</script>

<SubmitModal {showModal} />

<main>
	<TodaysDate />
	<Clock on:click={toggleTimeFormate} />
	<Timer />
	<DayActivity {dayEntryText} {dayEntryTime} />
	<div class="btn-container">
		<Button on:click={buttonClick} {bgColor} {btnText} {shadowColor} />
		<BreakBtn />
	</div>
	<Nav {activeTab} on:tabChange={tabChange} />
</main>

<style>
	main {
		z-index: -1;
	}
	.btn-container {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 4rem;
	}
</style>
