<script>
	import LoginPage from './pages/Login.page.svelte';
	import MainPage from './pages/Main.page.svelte';
	import Profile from './pages/Profile.page.svelte';

	export let loggedIn = true;
	export let profile = false;
</script>

<main>
	{#if !loggedIn}
		<LoginPage {loggedIn} />
	{:else if profile}
		<Profile />
	{:else}
		<MainPage />
	{/if}
</main>

<style>
</style>
