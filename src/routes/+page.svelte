<script>
	import Ds3Challenge from "$lib/DS3Challenge.svelte";
	import ErChallenge from "$lib/ERChallenge.svelte";
	import Faq from "$lib/FAQ.svelte";

	let game = "ds3";
</script>

<svelte:head>
	<title>SOULSBORNECHALLENGES</title>
	<meta name="description" content="A Soulsborne challenge generator" />
</svelte:head>

<section class=" flex-row mx-auto mt-16 ">
	<h1 class="flex flex-col lg:flex-row justify-center items-center text-4xl font-extrabold md:text-7xl mt-4 mb-8 2xl:mt-12 px-4 lg:px-0"><label>
        <select name="gameName" id="game" bind:value={game} class="underline">
            <option value="ds3">DARK SOULS 3</option>
            <option value="er">ELDEN RING</option>
        </select>
    </label> CHALLENGE RUN</h1>
	{#if game == "ds3"}
		<Ds3Challenge/>
	{/if}
	{#if game == "er"}
		<ErChallenge/>
	{/if}
	<Faq/>
</section>

<style>

</style>
