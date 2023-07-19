import { writable } from 'svelte/store';

/** SETTINGS MENU */
export const storedUsername = localStorage.username;
export const username = writable(storedUsername || "");
username.subscribe((value) => localStorage.content = value)

export const avatarUrl = writable("");
export const discordid = writable("");
export const loggedIn = writable("false");