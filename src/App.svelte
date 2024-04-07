<script>
	import LoginPage from './Login.page.svelte';
	import MainPage from './Main.page.svelte';

	export let loggedIn = true;
</script>

<main>
	{#if !loggedIn}
		<LoginPage {loggedIn} />
	{:else}
		<MainPage />
	{/if}
</main>

<style>
</style>
