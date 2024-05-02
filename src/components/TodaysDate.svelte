<script>
	const date = new Date(Date.now());
</script>

<main>
	<h2 id="current-date">{date.toDateString()}</h2>
</main>

<style>
	main {
		padding-top: 1.4rem;
	}
	#current-date {
		text-align: center;
	}
</style>
