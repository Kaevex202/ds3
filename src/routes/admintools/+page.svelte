<script>
    import {onMount} from 'svelte';
    import { loggedIn } from '$lib/localstores'
    import { goto } from '$app/navigation';

    export let data;
    let admin = false;

    onMount(() => {
        console.log(data);
        if ($loggedIn == "true" && data.discordResponse.id.length > 0){
            admin=true;
        }
        else{
            admin=false;
            goto('/');
        }
    })

</script>

{#if admin == true}
<div class="justify-center items-center flex flex-col mx-auto mt-16 text-white">
    <div id="link1" class="font-bold"><a href="/admintools/updateleaderboard">Update Leaderboard</a></div>
    <div id="link2" class="font-bold"><a href="/admintools/twitchlive">Twitch Live Status</a></div>
</div>
{:else}
    <h1 class="text-4xl font-extrabold md:text-7xl mt-4 mb-8 2xl:mt-12 px-4 lg:px-0">UNATHORIZED</h1>
{/if}

