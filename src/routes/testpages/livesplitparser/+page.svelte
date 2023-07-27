<script>
	import { onMount } from 'svelte';

    export let data;
    let sumOfBest = 0;
    let isLoaded = false;

    function getTimeDuration(time){
        var tHours = time[0]*1000*60*60
        var tMins = time[1]*1000*60
        var tSecs = time[2].split(".")[0]*1000
        var tMilisecs = time[2].split(".")[1]

        var t = +tHours + +tMins + +tSecs + +tMilisecs;

        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));


        return {
        'total': t,
        'days': days,
        'hours': ('0'+hours).slice(-2),
        'minutes': ('0'+minutes).slice(-2),
        'seconds': ('0'+seconds).slice(-2),
        'miliseconds':('00'+tMilisecs).slice(-3)
        };
    }

    function milisecondsToTime(t){
        return{
        'days': ('0'+ +Math.floor(t / (1000 * 60 * 60 * 24))).slice(-2),
        'hours': ('0'+ +Math.floor((t / (1000 * 60 * 60)) % 24)).slice(-2),
        'minutes': ('0'+ +Math.floor((t / 1000 / 60) % 60)).slice(-2),
        'seconds': ('0'+ +Math.floor((t / 1000) % 60)).slice(-2),
        }
    }

    onMount(async ()=>{

        console.log(data.Run.Segments.Segment)

        isLoaded = true;

        data.Run.Segments.Segment.forEach(element => {
            sumOfBest = +sumOfBest + +getTimeDuration(element.BestSegmentTime.GameTime.slice(0,-4).split(":")).total;
        });
    })
</script>
<div class="ml-16">
    {#if isLoaded == true}
        <h1>Hi</h1>
        <p>Game: {data.Run.GameName}</p>
        <p>Category: {data.Run.CategoryName}</p>
        <p>Attempts: {data.Run.AttemptCount}</p>
        <p>Completed Attempts: {data.Run.AttemptHistory.Attempt.filter(Boolean).length}</p>
        <p>Sum of Best: {milisecondsToTime(sumOfBest).hours}:{milisecondsToTime(sumOfBest).minutes}:{milisecondsToTime(sumOfBest).seconds}</p>
<br/><br/>
        <h3 class="font-bold text-xl">Segments</h3>
    {#each data.Run.Segments.Segment as segment}
        <div><p>{segment.Name}</p><p>Best Segment Time: {getTimeDuration(segment.BestSegmentTime.GameTime.slice(0,-4).split(":")).minutes}:{getTimeDuration(segment.BestSegmentTime.GameTime.slice(0,-4).split(":")).seconds}.{getTimeDuration(segment.BestSegmentTime.GameTime.slice(0,-4).split(":")).miliseconds}</p></div>
    {/each}
    {/if}
</div>