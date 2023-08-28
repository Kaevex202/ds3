<script>
    import {onMount} from 'svelte';
    import { loggedIn } from '$lib/localstores'
    import { goto } from '$app/navigation';

    export let data;
    let admin = false;

    onMount(() => {
        if ($loggedIn == "true" && data.discordResponse.id.length > 0){
            admin=true;
        }
        else{
            admin=false;
            goto('/');
        }
    })

    onMount(() =>{
        console.log(data);
    })

</script>

{#if admin == true}
<div class="justify-center items-center flex flex-col mx-auto mt-16">
    <h1 class="text-4xl font-extrabold md:text-7xl mt-4 mb-8 2xl:mt-12 px-4 lg:px-0 text-white">Admin Tools</h1>
    <p class="text-white">Twitch is {#if data.twitchLive == "true"}live{:else}offline{/if}</p>
    <form method="POST">
        <button class="bg-transparent bg-white mt-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-4 px-10 border border-blue-500 hover:border-transparent rounded">Set Twitch to Live</button>
    </form>
</div>
{:else}
    <h1 class="text-4xl font-extrabold md:text-7xl mt-4 mb-8 2xl:mt-12 px-4 lg:px-0">UNATHORIZED</h1>
{/if}
