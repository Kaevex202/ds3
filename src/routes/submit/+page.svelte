<script lang="ts">
    import {page} from '$app/stores'
    import {onMount} from 'svelte'
    
    let games = [
        "Elden Ring",
        "Dark Souls 3",
        "Dark Souls 2",
        "Dark Souls",
        "Demon's Souls",
        "Sekiro",
        
    ]
    let category: string;
    let selectedGame: string;
    let glitchless: string;
    let glitchlessBox = false;
    let startingWeapon: string;
    let startingClass: string;
    let statRestriction: string;
    let challenge: string;
    let randomizer: string;

    //Code to get urlSearchParams and prefill it in form
    onMount(async () =>{
        $page.url.searchParams.forEach((key, value)=> console.log(value+": "+key))
        selectedGame = $page.url.searchParams.get('Game')?.toString();
        category = $page.url.searchParams.get('Category')?.toString();
        glitchless = $page.url.searchParams.get('Glitches?')?.toString();
        if (glitchless == "Glitches Allowed"){
            glitchlessBox = false;
        }
        else{
            glitchlessBox = true;
        }
        startingWeapon = $page.url.searchParams.get('Weapon (Only use this weapon)')?.toString();
        startingClass = $page.url.searchParams.get('Starting Class')?.toString();
        statRestriction = $page.url.searchParams.get('Stat Restrictions')?.toString().replace(" Only","");
        if(!statRestriction){statRestriction = $page.url.searchParams.get('Stat Restrictions Full')?.toString().replace(" Only","")}
        challenge = $page.url.searchParams.get('Challenge')?.toString();
        randomizer = $page.url.searchParams.get('Modded Runs')?.toString();
    })


</script>

<div class="justify-center items-center flex flex-col mx-auto mt-16"><h1 class="text-4xl font-extrabold md:text-7xl mt-4 mb-8 2xl:mt-12 px-4 lg:px-0">SUBMIT A RUN</h1></div>
<p class="flex justify-center">SUBMIT IS UNDER CONSTRUCTION AND NOT FUNCTIONAL YET.</p>
<div class="flex justify-center mb-20">
    <form method="POST">
        <label for="game" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Game *</label>
        <select id="gameInput" bind:value={selectedGame} class=" mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            {#each games as game}
            <option value={game}>{game}</option>
            {/each}
        </select>
        <div id="categoryglitchlessrow" class="flex justify-between">
            <div class="mb-6 lg:w-[20vw] ">
                <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white flex-initial">Category *</label>
                <input type="category" id="categoryInput" bind:value={category} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="any%" required>
              </div>
              <div class="flex items-center">
                <input id="glitchless" type="checkbox" bind:checked={glitchlessBox} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" >
                <label for="glitchlessInput" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Glitchless</label>
            </div>
        </div>

        <div class="mb-6 lg:w-[25vw]">
          <label for="weapon" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white flex-initial">Starting Weapon</label>
          <input type="weapon" id="weaponInput" bind:value={startingWeapon} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="any%" >
        </div>
        <div class="mb-6 lg:w-[25vw]">
            <label for="class" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white flex-initial">Class *</label>
            <input type="class" id="classInput" bind:value={startingClass} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Cleric" required>
        </div>
        <label for="statrestriction" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stat Restriction</label>
        <select id="statrestrictionInput" bind:value={statRestriction} class=" mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>None</option>
            <option>Vigor</option>
            {#if selectedGame == "Dark Souls 3"}<option>Attunement</option>{/if}
            {#if selectedGame == "Elden Ring"}<option>Mind</option>{/if}
            <option>Endurance</option>
            {#if selectedGame != "Elden Ring"}<option>Vitality</option>{/if}
            <option>Strength</option>
            <option>Dexterity</option>
            {#if selectedGame == "Dark Souls"}<option>Resistance</option>{/if}
            <option>Intelligence</option>
            <option>Faith</option>
            {#if selectedGame == "Elden Ring"}<option>Arcane</option>{/if}
            {#if selectedGame == "Dark Souls 3"}<option>Luck</option>{/if}
        </select>
        <div class="mb-6 lg:w-[25vw]">
            <label for="Challenge" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white flex-initial">Challenge *</label>
            <input type="Challenge" id="ChallengeInput" bind:value={challenge} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="SL1" required>
        </div>
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Randomizer Type</label>
        <select id="countriesInput" bind:value={randomizer} class="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>Not Randomized</option>
            <option>Enemy Randomizer</option>
            <option>Fog Gate Randomizer</option>
            <option>Item Randomizer</option>
            <option>All Random</option>
        </select>
        <hr class="h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>
        <div class="mb-6 lg:w-[25vw]">
            <label for="video" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white flex-initial">Video *</label>
            <input type="url" id="videoInput" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" required>
        </div>
        <div class="mb-6 lg:w-[25vw]">
            <label for="time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white flex-initial">Time</label>
            <div class="inline-flex w-1/3 ">
                <input type="duration" id="hr" class="mr-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="hr">
                <input type="duration" id="time" class="mr-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="min" >
                <input type="duration" id="time" class="mr-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="sec" >
            </div>
        </div>          
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comment</label>
        <textarea id="message" rows="4" class="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
        <div class="flex justify-end">
            <div class="flex w-min text-base font-semibold inline-block px-6 py-4 leading-none border rounded text-[#000] border-[#000] hover:border-[#105D97] hover:text-[#105D97] hover:bg-[#fff] mt-4 ">
            <button>Submit</button>
            </div>
        </div>

</div>