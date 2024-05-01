<script>
	import DayEntry from './DayEntry.svelte';
	import { times, formate12 } from '../stores';

	export let dayEntry;

	let dayEntryList = [];

	$: {
		if (dayEntry === 'start') {
			dayEntryList = [
				...dayEntryList,
				{
					text: 'Day Start:',
					time: $times.formateTime($times.dayStartTimeObj, $formate12),
				},
			];
		} else if (dayEntry === 'end') {
			dayEntryList = [
				...dayEntryList,
				{
					text: 'Day End:',
					time: $times.formateTime($times.dayEndTimeObj, $formate12),
				},
			];
		}
	}
</script>

<main>
	<div id="day-activity">
		<h3>My Day's Activity</h3>
		{#each dayEntryList as dayEntry}
			<DayEntry {...dayEntry} />
		{:else}
			<p>Day Not Started</p>
		{/each}
	</div>
</main>

<style>
	#day-activity {
		border: 1px solid #bfc01099;
		text-align: center;
		font-size: larger;
		width: 80%;
		margin: auto;
	}
</style>
