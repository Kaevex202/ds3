import { browser } from '$app/environment';
import {writable} from 'svelte/store'

export const usernames = writable(browser && (localStorage.getItem("usernames")|| "hallo"));

usernames.subscribe((val) => browser && localStorage.setItem("usernames", val || "hi"))

