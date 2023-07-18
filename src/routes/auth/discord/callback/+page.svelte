<script lang="ts">
    import { avatarUrl, username, loggedIn} from '$lib/stores.js'
    export let data;

    if(data.strapiResponse[0].id.length > 0)
    {
        avatarUrl.set(data.strapiResponse[0].avatarUrl);
        username.set(data.strapiResponse[0].username);
        loggedIn.set("true");
    }

    console.log($avatarUrl);
</script>


<h1>Logged in.</h1>