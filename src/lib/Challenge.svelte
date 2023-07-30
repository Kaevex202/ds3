<script lang="ts">
    import ds3Challenge from '$lib/ds3/ds3challenge.json'
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
    import { loggedIn } from '$lib/localstores'
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation'
    export let game = "";


    let challenge;
    let bosslist;
    let categoryList;
    let randomBossPercent = false;
    let startingClass = false;
    let weaponRestrictions = false;
    let statRestrictions = false;
    let fullStatRestrictions = false;
    let HCRestrictions = false;
    let modRestrictions = false;
    let arr = [];

    let submissionstring="";

    let buttonEnabled = false;

    onMount( ()=>{
            if($loggedIn == "true"){
            buttonEnabled = true;
        }
        }
    )

    function setGame(){
        if(game == "ds3"){return "Dark Souls 3"}
        else if(game == "er"){return "Elden Ring"}
        else if(game=="ds"){return "Dark Souls"}
        else if(game== "bb"){return "Bloodborne"}
    }

    function selectedCategory(){

        if(game == "ds3"){
            challenge = ds3Challenge;
            bosslist = ds3BossList;
            categoryList = ds3CategoryList
        }
        else if(game == "er"){
            challenge = erChallenge;
            bosslist = erBossList;
            categoryList = erCategoryList;
        }
        else if(game="ds"){
            challenge = dsChallenge;
            bosslist = dsBossList;
            categoryList = dsCategoryList;
        }
        else if(game="bb"){
            challenge = bbChallenge;
            bosslist = bbBossList;
            categoryList = bbCategoryList;
        }
        else{
            console.error("Something went wrong with the game selector.")
        }

        arr = [];

        var arrayLength = Object.keys(challenge);

        challenge.forEach(element => getRandomObject(element));
        
        if(modRestrictions == false){
            const removeModdedRestrictions = arr.splice(8,1);
        }
        if(HCRestrictions == false){
            const removeHCRestrictions = arr.splice(7,1);
        }
        if(fullStatRestrictions == false){
            const removeFullStatRestrictions = arr.splice(5,1);
        }
        if(statRestrictions == false){
            const removeStatRestrictions = arr.splice(4,1);
        }
        if(weaponRestrictions == false){
            const removeremoveWeaponRestrictions = arr.splice(3,1);
        }
        if(startingClass == false){
            const removeremoveClassRestrictions = arr.splice(2,1);
        }
        if(randomBossPercent == true && arr[0].randomOption == "Other boss %"){
            arr[0].randomOption = getRandomBoss(bosslist);
        }
        if(randomBossPercent == false && arr[0].randomOption == "Other boss %"){
            arr[0].randomOption = getRandomRunCategory(categoryList);
        }

        const arrParts = arr.map((param) => {
            return(
                encodeURIComponent(param.categoryName)+'='+
                encodeURIComponent(param.randomOption)
                );
            }
        )

        submissionstring = arrParts.join('&');
        submissionstring = new URLSearchParams(arr).toString();
        
    }

    function getRandomRunCategory(element){
        var randomNumb = getRandomInt(element[0].runCategories.length);
        return element[0].runCategories[randomNumb];
    }

    function getRandomBoss(element){
        var randomNumb = getRandomInt(element[0].Bosses.length);
        return element[0].Bosses[randomNumb]+" %";
    }

    function getRandomObject(element){
        var req = element
        var options = Object.keys(req)[0];
        var randomNumb = getRandomInt(element[options].length);
        arr.push({
            categoryName: options,
            randomOption: element[options][randomNumb]
        })
    }

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function submitChallenge(){
    if ($loggedIn == "true"){
        goto(`/submit?Game=${setGame()}&${submissionstring}`);
    }
    else{
        alert("You must be logged in.");
    }
}

</script>

<div class="justify-center items-center flex flex-col mx-auto mt-16">
    <form on:submit|preventDefault={selectedCategory} class="mt-8 flex flex-col items-start lg:w-[30%] px-6 lg:px-0" id="challengeSelector">
        <h4 class="flex lg:items-center w-full mx-auto">Options</h4>
        <label class="flex items-center w-full mx-auto"><input type="checkbox" class="mr-4" id="randomBoss" bind:checked={randomBossPercent}><p>Add Random Boss%</p></label>
        <label class="flex items-center w-full mx-auto"><input type="checkbox" class="mr-4" id="startingClass" bind:checked={startingClass}><p>Pick my Starting Class</p></label>
        <label class="flex items-center w-full mx-auto"><input type="checkbox" class="mr-4" id="weaponRestriction" bind:checked={weaponRestrictions}><p>Pick my Weapon Restrictions</p></label>
        <label class="flex items-center w-full mx-auto"><input type="checkbox" class="mr-4" id="statRestriction" bind:checked={statRestrictions} disabled={fullStatRestrictions}><p>Stat restrictions (Main stats only)</p></label>
        <label class="flex items-center w-full mx-auto"><input type="checkbox" class="mr-4" id="fullStatRestriction" bind:checked={fullStatRestrictions} disabled={statRestrictions}><p>Full Stat restrictions (include Vigor, Attunement, etc.)</p></label>
        <label class="flex items-center w-full mx-auto"><input type="checkbox" class="mr-4" id="hcRestrictions" bind:checked={HCRestrictions}><p>Hardcore Challenges</p></label>
        <label class="flex items-center w-full mx-auto"><input type="checkbox" class="mr-4" id="modRestrictions" bind:checked={modRestrictions}><p>Randomizer run</p></label>
        <label class="flex items-center w-full mx-auto justify-center"><button type="submit" class="text-base font-semibold inline-block px-6 py-4 leading-none border rounded text-[#000] border-[#000] hover:border-[#105D97] hover:text-[#105D97] hover:bg-[#fff] mt-4 ">GIVE ME A CHALLENGE</button></label>
    </form>
</div>

<div class="justify-center flex flex-col mx-auto mt-16 text-left lg:w-1/2 items-stretch lg:items-center px-6">
    <h2 class="lg:w-11/12  2xl:w-3/5 flex text-left items-start text-4xl font-extrabold mt-4 mb-8 2xl:mt-12 ">Run information</h2>
        {#each arr as items}
            <div class="flex lg:w-11/12  2xl:w-3/5 justify-between mt-2 lg:mt-0"><p class="font-bold">{items.categoryName}: </p><p class="text-right items-right">{items.randomOption}</p></div>
        {/each}
        {#if arr.length > 0}
            <div id="buttoncontainer" class="flex justify-end w-3/5 mt-4 items-center">
                <div class="flex text-base font-semibold items-center justify-center inline-block px-6 py-4 leading-none border rounded text-[#000] border-[#000] hover:border-[#105D97] hover:text-[#105D97] hover:bg-[#fff] mt-4 ">
                    <div id="submitChallengeButton" on:click={() => submitChallenge()}><button type="submit" name="challengeSubmission" >Submit This Challenge {#if buttonEnabled == false}<div class="inline-flex ">(must be logged in)</div>{/if} </button></div>
                </div>
            </div>  
        {/if}
</div>

<style>
h4{
    font-size: 1.25rem!important; /* 20px */
    line-height: 2rem!important;
    font-weight: 500!important;
}
</style>