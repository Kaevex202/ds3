import { browser } from '$app/environment';
import {writable} from 'svelte/store'

/* username */
export const username = writable(browser && (localStorage.getItem("username")));
username.subscribe((value) => browser && (localStorage.username = value));

/*avatarurl*/
export const avatarurl = writable(browser && (localStorage.getItem("avatarurl")));
avatarurl.subscribe((value) => browser && (localStorage.avatarurl = value));

/* loggedin */
export const loggedIn = writable(browser && (localStorage.getItem("loggedIn")));
loggedIn.subscribe((value) => browser && (localStorage.loggedIn = value));
