<script>
	export let brkBtnDisabled = true;
	export let brkBtnActive = false;
	let bgColor;
	let shadowColor;
	let iconColor;

	$: {
		if (brkBtnDisabled) {
			shadowColor = 'white';
			bgColor = '#c0c01080';
			iconColor = 'darkgrey';
		} else {
			shadowColor = '#bfc01099';
			bgColor = '#fff201';
			iconColor = 'black';
		}
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
		<!-- <img id="break-icon" src="./assets/timer-add.svg" alt="break icon" /> -->
		<svg
			id="break-icon"
			width="36px"
			height="36px"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="Calendar / Timer_Add">
				<path
					id="Vector"
					d="M12 16V13M12 13V10M12 13H9M12 13H15M21 6L19 4M10 2H14M12 21C7.58172 21 4 17.4183 4 13C4 8.58172 7.58172 5 12 5C16.4183 5 20 8.58172 20 13C20 17.4183 16.4183 21 12 21Z"
					stroke={iconColor}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</g>
		</svg>
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
