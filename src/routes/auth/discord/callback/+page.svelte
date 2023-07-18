<script lang="ts">
    import { avatarUrl, username, loggedIn, userData} from '$lib/stores.js'
    export let data;

    
    const strapiInfo = data.strapiResponse;

    $userData.push(strapiInfo);
</script>
