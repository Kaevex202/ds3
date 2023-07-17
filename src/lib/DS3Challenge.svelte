<script lang="ts">
    import ds3challenge from '$lib/ds3challenge.json'
    import bosslist from '$lib/ds3bosses.json'
    import categoryList from '$lib/categoryList.json'

    let randomBossPercent = false;
    let statRestrictions = false;
    let fullStatRestrictions = false;
    let HCRestrictions = false;
    let modRestrictions = false;
    let category = "";
    let arr = [];

    function selectedCategory(){
        arr = [];

        var arrayLength = Object.keys(ds3challenge);

        ds3challenge.forEach(element => getRandomObject(element));
        
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
        if(randomBossPercent == true && arr[0].randomOption == "Other boss %"){
            arr[0].randomOption = getRandomBoss(bosslist);
        }
        if(randomBossPercent == false && arr[0].randomOption == "Other boss %"){
            arr[0].randomOption = getRandomRunCategory(categoryList);
        }
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

<div class="justify-center items-center flex flex-col mx-auto mt-16">
    <h1 class="text-6xl font-extrabold md:text-7xl mt-4 mb-8 2xl:mt-12">Give me a challenge</h1>
    <form on:submit|preventDefault={selectedCategory} class="mt-8">
        <h4 class="flex items-center w-full mx-auto">Options</h4>
        <label class="flex items-center w-full mx-auto"><input type="checkbox" class="mr-4" bind:checked={randomBossPercent}><p>Add Random Boss%?</p></label>
        <label class="flex items-center w-full mx-auto"><input type="checkbox" class="mr-4" bind:checked={statRestrictions}><p>Stat restrictions (Main stats only)</p></label>
        <label class="flex items-center w-full mx-auto"><input type="checkbox" class="mr-4" bind:checked={fullStatRestrictions}><p>Full Stat restrictions (include Vigor, Attunement, etc.)</p></label>
        <label class="flex items-center w-full mx-auto"><input type="checkbox" class="mr-4" bind:checked={HCRestrictions}><p>Hardcore Challenges</p></label>
        <label class="flex items-center w-full mx-auto"><input type="checkbox" class="mr-4" bind:checked={modRestrictions}><p>Randomizer run</p></label>
        <button type="submit" class="text-base font-semibold inline-block px-6 py-4 leading-none border rounded text-[#000] border-[#000] hover:border-[#105D97] hover:text-[#105D97] hover:bg-[#fff] mt-16">Submit</button>
    </form>
</div>

<div class="justify-center flex flex-col mx-auto mt-16 text-left w-1/2 items-center">
    <h2 class="w-1/2 flex text-left items-start text-6xl font-extrabold md:text-7xl mt-4 mb-8 2xl:mt-12 ">Run information</h2>
        {#each arr as items}
            <div class="flex w-1/2 justify-between"><p class="font-bold">{items.categoryName}: </p><p class="text-right items-right">{items.randomOption}</p></div>
        {/each}
</div>

<style>

    h4{
    font-size: 1.25rem!important; /* 20px */
    line-height: 2rem!important;
    font-weight: 500!important;
}

</style>