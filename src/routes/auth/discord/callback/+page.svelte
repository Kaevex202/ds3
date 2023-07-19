<script lang="ts">
    import { username, avatarUrl, loggedIn } from '$lib/stores'
    import { usernames } from '$lib/localstores'
    import type { PageData } from './$types';
    export let data: PageData;
    import { onMount } from 'svelte';

    onMount(async () => {

            $usernames = await data.discordUserInfo.userInfo;
            console.log(data.discordUserInfo.username);
            console.log(data.discordUserInfo);
            console.log(data);

            loggedIn.set("true")
        }
    );

    avatarUrl.set(`https://cdn.discordapp.com/avatars/${data.discordUserInfo.id}/${data.discordUserInfo.avatar}.png`);
    username.set(data.discordUserInfo.username);





</script>

<div>
    <p>Hi! {$username}</p><img src={$avatarUrl}/>
</div>