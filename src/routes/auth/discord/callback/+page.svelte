<script lang="ts">
    import { avatarUrl, username, loggedIn} from '$lib/stores.js'
    export let data;

    $: data, username.set(data.strapiResponse[0].username);
    
</script>
