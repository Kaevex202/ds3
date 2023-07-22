<script lang="ts">
	import { onMount } from 'svelte';
    import type { PageData } from './$types';
    export let data: PageData;

    let username:string;
    let image;
    let userRunCount:Number;
    let runsData=[];

onMount (async()=>{

    username = data.discordResponse.username;
    userRunCount = data.strapiResponse.data[0].attributes.rundata.data.length;
    runsData = Object.values(data.strapiResponse.data[0].attributes.rundata.data);
    image = `https://cdn.discordapp.com/avatars/${data.discordResponse.id}/${data.discordResponse.avatar}.png`;

})



</script>

{#await data}
<div class=" flex flex-col mx-auto mt-16 px-6 lg:px-0">
    <h1 class="flex text-4xl font-extrabold items-center md:text-7xl mt-4 mb-8 2xl:mt-12 px-4 lg:px-0 mx-auto">ACCOUNT</h1>
    <div id="accountInfo" class="items-start w-4/12 mx-auto">...Loading</div>
</div>
{:then}
<div class=" flex flex-col mx-auto mt-16 px-6 lg:px-0">
    <h1 class="flex text-4xl font-extrabold items-center md:text-7xl mt-4 mb-8 2xl:mt-12 px-4 lg:px-0 mx-auto">ACCOUNT</h1>
    <div id="accountInfo" class="items-start w-4/12 mx-auto">
        <div class="flex flex-row gap-6">
            <img src="https://cdn.discordapp.com/avatars/{data.discordResponse.id}/{data.discordResponse.avatar}.png" alt="profile photo"/>
            <div>
                <h4 class="font-bold">Username</h4>
                <p>{data.discordResponse.username}</p>
            </div>
            <div>
                <h4 class="font-bold">Finshed Runs</h4>
                <p>{userRunCount}</p>
            </div>
            <div id="score" class="hidden">
                <h4 class="font-bold">Score</h4>
                <p>1240</p>
            </div>
        </div>
        <div id="runlist" class="mt-16">
            <h3 class="font-bold text-xl">Runs finished</h3>
            <ul>
                {#if runsData.length > 0}
                    {#each runsData as runs}
                    <li><div class="mt-4 border-2 rounded px-6 py-4"><span class="font-semibold">{runs.attributes.game}</span><div class="flex"><p>{runs.attributes.category} - Starting Class: {runs.attributes.class}, {runs.attributes.statRestriction}, Challenge: {runs.attributes.challenge}</p></div></div></li>
                    {/each}
                {:else}
                    <p>No runs completed.</p>
                {/if}
            </ul>
        </div>
    </div>
    <div id="accountOption" class="flex justify-end w-3/12 mx-auto mt-16">
        <button  on:click={() => alert("Not functional yet.")} class="mr-6 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Remove Account Data
        </button>
        <a href="/auth/discord/signout">
            <button  class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Logout
            </button>
        </a>
    </div>
</div>
{/await}