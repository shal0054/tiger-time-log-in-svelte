<script>
	import { DateInput } from 'date-picker-svelte';
	import { times, format12, editing, totalSecondsWorked } from '../stores';
	export let text;
	let timeStr;
	let date =
		text === 'Day Start:' ? $times.dayStartTimeObj : $times.dayEndTimeObj;
	let editingTime = false;
	let editingDate = false;
	let hours =
		$format12 && date.getHours() > 12
			? (date.getHours() - 12).toString()
			: date.getHours().toString().padStart(2, '0');
	let minutes = date.getMinutes().toString().padStart(2, '0');
	$: amPm = $format12 ? timeStr.slice(-2) : '';
	let timeValid = false;
	let minBorder = 'normal solid black';
	let hourBorder = 'normal solid black';

	$: {
		if (text === 'Day Start:') {
			timeStr = $times.dayStartTimeObj.toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: 'numeric',
				hour12: $format12,
			});
		} else {
			timeStr = $times.dayEndTimeObj.toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: 'numeric',
				hour12: $format12,
			});
		}

		if ($times.dayEndTimeObj) {
			let seconds = Math.floor(
				($times.dayEndTimeObj - $times.dayStartTimeObj) / 1000
			);
			totalSecondsWorked.set(seconds);
		}
	}

	/**
	 * @param time12Str time string
	 * @return {string} of time in 24 hour format
	 */
	function convertTo24(time12Str) {
		// if time12Str is already in 24 hour formate, return it as is.
		if (time12Str.slice(-1) !== 'M') return time12Str;

		if (time12Str.slice(-2) === 'AM' && Number(hours) == 12) hours = 0;
		if (time12Str.slice(-2) === 'PM' && Number(hours) != 12) hours += 12;

		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
	}

	function saveUpdatedTime() {
		timeValid = true;

		if (timeValid) {
			let newTime;
			if ($format12) {
				newTime = `${hours}:${minutes.toString().padStart(2, '0')}:${amPm}`;
			} else {
				newTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
			}
			timeStr = newTime;
		}
		date = new Date(date.toDateString() + ' ' + convertTo24(timeStr).trim());
		if (text === 'Day Start:') times.set({ ...$times, dayStartTimeObj: date });
		else times.set({ ...$times, dayEndTimeObj: date });
	}

	function cancelEditing() {
		editing.set(false);
		editingTime = false;
		hours =
			$format12 && date.getHours() > 12
				? date.getHours() - 12
				: date.getHours().toString().padStart(2, '0');
		minutes = date.getMinutes().toString().padStart(2, '0');
		amPm = $format12 ? timeStr.slice(-2) : '';
		// errors = { hours: '', minutes: '', sequences: '' };
		timeValid = false;
		minBorder = 'normal solid black';
		hourBorder = 'normal solid black';
	}
</script>

<div class="day-entry">
	<div class="date-entry">
		<p class="day-item text">{text}</p>
		{#if editingDate}
			<div class="edit-group">
				<DateInput
					bind:value={date}
					format={'yyyy-MM-dd'}
					min={new Date('2024-01-01 00:00:00')}
					max={new Date('2035-12-31 23:59:59')}
				/>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="green"
					class="bi bi-floppy"
					viewBox="0 0 16 16"
					on:click={() => {
						editing.set(false);
						editingDate = false;
						if (text === 'Day Start:') {
							times.set({ ...$times, dayStartTimeObj: date });
						} else if (text === 'Day End:') {
							times.set({ ...$times, dayEndTimeObj: date });
						}
					}}
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
					on:click={() => {
						editing.set(false);
						editingDate = false;
					}}
				/>
			</div>
		{:else}
			<div class="edit-group">
				{#if text === 'Day Start:'}
					<p class="day-item date">{$times.dayStartTimeObj.toDateString()}</p>
				{:else}
					<p class="day-item date">{$times.dayEndTimeObj.toDateString()}</p>
				{/if}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<img
					on:click={() => {
						editing.set(true);
						editingDate = true;
					}}
					src="assets/edit-icon.svg"
					alt="edit icon"
				/>
			</div>
		{/if}
	</div>
	<div class="time-entry">
		{#if editingTime}
			<div class="edit-group">
				<div class="edit-time">
					<input
						type="number"
						oninput="javascript: if (this.value.length > 2) this.value = this.value.slice(0, 2);"
						maxlength="2"
						placeholder={hours.toString().padStart(2, '0')}
						on:input={ev => {
							hours = ev.target.value;
						}}
					/>
					<span id="time-colon">:</span>
					<input
						type="number"
						oninput="javascript: if (this.value.length > 2) this.value = this.value.slice(0, 2);"
						maxlength="2"
						placeholder={minutes}
						on:input={ev => {
							minutes = ev.target.value.toString().padStart(2, '0');
						}}
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
					on:click={() => {
						editing.set(false);
						editingTime = false;
						saveUpdatedTime();
					}}
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
			</div>
		{:else}
			<div class="edit-group">
				<p class="day-item time">{timeStr}</p>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<img
					on:click={() => {
						editing.set(true);
						editingTime = true;
					}}
					src="assets/edit-icon.svg"
					alt="edit icon"
				/>
			</div>
		{/if}
	</div>
</div>

<style>
	.day-entry {
		border-bottom: 0.5px solid #bfc01099;
	}
	.text {
		font-weight: bold;
	}
	.date-entry,
	.time-entry {
		margin: 0;
	}
	.edit-group {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
		align-items: center;
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
	input {
		text-align: center;
		width: 2.8rem;
		height: fit-content;
	}
	select {
		width: fit-content;
		height: fit-content;
	}
</style>
