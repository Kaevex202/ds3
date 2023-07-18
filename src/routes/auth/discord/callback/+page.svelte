<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;

    console.log(data);
    console.log(data.strapiResponse);
    console.log(data.strapiResponse[0]);
    console.log(data.strapiResponse[0].discordid);
    console.log(data.strapiResponse[0].email);
    console.log(data.strapiResponse.email);
</script>

<div>
    <p>Hi! </p>
</div>