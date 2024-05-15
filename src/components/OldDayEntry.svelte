<script>
	import { DateInput } from 'date-picker-svelte';
	let date = new Date();
	import { times, format12, editing, totalSecondsWorked } from '../stores';
	export let text;
	export let timeStr;
	$: hours = timeStr.split(':')[0];
	$: minutes = timeStr.split(':')[1].slice(0, 2);
	$: amPm = timeStr.slice(-1) === 'M' ? timeStr.slice(-2) : '';
	let errors = { hours: '', minutes: '', sequence: '' };
	let timeValid = false;
	let minBorder = 'normal solid black';
	let hourBorder = 'normal solid black';
	let editingHere = false;

	$: {
		console.log('hours:', hours);
		if ($times.dayEndTimeObj) {
			let seconds = Math.floor(
				($times.dayEndTimeObj - $times.dayStartTimeObj) / 1000
			);
			totalSecondsWorked.set(seconds);
		}
	}

	const setUpdatedTime = () => {
		timeValid = true;

		// invalid hours
		if (!hours && hours != 0) {
			timeValid = false;
			errors.hours = "Hours can't be blank";
			hourBorder = 'medium solid red';
		} else if (hours < 0 || hours > 23) {
			timeValid = false;
			errors.hours = 'Hours are out of range';
			hourBorder = 'medium solid red';
		} else {
			errors.hours = '';
			minBorder = 'normal solid black';
		}
		// invalid hours format12
		if ($format12 && hours > 12) {
			timeValid = false;
			errors.hours = "Hours can't be greater than 12";
			hourBorder = 'medium solid red';
		} else if ($format12 && hours < 1) {
			timeValid = false;
			errors.hours = "Hours can't be less than 1";
			hourBorder = 'medium solid red';
		} else if ($format12) {
			errors.hours = '';
			minBorder = 'normal solid black';
		}
		// invalid minutes
		if (!minutes && minutes != 0) {
			timeValid = false;
			errors.minutes = "Minutes can't be blank";
			minBorder = 'medium solid red';
		} else if (minutes < 0 || minutes > 59) {
			timeValid = false;
			errors.minutes = 'Minutes are out of range';
			minBorder = 'medium solid red';
		} else {
			errors.minutes = '';
			minBorder = 'normal solid black';
		}
		// invalid time sequence
		if ($times.dayEndTimeObj && $times.dayEndTimeObj < $times.dayStartTimeObj) {
			timeValid = false;
			errors.sequence = "Start time can't be after end time";
			hourBorder = 'medium solid red';
			minBorder = 'medium solid red';
		} else if ($times.dayStartTimeObj < $times.dayEndTimeObj) {
			errors.sequence = '';
			hourBorder = 'normal solid black';
			minBorder = 'normal solid black';
		}
		// success
		if (timeValid) {
			editing.set(false);
			editingHere = false;
			let newTimeStr = `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
			let newTime24 = convertTo24(newTimeStr);
			let d = new Date();
			let newDateTime = `${d.toDateString()} ${newTime24}`;
			let newDateTimeObj = new Date(newDateTime);
			if (text === 'Day Start:') {
				times.set({ ...$times, dayStartTimeObj: newDateTimeObj });
			} else if (text === 'Day End:') {
				times.set({ ...$times, dayEndTimeObj: newDateTimeObj });
			}
			console.log(newTime24);
		}
	};

	/**
	 * @param time12Str time string
	 * @return {string} of time in 24 hour format
	 */
	function convertTo24(time12Str) {
		// if time12Str is already in 24 hour formate, return it as is.
		if (time12Str.slice(-1) !== 'M') return time12Str;

		if (time12Str.slice(-2) === 'AM' && hours == 12) hours = 0;
		if (time12Str.slice(-2) === 'PM' && hours != 12) hours += 12;

		console.log(
			`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
		);
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
	}

	function cancelEditing() {
		editing.set(false);
		editingHere = false;
		hours = timeStr.split(':')[0];
		minutes = timeStr.split(':')[1].slice(0, 2);
		amPm = timeStr.slice(-1) === 'M' ? timeStr.slice(-2) : '';
		errors = { hours: '', minutes: '', sequences: '' };
		timeValid = false;
		minBorder = 'normal solid black';
		hourBorder = 'normal solid black';
	}
</script>

<div class="error">{errors.sequence}</div>
<div class="error">{errors.hours}</div>
<div class="error">{errors.minutes}</div>
<div class="day-entry">
	<p class="day-item">{text}</p>
	{#if editingHere}
		<div class="edit-time">
			<input
				type="number"
				oninput="javascript: if (this.value.length > 2) this.value = this.value.slice(0, 2);"
				maxlength="2"
				bind:value={hours}
				style="border: {hourBorder};"
			/>
			<span id="time-colon">:</span>
			<input
				type="number"
				oninput="javascript: if (this.value.length > 2) this.value = this.value.slice(0, 2);"
				maxlength="2"
				bind:value={minutes}
				style="border: {minBorder};"
			/>
			{#if $format12}
				<!-- hour 0 will be 12 -->
				<select bind:value={amPm}>
					<option value="AM" selected={amPm === 'AM'}>AM</option>
					<option value="PM" selected={amPm === 'PM'}>PM</option>
				</select>
			{/if}
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="green"
			class="bi bi-floppy"
			viewBox="0 0 16 16"
			on:click={setUpdatedTime}
		>
			<path d="M11 2H9v3h2z" />
			<path
				d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"
			/>
		</svg>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<img
			style="width: 16px;"
			src="./assets/cancel-icon.svg"
			alt="Cancel Editing"
			on:click={cancelEditing}
		/>
	{:else}
		<p class="day-item">{timeStr}</p>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			class="bi bi-pencil"
			viewBox="0 0 16 16"
			on:click={() => {
				editing.set(true);
				editingHere = true;
			}}
		>
			<path
				d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
			/>
		</svg>
	{/if}
</div>

<style>
	.day-entry {
		display: flex;
		justify-content: space-around;
		border-bottom: 0.5px solid #bfc01099;
	}
	.edit-time {
		display: flex;
		justify-content: center;
		gap: 4px;
	}
	#time-colon {
		font-size: x-large;
		font-weight: bold;
	}
	.bi-pencil,
	.bi-floppy {
		margin: auto 0;
	}
	input {
		text-align: center;
		width: 2.8rem;
		height: fit-content;
	}
	select {
		width: fit-content;
		height: fit-content;
	}
	.error {
		font-weight: bold;
		font-size: smaller;
		color: red;
		margin: 1rem auto;
	}
</style>
