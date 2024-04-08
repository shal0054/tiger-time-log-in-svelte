<script>
	const date = new Date(Date.now());
</script>

<main>
	<h2 id="current-date">{date.toDateString()}</h2>
</main>

<style>
	main {
		margin: 0;
		padding: 0;
	}
	#current-date {
		text-align: center;
	}
</style>
