<script lang="ts">
	import Challenge from "$lib/Challenge.svelte";
	import SekiroChallenge from "$lib/SekiroChallenge.svelte";
	import Faq from "$lib/FAQ.svelte";
	import {page} from '$app/stores'
	import { onMount } from "svelte"

	export let data;

	//let urlParams = $page.url.searchParams;
	let game = "Dark Souls 3"; //urlParams.get('game') ||

	//function updateURL(){
	//	window.history.replaceState(history.state, '', `?game=`+game)
	//}

	onMount(()=>{
		console.log(data.twitchLive);
	})

</script>

<svelte:head>
	<title>SOULSBORNECHALLENGES</title>
	<meta name="description" content="A Soulsborne challenge generator" />
</svelte:head>

{#if data.twitchLive == "true"}
	<div id="twitch-embed" class="hidden lg:block lg:fixed bottom-0 right-0">
		<iframe src="https://player.twitch.tv/?channel=kaevex&parent=soulsbornechallenges.com" frameborder="0" allowfullscreen="true" scrolling="no" height="240" width="360"></iframe>
	</div>
	{:else}
{/if}




<section class=" flex-row mx-auto mt-16 ">
	<h1 class="flex flex-col lg:flex-row justify-center items-center text-4xl font-extrabold md:text-5xl 2xl:text-7xl mt-4 mb-8 2xl:mt-12 px-4 lg:px-0 dark:text-[#F7EBE8]"><label>
        <select name="gameName" id="game" bind:value={game} class="underline hover:text-[#105D97] bg-[#FAF9F6] dark:bg-[#444140] dark:hover:text-[#EC625F]">
            <option value="Dark Souls 3"class=" text-4xl font-extrabold md:text-7xl text-[#000000] dark:text-[#F7EBE8]">DARK SOULS 3</option>
            <option value="Elden Ring" class=" text-4xl font-extrabold md:text-7xl text-[#000000] dark:text-[#F7EBE8]">ELDEN RING</option>
			<option value="Dark Souls" class=" text-4xl font-extrabold md:text-7xl text-[#000000] dark:text-[#F7EBE8]">DARK SOULS</option>
			<option value="Dark Souls 2" class="hidden text-4xl font-extrabold md:text-7xl text-[#000000] dark:text-[#F7EBE8]">DARK SOULS 2</option>
			<option value="Bloodborne" class="hidden text-4xl font-extrabold md:text-7xl text-[#000000] dark:text-[#F7EBE8]">BLOODBORNE</option>
			<option value="Demon's Souls" class="hidden text-4xl font-extrabold md:text-7xl text-[#000000] dark:text-[#F7EBE8]">DEMON'S SOULS</option>
			<option value="Sekiro" class=" text-4xl font-extrabold md:text-7xl text-[#000000] dark:text-[#F7EBE8]">SEKIRO</option>
        </select>
    </label> CHALLENGE RUN</h1>
	{#if game == "Dark Souls 3"}
		<Challenge bind:game={game}/>
	{:else if game == "Elden Ring" }
		<Challenge bind:game={game}/>
	{:else if game == "Dark Souls" }
		<Challenge bind:game={game}/>	
	{:else if game == "Dark Souls 2"}
		<h2 class="flex hidden justify-center text-4xl font-extrabold mt-4 mb-8 2xl:mt-12 ">COMING SOON</h2>
	{:else if game == "Bloodborne"}
		<Challenge bind:game={game}/>	
	{:else if game == "Demon's Souls"}
		<h2 class="flex hidden justify-center text-4xl font-extrabold mt-4 mb-8 2xl:mt-12 ">COMING SOON</h2>
	{:else if game == "Sekiro"}
		<SekiroChallenge/>
	{:else}
		<p>Select a game.</p>
	{/if}
	<Faq/>

</section>

<style>
	select:focus {
		outline:none;
		border:none;
	}
</style>
