<script>
    import {username} from "$lib/localstores"
</script>

<h1>{$username}</h1>

<input type="text" bind:value={$username} />