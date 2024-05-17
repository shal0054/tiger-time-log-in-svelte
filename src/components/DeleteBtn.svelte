<script>
	import { editing } from '../stores';
	export let delBtnDisabled = true;
	export let delBtnActive = false;
	let bgColor;
	let shadowColor;
	let iconColor;

	$: {
		if (delBtnDisabled || $editing) {
			shadowColor = 'white';
			bgColor = '#8c5f5fc8';
			iconColor = 'darkgrey';
		} else {
			shadowColor = 'red';
			bgColor = 'red';
			iconColor = 'black';
		}
	}
</script>

<main>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		id="delete-btn"
		class:delBtnDisabled
		class:delBtnActive
		style="background-color: {bgColor}; box-shadow: 0 1rem 4rem {shadowColor}"
		on:click
	>
		<!-- <img id="delete-icon" src="./assets/delete-icon.svg" alt="delete icon" /> -->
		<svg
			id="delete-icon"
			width="36px"
			height="36px"
			viewBox="0 -0.5 21 21"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			fill="#000000"
		>
			<g id="SVGRepo_bgCarrier" stroke-width="0" />

			<g
				id="SVGRepo_tracerCarrier"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>

			<g id="SVGRepo_iconCarrier">
				<g
					id="Page-1"
					stroke="none"
					stroke-width="1"
					fill="none"
					fill-rule="evenodd"
				>
					<g
						id="Dribbble-Light-Preview"
						transform="translate(-179.000000, -360.000000)"
						fill="#000000"
					>
						<g id="icons" transform="translate(56.000000, 160.000000)">
							<path
								stroke="none"
								fill={iconColor}
								d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z"
								id="delete-[#1487]"
							>
							</path>
						</g>
					</g>
				</g>
			</g>
		</svg>
	</div>
</main>

<style>
	#delete-btn {
		text-align: center;
		margin: 2rem auto;
		border-radius: 50%;
		height: 15vw;
		width: 15vw;
	}
	#delete-icon {
		width: 58%;
		margin: 0.9rem auto;
	}
	.delBtnActive:active {
		background-color: rgba(192, 192, 16, 0.6) !important;
		/* color: #8c5f5fc8; */
		scale: 0.9;
	}
</style>
