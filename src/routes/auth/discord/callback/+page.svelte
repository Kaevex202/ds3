<script lang="ts">
    import { username, avatarUrl, discordid, loggedIn } from '$lib/stores'
    import type { PageData } from './$types';
    export let data: PageData;


    console.log(data);

    username.set(data.discordUserInfo.username);
    discordid.set(data.discordUserInfo.id);
    avatarUrl.set(`https://cdn.discordapp.com/avatars/${data.discordUserInfo.id}/${data.discordUserInfo.avatar}.png`);
    loggedIn.set("true")


</script>

<div>
    <p>Hi! {$username}</p><img src={avatarUrl}/>
</div>