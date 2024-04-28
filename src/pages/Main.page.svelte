<script>
	import TodaysDate from '../components/TodaysDate.svelte';
	import Clock from '../components/Clock.svelte';
	import Timer from '../components/Timer.svelte';
	import DayActivity from '../components/DayActivity.svelte';
	import Button from '../components/Button.svelte';
	import SubmitModal from '../SubmitModal.svelte';
	import Nav from '../components/Nav.svelte';
	import BreakBtn from '../components/BreakBtn.svelte';

	let btnState = 'start'; // start | end | submit
	let dayStartTimeObj;
	let dayEndTimeObj;
	let dayEntryText;
	let dayEntryTime;
	let showModal = false;
	let bgColor = '#FFF201';
	let shadowColor = '#BFC01099';
	let btnText = 'Start Your Day';
	let startTimer = false;
	let formate12 = false;
	let activeTab = 'home';

	function tabChange(ev) {
		activeTab = ev.detail;
	}

	const toggleTimeFormate = () => {
		formate12 = !formate12;
	};

	function formateTime(timeObj) {
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
	}

	function buttonClick() {
		// send info for the new state of the button back to the button
		// capture the time the button was clicked and send it to DayActivity
		// update btnState
		switch (btnState) {
			case 'start':
				startTimer = true;
				bgColor = 'red';
				shadowColor = '#C0101099';
				btnText = 'End Your Day';
				dayEntryText = 'Start Day:';
				dayStartTimeObj = new Date();
				dayEntryTime = formateTime(dayStartTimeObj);
				btnState = 'end';
				break;
			case 'end':
				startTimer = false;
				// present confirmation modal
				bgColor = 'green';
				shadowColor = '#10C01099';
				btnText = 'Submit Your Day';
				dayEntryText = 'Start End:';
				dayEndTimeObj = new Date();
				dayEntryTime = formateTime(dayEndTimeObj);
				btnState = 'submit';
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
	<Clock on:click={toggleTimeFormate} {formate12} />
	<Timer {startTimer} />
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
