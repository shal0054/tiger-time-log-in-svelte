<script>
	import Nav from '../components/Nav.svelte';

	let activeTab = 'history';

	function tabChange(ev) {
		activeTab = ev.detail;
	}
</script>

<main>
	<p>History Page</p>
	<Nav {activeTab} on:tabChange={tabChange} />
</main>

<style></style>
