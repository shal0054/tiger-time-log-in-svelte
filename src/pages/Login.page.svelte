<script>
	const logo = 'assets/GTLogo-Desktop-EN.svg';
	let creds = { username: '', password: '' };
	let errors = { username: '', password: '' };
	let credsValid = false;

	function login() {
		console.log(creds.username, creds.password);
	}

	function validateCreds() {
		credsValid = true;

		if (creds.username.trim().length === 0) {
			credsValid = false;
			errors.username = "Username can't be blank!";
		} else errors.username = '';

		if (creds.password.trim().length === 0) {
			credsValid = false;
			errors.username = "Password can't be blank!";
		} else errors.password = '';

		if (credsValid) {
			login();
		}
	}

	function toggleHidePassword() {
		const passwordField = document.getElementById('password');
		const passwordIcon = document.getElementById('password-icon');

		if (passwordField.type === 'password') {
			passwordField.type = 'text';
			passwordIcon.classList.add('bi-eye');
			passwordIcon.classList.remove('bi-eye-slash');
		} else {
			passwordField.type = 'password';
			passwordIcon.classList.add('bi-eye-slash');
			passwordIcon.classList.remove('bi-eye');
		}
	}
</script>

<head>
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
		crossorigin="anonymous"
	/>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
	/>
	<script
		defer
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
		crossorigin="anonymous"
	></script>
</head>
<main>
	<div id="login-mobile-side">
		<img id="login-logo-mobile" src={logo} alt="" />
		<p id="hint-text">Login in to clock in!</p>
		<form>
			<label for="username" class="form-label">Email</label>
			<div class="error">{errors.username}</div>
			<div id="username-input-div" class="">
				<input
					type="text"
					bind:value={creds.username}
					class="form-control"
					id="username"
					autocomplete="username"
					placeholder="username"
					aria-describedby="inputGroupPrepend"
					required
				/>
				<span
					class="input-group-text"
					id="usernamePrepend"
					style="height: 3.2rem;">@gianttiger.com</span
				>
			</div>
			<br />
			<br />
			<label for="password" class="form-label">Password</label>
			<div class="error">{errors.password}</div>
			<div class="input-group">
				<input
					type="password"
					bind:value={creds.password}
					class="form-control"
					id="password"
					autocomplete="current-password"
					placeholder="Enter your password"
					required
				/>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span
					class="input-group-text"
					id="passwordPrepend"
					on:click={toggleHidePassword}
				>
					<i id="password-icon" class="bi bi-eye-slash"> </i>
				</span>
			</div>
			<a id="forgot-password" href="https://www.google.com">Forgot password?</a>
			<br />
			<br />
			<br />
			<button
				class="fs-4"
				id="login-btn"
				on:click|preventDefault={validateCreds}>Login now</button
			>
		</form>
	</div>
	<div id="login-desktop-side">
		<img id="dt-header-logo" src="./assets/giant-tiger-logo.svg" alt="" />
		<img id="login-image" src="./assets/desktop-image.svg" alt="" />
	</div>
</main>

<style>
	main {
		padding: 0;
		max-width: 100%;
		margin: 0;
		text-align: center;
	}

	#login-logo-mobile {
		width: 90%;
		padding-top: 2rem;
	}

	#hint-text {
		text-align: center;
		font-size: 1.3rem;
	}

	form {
		display: flex;
		flex-direction: column;
		padding: 1.2rem 3rem;
		font-family: 'Roboto', sans-serif;
		text-align: left;
	}

	label {
		font-size: x-large;
	}

	input {
		height: 4em;
		margin: 0;
	}

	.error {
		font-weight: bold;
		font-size: smaller;
		color: red;
	}

	#usernamePrepend {
		background-color: #fff201;
		font-size: x-large;
	}

	#passwordPrepend {
		background-color: #fff201;
		height: 4rem;
		width: 4rem;
	}

	#password-icon {
		font-size: 2.2rem;
		margin: auto;
	}

	#forgot-password {
		text-align: right;
		margin: 1rem 0;
		font-size: larger;
	}

	button {
		background-color: #fff201;
		border: none;
		font-weight: 550;
		height: 4rem;
		box-shadow: 0 1rem 3rem rgba(191, 192, 16, 0.6);
	}

	button:hover {
		scale: 1.05;
	}

	button:active {
		background-color: #eee203;
		scale: 1;
	}

	#login-desktop-side {
		display: none;
	}

	#dt-header-logo {
		max-width: 100%;
		margin: 0;
	}

	#login-image {
		margin: auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	@media only screen and (min-width: 768px) {
		main {
			display: flex;
			margin: 0;
		}

		#login-mobile-side {
			flex: 1;
			border: 0.1rem solid gray;
			height: 100vh;
		}

		#login-logo-mobile {
			margin: 3rem;
			height: 8.5%;
		}

		p {
			text-align: center;
			font-size: 1.8rem;
		}

		form {
			display: flex;
			flex-direction: column;
			padding: 1.2rem 3rem;
			font-family: 'Roboto', sans-serif;
		}

		label {
			font-size: x-large;
		}

		input {
			height: 4rem;
		}

		#username {
			text-align: right;
		}

		#usernamePrepend {
			background-color: #fff201;
			font-size: x-large;
		}

		#passwordPrepend {
			background-color: #fff201;
		}

		#forgot-password {
			text-align: right;
			margin: 1rem 0;
			font-size: larger;
		}

		button {
			background-color: #fff201;
			border: none;
			font-weight: 550;
			height: 4rem;
			box-shadow: 0 1rem 3rem rgba(191, 192, 16, 0.6);
		}

		button:hover {
			scale: 1.05;
		}

		button:active {
			background-color: #eee203;
			scale: 1;
		}

		#login-desktop-side {
			display: flex;
			flex-direction: column;
			flex: 1.618;
			height: 100vh;
		}

		#dt-header-logo {
			max-width: 100%;
			margin: 0;
		}

		#login-image {
			margin: auto;
		}
	}
</style>
