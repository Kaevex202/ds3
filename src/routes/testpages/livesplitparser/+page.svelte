<script>
	import { onMount } from 'svelte';

    export let data;
    let isLoaded = false;

    onMount(async ()=>{
        console.log(data.Run.Segments.Segment[0].SegmentHistory.Time);
        isLoaded = true;
    })
</script>
<div class="ml-16">
    {#if isLoaded == true}
        <h1>Hi</h1>
        <p>Game: {data.Run.GameName}</p>
        <p>Category: {data.Run.CategoryName}</p>
        <p>Attempts: {data.Run.AttemptCount}</p>
<br/><br/>
        <h3 class="font-bold text-xl">Segments</h3>
    {#each data.Run.Segments.Segment as segment}
        <p>{segment.Name}</p><p>Best Segment Time: {segment.BestSegmentTime.GameTime.slice(0,-5)}</p>
    {/each}
    {/if}
</div>