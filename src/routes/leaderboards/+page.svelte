<script>
import { onMount } from 'svelte';

export let data;

onMount(() =>{
})

</script>
<div class="justify-center items-center flex flex-col mx-auto mt-16"><h1 class="text-4xl font-extrabold md:text-7xl mt-4 mb-8 2xl:mt-12 px-4 lg:px-0 dark:text-[#F7EBE8]">Leaderboards</h1></div>

<div class="flex justify-center mb-32"><ul>
    {#each data.data as user, i}
<li class="inline-flex mt-4 ">
    <div class="flex justify-between border-2 rounded mx-2 px-2 lg:px-8 py-4 w-[95vw] lg:w-[50vw] dark:text-[#F7EBE8]">
        <div class="user flex flex-row w-full justify-end">
            <div class="rank justify-start flex-0">{i+1}</div>
            <div class="flex flex-row flex-1 ml-16">
                <div class="font-semibold">User:&nbsp;</div>
                <div>{user.attributes.username.charAt(0).toUpperCase()
                    + user.attributes.username.slice(1)}</div>
            </div>
            <div class="flex flex-row flex-1">
                <div class="font-semibold flex flex-row">Runs Completed:&nbsp;</div>
                <div>{user.attributes.runsCompleted}</div>
            </div>
            <div class="flex flex-row flex-1">
                <div class="font-semibold flex flex-row">Score:&nbsp;</div>
                <div>{user.attributes.score}</div>
            </div>
            <div class="flex flex-row flex-0 font-bold dark:hover:text-[#F7EBE8] hover:text-[#105D97] dark:hover:text-[#E54B4B]">
                <a href="#">
                    <div>View Profile</div>
                </a>
            </div>
        </div>
    </div>
</li>
<br/>
{/each}
</ul>
</div>