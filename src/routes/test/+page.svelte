<script>
    import {usernames} from "$lib/localstores"
</script>

<h1>{$usernames}</h1>

<input type="text" bind:value={$usernames} />