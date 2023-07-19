<script lang="ts">
    import { username, avatarurl , loggedIn } from '$lib/localstores'
    import type { PageData } from './$types';
    export let data: PageData;
    import { onMount } from 'svelte';

    onMount(async () => {

            $username = data.discordUserInfo.username;
            $avatarurl = `https://cdn.discordapp.com/avatars/${data.discordUserInfo.id}/${data.discordUserInfo.avatar}.png`
            $loggedIn = "true";
        }
    );




</script>

<div>
    <p>Hi! {$username}</p><img src={$avatarurl}/>
</div>