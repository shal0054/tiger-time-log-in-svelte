<script>
	export let bgColor = '#fff201';
	export let shadowColor = '#bfc01099';
	export let brkBtnDisabled = true;
	export let brkBtnActive = false;

	if (brkBtnDisabled) {
		shadowColor = 'white';
		bgColor = '#c0c01080';
	}
</script>

<main>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		id="break-btn"
		class:brkBtnDisabled
		class:brkBtnActive
		style="background-color: {bgColor}; box-shadow: 0 1rem 4rem {shadowColor}"
		on:click
	>
		<img id="break-icon" src="./assets/timer-add.svg" alt="break icon" />
	</div>
</main>

<style>
	#break-btn {
		text-align: center;
		margin: 2rem auto;
		border-radius: 50%;
		height: 15vw;
		width: 15vw;
	}
	#break-icon {
		width: 58%;
		margin: 0.9rem auto;
	}
	.brkBtnActive:active {
		background-color: rgba(192, 192, 16, 0.6) !important;
		scale: 0.9;
	}
</style>
