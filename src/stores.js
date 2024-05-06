import { writable } from 'svelte/store';

export const times = writable({
	dayStartTimeObj: '',
	dayEndTimeObj: '',
	/*
	 * @param {timeObj} date-time object
	 * @param {formate12} boolean
	 * @return {string} the formatted time
	 **/
	formateTime: (timeObj, formate12) => {
		let hours = timeObj.getHours();
		let minutes = timeObj.getMinutes().toString().padStart(2, '0');
		if (formate12) {
			let amPm = hours >= 12 ? 'PM' : 'AM';
			hours = hours % 12;
			hours = hours ? hours : 12; // hour 0 will be 12
			hours = hours.toString();
			return `${hours}:${minutes} ${amPm}`;
		} else {
			return `${hours.toString().padStart(2, '0')}:${minutes}`;
		}
	},
});

export const formate12 = writable(false);
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
