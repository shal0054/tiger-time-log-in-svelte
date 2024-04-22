<script>
	import Nav from '../components/Nav.svelte';

	let activeTab = 'profile';

	function tabChange(ev) {
		activeTab = ev.detail;
	}
</script>

<main>
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<img
		class="profile-pic"
		src="./assets/profile_img_placeholder.jpg"
		alt="Profile Picture"
	/>
	<p>Employee ID: 123456</p>
	<div class="profile-item">
		<span>
			<img class="icon" src="./assets/user-icon.png" alt="Profile Icon" />
		</span>
		<span class="profile-text">Karim Shaloh</span>
		<span>
			<img class="icon" src="./assets/edit-fill-icon.png" alt="Edit Icon" />
		</span>
	</div>
	<div class="profile-item">
		<span>
			<img class="icon" src="./assets/work-icon.png" alt="Profile Icon" />
		</span>
		<span class="profile-text">Driver</span>
		<span>
			<img class="icon" src="./assets/edit-fill-icon.png" alt="Edit Icon" />
		</span>
	</div>
	<div class="profile-item">
		<span>
			<img class="icon" src="./assets/email-icon.png" alt="Profile Icon" />
		</span>
		<span class="profile-text">kshaloh@gianttiger.com</span>
		<!-- <span>
			<img class="icon" src="./assets/edit-fill-icon.png" alt="Edit Icon" />
		</span> -->
	</div>
	<div class="profile-item">
		<span>
			<img class="icon" src="./assets/phone-icon.png" alt="Profile Icon" />
		</span>
		<span class="profile-text">(613) 305-9648</span>
		<span>
			<img class="icon" src="./assets/edit-fill-icon.png" alt="Edit Icon" />
		</span>
	</div>
	<Nav {activeTab} on:tabChange={tabChange} />
</main>

<style>
	main {
		text-align: center;
	}
	.profile-pic {
		width: 65%;
	}
	p {
		margin-bottom: 4rem;
	}
	.profile-item {
		display: flex;
		gap: 4rem;
		justify-content: flex-start;
		border-bottom: 1px solid #bfc01099;
		margin-top: 2.5rem;
		padding-bottom: 1rem;
		padding-left: 3rem;
	}
	.icon {
		height: 1.6rem;
		width: 1.6rem;
	}
	.profile-text {
		font-size: larger;
	}
</style>
