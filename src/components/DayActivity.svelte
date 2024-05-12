<script>
	import DayEntry from './DayEntry.svelte';
	import { times, format12 } from '../stores';
</script>

<main>
	<div id="day-activity">
		<h3>My Day's Activity</h3>
		{#if !$times.dayStartTimeObj}
			<p>Day Not Started</p>
		{:else}
			<DayEntry
				text={'Day Start:'}
				timeStr={$times.dayStartTimeObj.toLocaleTimeString('en-US', {
					hour: 'numeric',
					minute: 'numeric',
					hour12: $format12,
				})}
			/>
		{/if}
		{#if $times.dayEndTimeObj}
			<DayEntry
				text={'Day End:'}
				timeStr={$times.dayEndTimeObj.toLocaleTimeString('en-US', {
					hour: 'numeric',
					minute: 'numeric',
					hour12: $format12,
				})}
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
