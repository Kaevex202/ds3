<script lang="ts">
	import { onMount } from 'svelte';

    export let data;
    let sumOfBest = 0;
    let isLoaded = false;
    let openPersonalbest = false;
    let completedRuns = [];

    //to make clicken open actually open up the times.
    function clickOpenPersonalBest(){
        openPersonalbest = !openPersonalbest;
    }

    //Turn array of Hr,Mins,Sec,Milisec into t('miliseconds') and then convert it back.
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

    //Turn miliseconds into time.
    function milisecondsToTime(t){
        return{
        'days': ('0'+ +Math.floor(t / (1000 * 60 * 60 * 24))).slice(-2),
        'hours': ('0'+ +Math.floor((t / (1000 * 60 * 60)) % 24)).slice(-2),
        'minutes': ('0'+ +Math.floor((t / 1000 / 60) % 60)).slice(-2),
        'seconds': ('0'+ +Math.floor((t / 1000) % 60)).slice(-2),
        }
    }

    function getPersonalBest(){
        data.Run.AttemptHistory.Attempt.forEach(element =>{
            if(element.GameTime !== undefined){
                completedRuns.push({id:element["@_id"],gameTime:getTimeDuration(element.GameTime.slice(0,-4).split(":")).total});
            }}
        )
        //get Values in completedRuns
        completedRuns.reduce((prev, curr) => prev.gameTime > curr.gameTime ? prev : curr);
        console.log(completedRuns);
        return completedRuns;
    }

    onMount(async ()=>{

        isLoaded = true;
        
        //Get Each Best Segment Time and add it up.
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
        <p>Personal Best: {getPersonalBest()}</p>
        <p>Sum of Best: {milisecondsToTime(sumOfBest).hours}:{milisecondsToTime(sumOfBest).minutes}:{milisecondsToTime(sumOfBest).seconds}</p>
<br/><br/>
        <h3 class="font-bold text-xl">Personal Best</h3>
    <button on:click={clickOpenPersonalBest}><h4>OPEN</h4></button>
        {#if openPersonalbest == true}
        <div class="flex flex-col w-1/3">
            <div class="flex flex-row justify-between font-bold"><div class="splitName">Name:</div><div class="time">Time:</div></div>
            {#each data.Run.Segments.Segment as segment}
                <div class="flex flex-row justify-between"><div class="boss flex"><p>{segment.Name}</p></div><div class="bestTime"><p>{getTimeDuration(segment.BestSegmentTime.GameTime.slice(0,-4).split(":")).minutes}:{getTimeDuration(segment.BestSegmentTime.GameTime.slice(0,-4).split(":")).seconds}.{getTimeDuration(segment.BestSegmentTime.GameTime.slice(0,-4).split(":")).miliseconds}</p></div></div>
            {/each}
        </div>
        {/if}
    {/if}
</div>