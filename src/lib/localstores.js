import {writable} from 'svelte/store'

export const username = writable(localStorage.getItem("username")|| "hallo");
username.subscribe((val) => localStorage.setItem("username",val));