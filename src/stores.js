import { writable } from 'svelte/store';

export const times = writable({
	dayStartTimeObj: '-:-',
	dayEndTimeObj: '-:-',
});

export const formate12 = writable(false);
export const startTimer = writable(false);
export const totalSecondsWorked = writable(0);
