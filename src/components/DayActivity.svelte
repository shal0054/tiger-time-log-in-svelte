<script>
	import DayEntry from './DayEntry.svelte';
	import { times, formate12 } from '../stores';

	console.log($times.dayStartTimeObj);
</script>

<main>
	<div id="day-activity">
		<h3>My Day's Activity</h3>
		{#if !$times.dayStartTimeObj}
			<p>Day Not Started</p>
		{:else}
			<DayEntry
				text={'Day Start:'}
				time={$times.formateTime($times.dayStartTimeObj, $formate12)}
			/>
		{/if}
		{#if $times.dayEndTimeObj}
			<DayEntry
				text={'Day End:'}
				time={$times.formateTime($times.dayEndTimeObj, $formate12)}
			/>
		{/if}
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
