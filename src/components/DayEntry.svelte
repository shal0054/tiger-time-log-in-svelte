<script>
	export let text;
	export let time;
	export let editing = false;
	let hours = time.split(':')[0];
	let minutes = time.split(':')[1];
	let errors = { hours: '', minutes: '' };
	let timeValid = false;
	let minBorder = 'normal solid black';
	let hourBorder = 'normal solid black';

	const setTime = () => {
		timeValid = true;

		if (!hours) {
			timeValid = false;
			errors.hours = "Hours can't be blank";
			hourBorder = 'medium solid red';
		} else if (hours < 0 || hours > 23) {
			timeValid = false;
			errors.hours = 'Hours are out of range';
			hourBorder = 'medium solid red';
		} else errors.hours = '';

		if (!minutes) {
			timeValid = false;
			errors.minutes = "Minutes can't be blank";
			minBorder = 'medium solid red';
		} else if (minutes < 0 || minutes > 59) {
			timeValid = false;
			errors.minutes = 'Minutes are out of range';
			minBorder = 'medium solid red';
		} else errors.minutes = '';

		if (timeValid) {
			time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
			editing = false;
		}
	};
</script>

<div class="error">{errors.hours}</div>
<div class="error">{errors.minutes}</div>
<div class="day-entry">
	<p class="day-item">{text}</p>
	{#if editing}
		<input type="number" bind:value={hours} style="border: {hourBorder};" />
		<span>:</span>
		<input type="number" bind:value={minutes} style="border: {minBorder};" />
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			class="bi bi-floppy"
			viewBox="0 0 16 16"
			on:click={setTime}
		>
			<path d="M11 2H9v3h2z" />
			<path
				d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"
			/>
		</svg>
	{:else}
		<p class="day-item">{time}</p>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			class="bi bi-pencil"
			viewBox="0 0 16 16"
			on:click={() => (editing = true)}
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
	.day-item {
	}
	.bi-pencil,
	.bi-floppy {
		margin: auto 0;
	}
	input {
		width: 3rem;
		height: fit-content;
	}
	.error {
		font-weight: bold;
		font-size: smaller;
		color: red;
		margin: 1rem auto;
	}
</style>
