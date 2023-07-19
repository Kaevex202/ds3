import { writable } from 'svelte/store';

/** SETTINGS MENU */
export const username = writable("");
export const avatarUrl = writable("");
export const discordid = writable("");
export const loggedIn = writable("false");