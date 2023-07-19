<script lang="ts">
    import { username, avatarUrl, loggedIn } from '$lib/stores'
    import type { PageData } from './$types';
    export let data: PageData;
    import {browser} from '$app/environment'
    import { onMount } from 'svelte';

    onMount(async () => {
            localStorage.set("username", data.discordUserInfo.username || "");


            avatarUrl.set(`https://cdn.discordapp.com/avatars/${data.discordUserInfo.id}/${data.discordUserInfo.avatar}.png`);
            loggedIn.set("true")
        }
    );

    username.set(data.discordUserInfo.username);





</script>

<div>
    <p>Hi! {$username}</p><img src={$avatarUrl}/>
</div>