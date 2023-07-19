<script lang="ts">
    import { username, avatarUrl, discordid, loggedIn } from '$lib/stores'
    import type { PageData } from './$types';
    export let data: PageData;

    console.log(data);
    console.log(data.strapiResponse);
    console.log(data.strapiResponse[0]);
    console.log(data.strapiResponse[0].discordid);
    console.log(data.strapiResponse[0].email);
    console.log(data.strapiResponse.email);

    username.set(data.strapiResponse[0].username)
    avatarUrl.set(data.strapiResponse[0].avatarUrl)
</script>

<div>
    <p>Hi! </p>
</div>