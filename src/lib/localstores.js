import { browser } from '$app/environment';
import {writable} from 'svelte/store'

export const username_local = writable(browser && (localStorage.getItem("username")|| "hallo"));

username_local.subscribe((val) => browser && localStorage.setItem("username", val || "hi"))

