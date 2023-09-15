import { writable } from 'svelte/store';

/** SETTINGS MENU */
export const avatarUrl = writable("");
export const discordid = writable("");
export const loggedIn = writable("false");

export const selectedGameStore = writable("");
export const submissionArray = writable([{}]);


