<script lang="ts">
    import { avatarUrl, username, loggedIn, userData} from '$lib/stores.js'
    export let data;

    $: data, userData.set(data.strapiResponse);
    
</script>
