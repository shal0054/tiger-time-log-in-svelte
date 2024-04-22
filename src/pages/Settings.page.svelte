<script>
	import Nav from '../components/Nav.svelte';

	let activeTab = 'settings';

	function tabChange(ev) {
		activeTab = ev.detail;
	}
</script>

<main>
	<p>Settings Page</p>
	<Nav {activeTab} on:tabChange={tabChange} />
</main>

<style></style>
