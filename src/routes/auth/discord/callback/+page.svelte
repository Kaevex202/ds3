<script lang="ts">
    import { username, avatarurl } from '$lib/localstores'
    import type { PageData } from './$types';
    export let data: PageData;
    import { onMount } from 'svelte';

    onMount(async () => {

            $username = data.discordUserInfo.username;
            $avatarurl = `https://cdn.discordapp.com/avatars/${data.discordUserInfo.id}/${data.discordUserInfo.avatar}.png`
            console.log(data.discordUserInfo.username);
            console.log(data.discordUserInfo);
            console.log(data);
        }
    );




</script>

<div>
    <p>Hi! {$username}</p><img src={$avatarurl}/>
</div>