import { writable } from 'svelte/store';

export const times = writable({
	dayStartTimeObj: '-:-',
	dayEndTimeObj: '-:-',
});

export const formate12 = writable(false);
