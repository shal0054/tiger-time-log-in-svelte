<script>
	export let bgColor = '#fff201';
	export let btnText = 'Start Your Day';
</script>

<main>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div id="button" style="background-color: {bgColor};" on:click>
		<img id="pointer-icon" src="./assets/pointer-icon.svg" alt="pointer icon" />
		<p id="btn-text">{btnText}</p>
	</div>
</main>

<style>
	#button {
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: 0 1rem 4rem #bfc01099;
		margin: 2rem auto;
		border-radius: 50%;
		height: 35vw;
		width: 35vw;
		border: 1px solid #fff;
		font-size: x-large;
		font-family: 'Moul', serif;
		font-weight: 700;
	}

	#pointer-icon {
		width: 40%;
		margin-top: 1rem;
	}

	#btn-text {
		font-size: 60%;
		margin: 0;
		padding: 0;
	}

	#button:active {
		background-color: white;
		scale: 0.9;
		font-size: 55%;
	}
</style>
