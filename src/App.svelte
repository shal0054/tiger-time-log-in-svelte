<script>
	import LoginPage from './pages/Login.page.svelte';
	import MainPage from './pages/Main.page.svelte';
	import Profile from './pages/Profile.page.svelte';
	import History from './pages/History.page.svelte';
	import Settings from './pages/Settings.page.svelte';

	export let loggedIn = true;
	export let profile = false;
	export let history = false;
	export let settings = false;
</script>

<main>
	{#if !loggedIn}
		<LoginPage {loggedIn} />
	{:else if profile}
		<Profile />
	{:else if history}
		<History />
	{:else if settings}
		<Settings />
	{:else}
		<MainPage />
	{/if}
</main>

<style>
</style>
