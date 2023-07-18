<script lang="ts">
    import { avatarUrl, username, loggedIn} from '$lib/stores.js'
    export let data;

    const strapiInfo = data.strapiResponse[0];

    if(strapiInfo.id.length > 0)
    {
        console.log("is this working?")
        avatarUrl.set(data.strapiResponse[0].avatarUrl);
        username.set(data.strapiResponse[0].username);
        loggedIn.set("true");
    }

    console.log(strapiInfo.avatarUrl);
    console.log(strapiInfo);
</script>
