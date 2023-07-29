<script lang="ts">
	import Challenge from "$lib/Challenge.svelte";
	import SekiroChallenge from "$lib/SekiroChallenge.svelte";
	import Faq from "$lib/FAQ.svelte";
	import {page} from '$app/stores'

	//let urlParams = $page.url.searchParams;
	let game = "ds3"; //urlParams.get('game') ||

	//function updateURL(){
	//	window.history.replaceState(history.state, '', `?game=`+game)
	//}
</script>

<svelte:head>
	<title>SOULSBORNECHALLENGES</title>
	<meta name="description" content="A Soulsborne challenge generator" />
</svelte:head>

<section class=" flex-row mx-auto mt-16 ">
	<h1 class="flex flex-col lg:flex-row justify-center items-center text-4xl font-extrabold md:text-5xl 2xl:text-7xl mt-4 mb-8 2xl:mt-12 px-4 lg:px-0"><label>
        <select name="gameName" id="game" bind:value={game} class="underline hover:text-[#105D97] bg-[#FAF9F6]">
            <option value="ds3"class=" text-4xl font-extrabold md:text-7xl text-[#000000]">DARK SOULS 3</option>
            <option value="er" class=" text-4xl font-extrabold md:text-7xl text-[#000000]">ELDEN RING</option>
			<option value="ds" class=" text-4xl font-extrabold md:text-7xl text-[#000000]">DARK SOULS</option>
			<option value="ds2" class="hidden text-4xl font-extrabold md:text-7xl text-[#000000]">DARK SOULS 2</option>
			<option value="bb" class="hidden text-4xl font-extrabold md:text-7xl text-[#000000]">BLOODBORNE</option>
			<option value="des" class="hidden text-4xl font-extrabold md:text-7xl text-[#000000]">DEMON'S SOULS</option>
			<option value="sk" class=" text-4xl font-extrabold md:text-7xl text-[#000000]">SEKIRO</option>
        </select>
    </label> CHALLENGE RUN</h1>
	{#if game == "ds3"}
		<Challenge bind:game={game}/>
	{:else if game == "er" }
		<Challenge bind:game={game}/>
	{:else if game == "ds" }
		<Challenge bind:game={game}/>	
	{:else if game == "ds2"}
		<h2 class="flex hidden justify-center text-4xl font-extrabold mt-4 mb-8 2xl:mt-12 ">COMING SOON</h2>
	{:else if game == "bb"}
		<Challenge bind:game={game}/>	
	{:else if game == "des"}
		<h2 class="flex hidden justify-center text-4xl font-extrabold mt-4 mb-8 2xl:mt-12 ">COMING SOON</h2>
	{:else if game == "sk"}
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
