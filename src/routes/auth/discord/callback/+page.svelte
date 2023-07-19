<script lang="ts">
    import { username, avatarUrl, discordid, loggedIn } from '$lib/stores'
    import type { PageData } from './$types';
    export let data: PageData;


    console.log(data);

</script>

<div>
    <p>Hi! {$username}</p><img src={avatarUrl}/>
</div>