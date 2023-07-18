<script lang="ts">
    import { avatarUrl, username, loggedIn} from '$lib/stores.js'
    export let data;
</script>

<div>
    {#await data}
    {:then}
    <p>Hi! {data.strapiResponse[0].username}.</p>
    {/await}
</div>