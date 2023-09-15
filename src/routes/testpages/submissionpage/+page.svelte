<script lang="ts">
    import {page} from '$app/stores'
    import {onMount, tick} from 'svelte'
    import {enhance} from '$app/forms';
	import ds3Challenge from '$lib/ds3/ds3challenge.json'
    import ds3BossList from '$lib/ds3/ds3bosses.json'
    import erChallenge from '$lib/er/erchallengesubmittest.json'
    import erBossList from '$lib/er/erbosses.json'
    import dsChallenge from '$lib/ds/dschallengesubmittest.json'
    import dsBossList from '$lib/ds/dsbosses.json'
    import bbChallenge from '$lib/bb/bbchallenge.json'
    import bbBossList from '$lib/bb/bbbosses.json'
    import ds3testjson from '$lib/ds3/ds3challengesubmittest.json'
    import { submissionArray } from '$lib/stores.js';
    import { selectedGameStore } from '$lib/stores.js';
	import { writable, get } from 'svelte/store';

    export let data;

    export let form
    //console.log(form?.body.data.id);
  
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
    let randomizerList: any[] = [];

    let category: any;
    let selectedGame: any;
    let glitchless: any;
    let glitchlessBox = false;
    let startingWeapon: any;
    let startingClass: any;
    let statRestriction: any;
    let challenge: any;
    let hardcoreChallenge: any;
    let randomizer: any;

    let hardcoreChallengeText: string;
    let challengeText: string;
    let statRestrictionText:string;
    let weaponText:string;
    let classText:string;
    let categoryText:string;
    let randomizerTest:string;
    let gameID:string;
    let categoryID:string;

    let selected_category = "";
    let selected_startingWeapon = "";
    let selected_startingclass = "";
    let selected_statRestriction = "";

    let score;

    $: selectedCategory = categoryList.find((o) => o.name === selected_category);
    $: selectedWeapon = weaponsList.find((o) => o.name === selected_startingWeapon);
    $: selectedStartingClass = classesList.find((o) => o.name === selected_startingclass);
    $: selectedStatRestriction = fullStatRestrictionList.find((o) => o.name === selected_statRestriction);


	function selectCategory(){
		if(selectedGame == "Dark Souls 3"){
            challenges = ds3testjson;
            gameID = "08";
        }
        else if(selectedGame == "Elden Ring"){
            challenges = erChallenge;
            gameID = "09";
        }
        else if(selectedGame =="Dark Souls"){
            challenges = dsChallenge;
            gameID = "02";
        }
		else{
			console.error("Something went wrong with the game selector.")
            categoryList = [];
		}

        categoryList = challenges[0].Category;
        console.log(categoryList)
        classesList = challenges[2]['Starting Class'];
        weaponsList = challenges[3]['Weapon (Only use this weapon)'];
        fullStatRestrictionList = challenges[5]['Stat Restrictions Full'];
        challengeList = challenges[6]['Challenge'].sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        hcChallengeList = challenges[7]['Hardcore Restrictions'].sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        randomizerList = challenges[8]['Modded Runs'];

        
	}


    function calculateScore(){
        let glitchlessID
        score = 0;
        if(glitchlessBox == true){
        score = 200;
        glitchlessID = "01";
        }
        else{
        glitchlessID = "00";
        }
        score = score + category?.score+startingClass?.score+statRestriction?.score+challenge?.score+hardcoreChallenge?.score+randomizer?.score;
        hardcoreChallengeText = hardcoreChallenge.name;
        challengeText = challenge.name;
        statRestrictionText = statRestriction.name;
        weaponText = startingWeapon.name;
        classText = startingClass.name;
        categoryText = category.name;
        randomizerTest = randomizer.name;
        categoryID = gameID + category?.id + glitchlessID + startingWeapon?.id + startingClass.id + statRestriction.id + challenge.id + hardcoreChallenge.id + randomizer.id;
        console.log(categoryID);
    }

    //Code to get urlSearchParams and prefill it in form. Everything for now works except for the startingweapon one.
    onMount(() =>{
        selectedGame = get(selectedGameStore);
        selectCategory();

        const submissionArrayData = get(submissionArray)
        setSubmissionData(submissionArrayData);
    })

	function setSubmissionData(submissionArrayData) {
        submissionArrayData.forEach(element => {
            console.log(element);
            if(element.categoryName == "Category"){
                selected_category = element.randomOption;
            }
            if(element.categoryName == "Weapon (Only use this weapon)"){
                selected_startingWeapon = element.randomOption;
            }
            if(element.categoryName == "Starting Class"){
                selected_startingclass = element.randomOption;
            }
            if(element.categoryName == "Stat Restrictions Full" || element.categoryName == "Stat Restrictions"){
                selected_statRestriction = element.randomOption;
            }
        });

	}
</script>

<svelte:head>
    <title>SoulsBorneChallenges - Submit your run</title> 
    <meta name="description" content="Soulsbornechallenges is a Soulsborne Challenge Run Generator. Submit your run on this page.">
</svelte:head>

<div class="justify-center items-center flex flex-col mx-auto mt-16 dark:text-[#F7EBE8]"><h1 class="text-4xl font-extrabold md:text-7xl mt-4 mb-8 2xl:mt-12 px-4 lg:px-0">SUBMIT A RUN</h1>
</div>
{#if form?.body.data.id}
<p class="justify-center items-center flex flex-col dark:text-[#F7EBE8]">Submission succesful</p>
{:else}
<div class="flex justify-center mb-20 mt-12 px-4 lg:px-0">
    <form method="POST">
        <label for="game" class="block mb-2 text-sm font-medium text-gray-900 dark:text-[#F7EBE8]">Game *</label>
        <select id="gameInput" bind:value={selectedGame} on:change={() => selectCategory()} name="game" class=" mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required>
            {#each games as game}
            <option value={game}>{game}</option>
            {/each}
        </select>
        <div id="categoryglitchlessrow" class="flex justify-between ">
            <div class="mb-6 lg:w-[20vw] ">
                <label for="category" class="block mb-2 text-sm font-medium text-gray-900  flex-initial dark:text-[#F7EBE8]">Category *</label>
                <select id="categoryInput" bind:value={selected_category} on:change={()=>calculateScore()} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="any%" required>
                    {#each categoryList as category}
					<option value={category.name}>{category.name}</option>
					{/each}
				</select>
              </div>
              <div class="flex items-center">
                <input id="glitchless" type="checkbox" bind:checked={glitchlessBox} on:change={()=>calculateScore()} name="glitchless" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ml-4" >
                <label for="glitchlessInput" class="ml-2 text-sm font-medium text-gray-900 dark:text-[#F7EBE8]">Glitchless</label>
            </div>
        </div>

        <div class="mb-6 lg:w-[25vw]">
            <label for="weapon" class="block mb-2 text-sm font-medium text-gray-900 flex-initial dark:text-[#F7EBE8]">Weapon Restriction</label>
            <select id="weaponInput" bind:value={selected_startingWeapon} on:change={()=>calculateScore()}  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="any%">
                {#each weaponsList as startingWeapon}
                <option value={startingWeapon.name}>{startingWeapon.name}</option>
                {/each}
            </select>
        </div>
        <div class="mb-6 lg:w-[25vw]">
            <label for="class" class="block mb-2 text-sm font-medium text-gray-900 flex-initial dark:text-[#F7EBE8]">Class *</label>
            <select id="classInput" bind:value={selected_startingclass} on:change={()=>calculateScore()} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="any%" required>
                {#each classesList as startingClass}
                <option value={startingClass.name}>{startingClass.name}</option>
                {/each}
            </select>
        </div>
        <label for="statrestriction" class="block mb-2 text-sm font-medium text-gray-900 dark:text-[#F7EBE8]">Stat Restriction</label>
        <select id="statrestrictionInput" bind:value={selected_statRestriction} on:change={()=>calculateScore()} class=" mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
            {#each fullStatRestrictionList as statRestriction}
            <option value={statRestriction.name}>{statRestriction.name}</option>
            {/each}
        </select>
        <div class="mb-6 lg:w-[25vw]">
            <label for="Challenge" class="block mb-2 text-sm font-medium text-gray-900 flex-initial dark:text-[#F7EBE8]">Challenge *</label>
            <select id="ChallengeInput" bind:value={challenge} on:change={()=>calculateScore()} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="any%" required>
                {#each challengeList as challenge}
                <option value={challenge}>{challenge.name}</option>
                {/each}
            </select>
        </div>
        <div class="mb-6 lg:w-[25vw]">
            <label for="Challenge" class="block mb-2 text-sm font-medium text-gray-900 dflex-initial dark:text-[#F7EBE8]">Hardcore Challenge</label>
            <select id="hardcoreChallengeInput" bind:value={hardcoreChallenge} on:change={()=>calculateScore()} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="any%">
            {#each hcChallengeList as hardcoreChallenge}
            <option value={hardcoreChallenge}>{hardcoreChallenge.name}</option>
            {/each}
            </select>
        </div>
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-[#F7EBE8]">Randomizer Type</label>
        <select id="countriesInput" bind:value={randomizer} on:change={()=>calculateScore()} class="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
            {#each randomizerList as randomizer}
            <option value={randomizer}>{randomizer.name}</option>
            {/each}
        </select>
        <hr class="h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-[#F7EBE8]"/>
        <div class="mb-6 lg:w-[25vw]">
            <label for="video" class="block mb-2 text-sm font-medium text-gray-900  flex-initial dark:text-[#F7EBE8]">Video *</label>
            <input type="url" id="videoInput" name="videoURL" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" required>
        </div>
        <div class="mb-6 lg:w-[25vw]">
            <label for="time" class="block mb-2 text-sm font-medium text-gray-900  flex-initial dark:text-[#F7EBE8]">Time</label>
            <div class="inline-flex w-2/3 2xl:w-1/3">
                <input type="duration" id="hr" name="timeHr" class="mr-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 w-12 " placeholder="hr">
                <input type="duration" id="time" name="timeMins" class="mr-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 w-12" placeholder="min" >
                <input type="duration" id="time" name="timeSecs" class="mr-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 w-12" placeholder="sec" >
            </div>
        </div>          
        <label for="message"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-[#F7EBE8]">Comment</label>
        <textarea id="message" name="comment" rows="4" class="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Leave a comment..."></textarea>
        <div id="score" class="block mb-2 text-sm font-medium text-gray-900  flex-initial dark:text-[#F7EBE8]"><p>Base score: {#if score==undefined}Calculating...{:else if score.toString()=="NaN"}Calculating...{:else}{score}{/if}</p>
            <input type="number" id="scoreInput" name="score" class="hidden" bind:value={score}/>
            <input type="text" id="hardcoreChallengeText" name="hardcoreChallenge" class="hidden" bind:value={hardcoreChallengeText}/>
            <input type="text" id="ChallengeInputtext" bind:value={challengeText}  name="challenge" class="hidden" />
            <input type="text" id="statRestrictionText" name="stat restriction" bind:value={statRestrictionText} class="hidden" />
            <input type="text" id="classText" name="class" bind:value={classText} class="hidden" />
            <input type="text" id="classText" name="startingweapon" bind:value={weaponText} class="hidden" />
            <input type="text" id="categoryText" name="category" bind:value={categoryText}  class="hidden" />
            <input type="text" id="categoryText" name="randomizerOption" bind:value={randomizerTest}  class="hidden"/>
            <input type="number" id="categoryID" name="categoryID" bind:value={categoryID} class="hidden" />
        </div>
        <div class="flex justify-end">
            <button id="submitButton" ><span class="block w-min text-base font-semibold inline-block px-6 py-4 leading-none border rounded text-[#000] border-[#000] hover:border-[#105D97] hover:text-[#105D97] hover:bg-[#fff] mt-4 dark:text-[#F7EBE8] dark:border-[#F7EBE8] dark:hover:bg-[#1E1E24] dark:hover:text-[#F7EBE8] dark:hover:border-[#F7EBE8]" >Submit</span></button>
        </div>
    </form>
</div>


<div class="text-xl font-bold text-white">{JSON.stringify(selectedCategory)} <br/> {JSON.stringify(selectedWeapon)} <br/> {JSON.stringify(selectedStartingClass)}<br/> {JSON.stringify(selectedStatRestriction)}</div>
{/if}