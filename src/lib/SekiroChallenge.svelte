<script lang="ts">
    import skChallenge from '$lib/sk/skchallenge.json'
    import { loggedIn } from '$lib/localstores'
    import { onMount } from 'svelte'
    export let game = "";


    let challenge;
    let bosslist;
    let categoryList;
    let randomBossPercent = false;
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

    function selectedCategory(){
            challenge = skChallenge;

        arr = [];

        var arrayLength = Object.keys(skChallenge);

        console.log(challenge);

        challenge.forEach(element => getRandomObject(element));
        
        if(modRestrictions == false){
            const removeModdedRestrictions = arr.splice(4,1);
        }
        if(HCRestrictions == false){
            const removeHCRestrictions = arr.splice(3,1);
        }
        //if(randomBossPercent == true && arr[0].randomOption == "Other boss %"){
        //    arr[0].randomOption = getRandomBoss(bosslist);
        //}
        //if(randomBossPercent == false && arr[0].randomOption == "Other boss %"){
        //    arr[0].randomOption = getRandomRunCategory(categoryList);
        //}

        const arrParts = arr.map((param) => {
            return(
                encodeURIComponent(param.categoryName)+'='+
                encodeURIComponent(param.randomOption)
                );
            }
        )
        
        submissionstring = arrParts.join('&');


        submissionstring = new URLSearchParams(arr).toString();
        console.log(submissionstring);
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
</script>

<div class="justify-center items-center flex flex-col mx-auto mt-16 dark:text-[#F7EBE8]">
    <form on:submit|preventDefault={selectedCategory} class="mt-8 flex flex-col items-start lg:w-[30%] px-6 lg:px-0">
        <h4 class="flex lg:items-center w-full mx-auto">Options</h4>
        <label class="flex items-center w-full mx-auto hidden"><input type="checkbox" class="mr-4" bind:checked={randomBossPercent}><p>Add Random Boss%</p></label>
        <label class="flex items-center w-full mx-auto"><input type="checkbox" class="mr-4" bind:checked={HCRestrictions}><p>Hardcore Challenges</p></label>
        <label class="flex items-center w-full mx-auto"><input type="checkbox" class="mr-4" bind:checked={modRestrictions}><p>Randomizer run</p></label>
        <label class="flex items-center w-full mx-auto justify-center"><button type="submit" class="text-base font-semibold inline-block px-6 py-4 leading-none border rounded text-[#000] border-[#000] hover:border-[#105D97] hover:text-[#105D97] hover:bg-[#fff] mt-4 dark:text-[#F7EBE8] dark:border-[#F7EBE8] dark:hover:bg-[#1E1E24] dark:hover:text-[#F7EBE8] dark:hover:border-[#F7EBE8]">GIVE ME A CHALLENGE</button></label>
    </form>
</div>

<div class="justify-center flex flex-col mx-auto mt-16 text-left lg:w-1/2 items-stretch lg:items-center px-6 dark:text-[#F7EBE8]">
    <h2 class="lg:w-11/12  2xl:w-3/5 flex text-left items-start text-4xl font-extrabold mt-4 mb-8 2xl:mt-12 ">Run information</h2>
        {#each arr as items}
            <div class="flex lg:w-11/12  2xl:w-3/5 justify-between mt-2 lg:mt-0"><p class="font-bold">{items.categoryName}: </p><p class="text-right items-right">{items.randomOption}</p></div>
        {/each}
        {#if arr.length > 0}
            <div id="buttoncontainer" class="flex justify-end w-3/5 mt-4 items-center">
                <a href="/submit?Game=Sekiro&{submissionstring}"><div class="flex text-base font-semibold items-center justify-center inline-block px-6 py-4 leading-none border rounded text-[#000] border-[#000] hover:border-[#105D97] hover:text-[#105D97] hover:bg-[#fff] mt-4 dark:text-[#F7EBE8] dark:border-[#F7EBE8] dark:hover:bg-[#1E1E24] dark:hover:text-[#F7EBE8] dark:hover:border-[#F7EBE8]">
                    <button type="submit" name="challengeSubmission" value={arr}>Submit This Challenge {#if buttonEnabled == false}<div class="inline-flex ">(must be logged in)</div>{/if} </button>
                </div></a>
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