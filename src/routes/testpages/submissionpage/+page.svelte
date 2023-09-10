<script lang="ts">
    import {page} from '$app/stores'
    import {onMount} from 'svelte'
    import { enhance } from '$app/forms'
	import ds3Challenge from '$lib/ds3/ds3challenge_new.json'
    import ds3BossList from '$lib/ds3/ds3bosses.json'
    import ds3CategoryList from '$lib/ds3/ds3categoryList.json'
    import erChallenge from '$lib/er/erchallenge.json'
    import erBossList from '$lib/er/erbosses.json'
    import erCategoryList from '$lib/er/ercategory.json'
    import dsChallenge from '$lib/ds/dschallenge.json'
    import dsBossList from '$lib/ds/dsbosses.json'
    import dsCategoryList from '$lib/ds/dscategoryList.json'
    import bbChallenge from '$lib/bb/bbchallenge.json'
    import bbBossList from '$lib/bb/bbbosses.json'
    import bbCategoryList from '$lib/bb/bbcategory.json'
	import skCategoryList from '$lib/sk/skcategory.json'

    export let data;

    export let form
    console.log(form?.body.data.id);
  
  $: submission_status = form?.body?.message
    
    let games = [
        "Elden Ring",
        "Dark Souls 3",
        "Dark Souls",
    ]

    let challenges: any[] = [];
	let bossList;
	let categoryList: any[] = [];
    let weaponsList: any[] = [];
    let classesList: any[] = [];
    let fullStatRestrictionList: any[] = [];
    let challengeList: any[] = [];
    let hcChallengeList: any[] = [];

    let category: string;
    let selectedGame: string;
    let glitchless: string;
    let glitchlessBox = false;
    let startingWeapon: string;
    let startingClass: string;
    let statRestriction: string;
    let challenge: string;
    let hardcoreChallenge: string;
    let randomizer: string;

    let score;

	function selectedCategory(){
		if(selectedGame == "Dark Souls 3"){
            challenges = ds3Challenge;
        }
        else if(selectedGame == "Elden Ring"){
            challenges = erChallenge;
        }
        else if(selectedGame=="Dark Souls"){
            challenges = dsChallenge;
        }
		else{
			console.error("Something went wrong with the game selector.")
            categoryList = [];
		}

        challengeList = Object.keys(challenges[6].Challenge[0]).sort();
        hcChallengeList = Object.keys(challenges[7]['Hardcore Restrictions'][0]).sort();
        bossList = ds3BossList;
        categoryList = Object.keys(challenges[0].Category[0]);
        weaponsList = Object.keys(challenges[3]['Weapon (Only use this weapon)'][0]).sort();
        classesList = Object.keys(challenges[2]['Starting Class'][0])
        fullStatRestrictionList = Object.keys(challenges[5]['Stat Restrictions Full'][0])
		console.log();
	}


    function calculateScore(){

    }

    //Code to get urlSearchParams and prefill it in form. Everything for now works except for the startingweapon one.
    onMount(() =>{
        selectedGame = $page.url.searchParams.get('Game')?.toString()!;
        selectedCategory();
        category = $page.url.searchParams.get('Category')?.toString()!;
        glitchless = $page.url.searchParams.get('Glitches?')?.toString()!;
        if (glitchless == "Glitches Allowed"){
            glitchlessBox = false;
        }
        else{
            glitchlessBox = true;
        }
        startingWeapon = $page.url.searchParams.get('Weapon')?.toString()!;
        startingClass = $page.url.searchParams.get('Starting Class')?.toString()!;
        statRestriction = $page.url.searchParams.get('Stat Restrictions')?.toString().replace(" Only","")!;
        if(!statRestriction){statRestriction = $page.url.searchParams.get('Stat Restrictions Full')?.toString().replace(" Only","")!}
        challenge = $page.url.searchParams.get('Challenge')?.toString()!;
        hardcoreChallenge = $page.url.searchParams.get('Hardcore Restrictions')?.toString()!;
        randomizer = $page.url.searchParams.get('Modded Runs')?.toString()!;
    })


</script>

<svelte:head>
    <title>SoulsBorneChallenges - Submit your run</title> 
    <meta name="description" content="Soulsbornechallenges is a Soulsborne Challenge Run Generator. Submit your run on this page.">
</svelte:head>

<div class="justify-center items-center flex flex-col mx-auto mt-16 dark:text-[#F7EBE8]"><h1 class="text-4xl font-extrabold md:text-7xl mt-4 mb-8 2xl:mt-12 px-4 lg:px-0">SUBMIT A RUN</h1>
</div>
{#if form?.body.data.id}
<p class="justify-center items-center flex flex-col">Submission succesful</p>
{:else}
<div class="flex justify-center mb-20 mt-12 px-4 lg:px-0">
    <!--<form method="POST">-->
        <form>
        <label for="game" class="block mb-2 text-sm font-medium text-gray-900 dark:text-[#F7EBE8]">Game *</label>
        <select id="gameInput" bind:value={selectedGame} on:change={() => selectedCategory()} name="game" class=" mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required>
            {#each games as game}
            <option value={game}>{game}</option>
            {/each}
        </select>
        <div id="categoryglitchlessrow" class="flex justify-between ">
            <div class="mb-6 lg:w-[20vw] ">
                <label for="category" class="block mb-2 text-sm font-medium text-gray-900  flex-initial dark:text-[#F7EBE8]">Category *</label>
                <select id="categoryInput" bind:value={category} name="category" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="any%" required>
					{#each categoryList as category}
					<option value={category}>{category}</option>
					{/each}
				</select>
              </div>
              <div class="flex items-center">
                <input id="glitchless" type="checkbox" bind:checked={glitchlessBox} name="glitchless" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ml-4" >
                <label for="glitchlessInput" class="ml-2 text-sm font-medium text-gray-900 dark:text-[#F7EBE8]">Glitchless</label>
            </div>
        </div>

        <div class="mb-6 lg:w-[25vw]">
            <label for="weapon" class="block mb-2 text-sm font-medium text-gray-900 flex-initial dark:text-[#F7EBE8]">Starting Weapon</label>
            <select id="weaponInput" bind:value={startingWeapon} name="startingweapon" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="any%">
                {#each weaponsList as startingWeapon}
                <option value={startingWeapon}>{startingWeapon}</option>
                {/each}
            </select>
        </div>
        <div class="mb-6 lg:w-[25vw]">
            <label for="class" class="block mb-2 text-sm font-medium text-gray-900 flex-initial dark:text-[#F7EBE8]">Class *</label>
            <select id="classInput" bind:value={startingClass} name="class" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="any%">
                {#each classesList as startingClass}
                <option value={startingClass}>{startingClass}</option>
                {/each}
            </select>
        </div>
        <label for="statrestriction" class="block mb-2 text-sm font-medium text-gray-900 dark:text-[#F7EBE8]">Stat Restriction</label>
        <select id="statrestrictionInput" bind:value={statRestriction} name="stat restriction" class=" mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
            {#each fullStatRestrictionList as statRestriction}
            <option value={statRestriction}>{statRestriction}</option>
            {/each}
        </select>
        <div class="mb-6 lg:w-[25vw]">
            <label for="Challenge" class="block mb-2 text-sm font-medium text-gray-900 flex-initial dark:text-[#F7EBE8]">Challenge *</label>
            <select id="ChallengeInput" bind:value={challenge} name="challenge" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="any%" required>
                {#each challengeList as challenge}
                <option value={challenge}>{challenge}</option>
                {/each}
            </select>
        </div>
        <div class="mb-6 lg:w-[25vw]">
            <label for="Challenge" class="block mb-2 text-sm font-medium text-gray-900 dflex-initial dark:text-[#F7EBE8]">Hardcore Challenge</label>
            <select id="hardcoreChallengeInput" bind:value={hardcoreChallenge} name="hardcoreChallenge" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="any%">
            {#each hcChallengeList as hardcoreChallenge}
            <option value={hardcoreChallenge}>{hardcoreChallenge}</option>
            {/each}
            </select>
        </div>
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-[#F7EBE8]">Randomizer Type</label>
        <select id="countriesInput" bind:value={randomizer} name="randomizerOption" class="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
            <option>Not Randomized</option>
            <option>Enemy Randomizer</option>
            <option>Fog Gate Randomizer</option>
            <option>Item Randomizer</option>
            <option>All Random</option>
        </select>
        <hr class="h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-[#F7EBE8]"/>
        <div class="mb-6 lg:w-[25vw]">
            <label for="video" class="block mb-2 text-sm font-medium text-gray-900  flex-initial dark:text-[#F7EBE8]">Video *</label>
            <input type="url" id="videoInput" name="videoURL" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" required>
        </div>
        <div class="mb-6 lg:w-[25vw]">
            <label for="time" class="block mb-2 text-sm font-medium text-gray-900  flex-initial dark:text-[#F7EBE8]">Time</label>
            <div class="inline-flex w-2/3 2xl:w-1/3">
                <input type="duration" id="hr" name="timeHr" class="mr-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="hr">
                <input type="duration" id="time" name="timeMins" class="mr-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="min" >
                <input type="duration" id="time" name="timeSecs" class="mr-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="sec" >
            </div>
        </div>          
        <label for="message"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-[#F7EBE8]">Comment</label>
        <textarea id="message" name="comment" rows="4" class="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Leave a comment..."></textarea>
        <div class="flex justify-end">
            <button id="submitButton"><span class="block w-min text-base font-semibold inline-block px-6 py-4 leading-none border rounded text-[#000] border-[#000] hover:border-[#105D97] hover:text-[#105D97] hover:bg-[#fff] mt-4 dark:text-[#F7EBE8] dark:border-[#F7EBE8] dark:hover:bg-[#1E1E24] dark:hover:text-[#F7EBE8] dark:hover:border-[#F7EBE8]" on:click={calculateScore()}>Submit</span></button>
        </div>
    </form>
</div>

<h1>
    SCORE: {score}
</h1>
{/if}