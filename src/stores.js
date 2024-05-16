import { writable } from 'svelte/store';

export const times = writable({
	dayStartTimeObj: '',
	dayEndTimeObj: '',
});

export const format12 = writable(false);
export const startTimer = writable(false);
export const totalSecondsWorked = writable(0);
export const editing = writable(false);

// simulated routing
export const pages = writable({
	loggedIn: false,
	main: false,
	history: false,
	profile: false,
	settings: false,
});
