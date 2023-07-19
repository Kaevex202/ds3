import { browser } from '$app/environment';
import {writable} from 'svelte/store'

export const usernames = writable(browser && (localStorage.getItem("usernames")));

usernames.subscribe((value) => browser && (localStorage.usernames = value));

