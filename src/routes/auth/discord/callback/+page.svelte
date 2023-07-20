<script lang="ts">
    import { username, avatarurl , loggedIn } from '$lib/localstores'
    import {goto} from '$app/navigation'
    import type { PageData } from './$types';
    export let data: PageData;
    import { onMount } from 'svelte';

    let timeout = 600;

    onMount(async () => {

            $username = data.discordUserInfo.username;
            $avatarurl = `https://cdn.discordapp.com/avatars/${data.discordUserInfo.id}/${data.discordUserInfo.avatar}.png`
            $loggedIn = "true";

                setTimeout(() => {
                goto('/account')
            }, timeout);
        }
    );




</script>

<div>
    <p>Hi! {$username}</p><img src={$avatarurl}/>
</div>