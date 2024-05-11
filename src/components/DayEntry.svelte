<script>
	import { DateInput } from 'date-picker-svelte';
	import { times, format12, editing, totalSecondsWorked } from '../stores';
	export let text;
	export let timeStr;
	let date = new Date();
</script>

<!-- <DateInput bind:value={date} format={'yyyy-MM-dd'} /> -->

<div class="day-entry">
	<p class="day-item text">{text}</p>
	<p class="day-item date">{date.toDateString()}</p>
	<p class="day-item time">{timeStr}</p>
</div>

<style>
	.day-entry {
		border-bottom: 0.5px solid #bfc01099;
	}
	.text {
		font-weight: bold;
	}
</style>
