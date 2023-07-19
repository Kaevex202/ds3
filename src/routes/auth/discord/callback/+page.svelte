<script lang="ts">
    import { username, avatarUrl, loggedIn } from '$lib/stores'
    import { username_local } from '$lib/localstores'
    import type { PageData } from './$types';
    export let data: PageData;
    import { onMount } from 'svelte';

    onMount(async () => {
            localStorage.set("username", data.discordUserInfo.username || "");
            $username_local = data.discordUserInfo.userInfo;

            loggedIn.set("true")
        }
    );

    avatarUrl.set(`https://cdn.discordapp.com/avatars/${data.discordUserInfo.id}/${data.discordUserInfo.avatar}.png`);
    username.set(data.discordUserInfo.username);





</script>

<div>
    <p>Hi! {$username}</p><img src={$avatarUrl}/>
</div>