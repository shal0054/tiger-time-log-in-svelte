<script>
	import TodaysDate from '../components/TodaysDate.svelte';
	import Clock from '../components/Clock.svelte';
	import Timer from '../components/Timer.svelte';
	import DayActivity from '../components/DayActivity.svelte';
	import Button from '../components/Button.svelte';
	import SubmitModal from '../components/SubmitModal.svelte';
	import Nav from '../components/Nav.svelte';
	import BreakBtn from '../components/BreakBtn.svelte';
	import DeleteBtn from '../components/DeleteBtn.svelte';
	import { times, startTimer, editing } from '../stores';

	let btnState = 'start'; // start | end | submit
	let showModal = false;
	let bgColor = '#FFF201';
	let shadowColor = '#BFC01099';
	let btnText = 'Start Your Day';
	let activeTab = 'home';
	let btnDisabled;
	let brkBtnDisabled;
	let brkBtnActive;
	let delBtnDisabled;
	let delBtnActive;

	function tabChange(ev) {
		activeTab = ev.detail;
	}

	function buttonClick() {
		if ($editing) return;
		// send info for the new state of the button back to the button
		// capture the time the button was clicked and send it to DayActivity
		// update btnState
		switch (btnState) {
			case 'start':
				startTimer.set(true);
				bgColor = 'red';
				shadowColor = '#C0101099';
				btnText = 'End Your Day';
				times.set({ ...$times, dayStartTimeObj: new Date() });
				btnState = 'end';
				brkBtnActive = true;
				brkBtnDisabled = false;
				delBtnActive = true;
				delBtnDisabled = false;
				break;
			case 'end':
				startTimer.set(false);
				// TODO: present a confirmation modal
				bgColor = '#018a2f';
				shadowColor = '#10C01099';
				btnText = 'Submit Your Day';
				times.set({ ...$times, dayEndTimeObj: new Date() });
				btnState = 'submit';
				brkBtnActive = false;
				brkBtnDisabled = true;
				break;
			case 'submit':
				showModal = true;
				bgColor = '#FFF201';
				shadowColor = '#BfC01099';
				btnText = 'Start Your Day';
				// submitDay(); // submit to firebase and reset variables
				btnState = 'start';
				delBtnActive = false;
				delBtnDisabled = true;
				break;
		}
	}

	function deleteDay() {
		times.set({ dayStartTimeObj: '', dayEndTimeObj: '' });
		btnState = 'start';
	}
</script>

<SubmitModal {showModal} />

<main>
	<TodaysDate />
	<Clock />
	<Timer />
	<DayActivity />
	<div class="btn-container">
		<Button
			on:click={buttonClick}
			{btnDisabled}
			{bgColor}
			{btnText}
			{shadowColor}
		/>
		<div class="sm-btn-container">
			<BreakBtn {brkBtnDisabled} {brkBtnActive} />
			<DeleteBtn {delBtnDisabled} {delBtnActive} on:click={deleteDay} />
		</div>
	</div>
	<Nav {activeTab} on:tabChange={tabChange} />
</main>

<style>
	main {
		z-index: -1;
		padding-bottom: 4.7rem;
	}
	.btn-container {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
</style>
