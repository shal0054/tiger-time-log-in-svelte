<script>
	import { DateInput } from 'date-picker-svelte';
	import { times, format12, editing, totalSecondsWorked } from '../stores';
	export let text;
	export let timeStr;
	let date = new Date();
	let editingTime = false;
	let editingDate = false;
	$: console.log(date);
</script>

<div class="day-entry">
	<div class="date-entry">
		<p class="day-item text">{text}</p>
		{#if editingDate}
			<div class="edit-group">
				<DateInput bind:value={date} format={'yyyy-MM-dd'} />
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
				<p class="day-item date">{date.toDateString()}</p>
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
				<p>Time is editing</p>
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
						editingTime = false;
					}}
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
</style>
