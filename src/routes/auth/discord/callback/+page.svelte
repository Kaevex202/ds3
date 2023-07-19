<script lang="ts">
    import { username, avatarUrl, loggedIn } from '$lib/stores'
    import { usernames } from '$lib/localstores'
    import type { PageData } from './$types';
    export let data: PageData;
    import { onMount } from 'svelte';

    onMount(async () => {
            localStorage.set("username", data.discordUserInfo.username || "");
            try{$usernames = data.discordUserInfo.userInfo;}
            catch(e){console.log(e)}

            loggedIn.set("true")
        }
    );

    avatarUrl.set(`https://cdn.discordapp.com/avatars/${data.discordUserInfo.id}/${data.discordUserInfo.avatar}.png`);
    username.set(data.discordUserInfo.username);





</script>

<div>
    <p>Hi! {$username}</p><img src={$avatarUrl}/>
</div>