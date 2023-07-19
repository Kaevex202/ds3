<script lang="ts">
    import { username, avatarUrl, discordid, loggedIn } from '$lib/stores'
    import type { PageData } from './$types';
    export let data: PageData;
    
    username.set(data.strapiResponse[0].username)
    avatarUrl.set(data.strapiResponse[0].avatarUrl)
</script>

<div>
    <p>Hi! {$username}</p><img src={$avatarUrl}/>
</div>