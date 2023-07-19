import { writable } from 'svelte/store';

/** STORING USERNAME */
    const storedUsername = localStorage.getItem("username");
    export const username = writable(storedUsername);
    username.subscribe(value => {
        localStorage.set("username", value);
    });


export const avatarUrl = writable("");
export const loggedIn = writable("false");