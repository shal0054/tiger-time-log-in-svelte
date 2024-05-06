<script>
	import LoginPage from './pages/Login.page.svelte';
	import MainPage from './pages/Main.page.svelte';
	import Profile from './pages/Profile.page.svelte';
	import History from './pages/History.page.svelte';
	import Settings from './pages/Settings.page.svelte';
	import { pages } from './stores';
</script>

<main>
	{#if !$pages.loggedIn}
		<LoginPage />
	{:else if $pages.profile}
		<Profile />
	{:else if $pages.history}
		<History />
	{:else if $pages.settings}
		<Settings />
	{:else if $pages.main}
		<MainPage />
	{/if}
</main>

<style>
</style>
