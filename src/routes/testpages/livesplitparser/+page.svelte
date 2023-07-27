<script lang="ts">
	import { onMount } from 'svelte';
    import { enhance } from '$app/forms';


    export let form;
    let sumOfBest = 0;
    let isLoaded = false;
    let completedRuns = [];
    let fastestRun;
    let fastestRunMiliSec;
    let formLoaded = false;

    $:  submission_status = form?.Run?.AttemptCount

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
        form?.Run.AttemptHistory.Attempt.forEach(element =>{
            if(element.GameTime !== undefined){
                completedRuns.push({id:element["@_id"],gameTime:getTimeDuration(element.GameTime.slice(0,-4).split(":")).total});
            }})
            fastestRunMiliSec = completedRuns.reduce(function(prev, curr) {
                return prev.gameTime < curr.gameTime ? prev : curr;
            })
            fastestRun = (milisecondsToTime(fastestRunMiliSec.gameTime));
            console.log(fastestRunMiliSec)
        return {
            'completedAttempts':completedRuns.length,
            'personalBest':`${fastestRun.hours}:${fastestRun.minutes}:${fastestRun.seconds}`,
        }
    }

    function getPersonalBestSegment(i){
        let split = form?.Run.Segments.Segment[i].SegmentHistory.Time.filter(x => x['@_id']===fastestRunMiliSec.id)[0].GameTime.slice(0,-4).split(":");
        let time = getTimeDuration(split);
        return{
            'hours':time.hours,
            'minutes':time.minutes,
            'seconds':time.seconds,
            'miliseconds': (split[2].split(".")[1])
        }
    }

    onMount(async ()=>{

        if(form?.Run?.AttemptCount > 0){
            formLoaded = true;
        }
        isLoaded = true;
        
        //Get Each Best Segment Time and add it up.
        form?.Run.Segments.Segment.forEach(element => {
            sumOfBest = +sumOfBest + +getTimeDuration(element.BestSegmentTime.GameTime.slice(0,-4).split(":")).total;
        });
    })
</script>
<div class="ml-16 mb-32">
    {#if isLoaded == true}
        <h1 class="text-5xl font-black mb-8 mt-16">Livesplit Parser</h1>
        <form method="POST" class="flex flex-row"><label class="mr-4" for="splitUrl" >Splits URL:</label><input name="splitUrl" type="url" class="block mb-2 text-sm font-medium text-gray-900 border-2 w-1/2"/><button class="align-center flex ml-4 border-2 rounded h-fit px-2 bg-gray-100 font-semibold">Submit</button></form>
        {#if formLoaded == true}
        <p>Game: {form?.Run.GameName}</p>
        <p>Category: {form?.Run.CategoryName}</p>
        <p>Attempts: {form?.Run.AttemptCount}</p>
        <p>Completed Attempts: {getPersonalBest().completedAttempts}</p>
        <p>Personal Best: {getPersonalBest().personalBest}</p>
        <p>Sum of Best: {milisecondsToTime(sumOfBest).hours}:{milisecondsToTime(sumOfBest).minutes}:{milisecondsToTime(sumOfBest).seconds}</p>
        {/if}
<br/><br/>
{#if formLoaded == true}
        <div id="bestSegments" class="flex flex-col w-1/2">
            <div class="flex flex-row gap-32">
                <div class="flex flex-col">
                    <div class="block font-bold text-lg">Details</div>
                    <div class="name font-bold" >Name</div>
                    {#each form?.Run.Segments.Segment as segment}
                    <div class="boss flex"><p>{segment.Name}</p></div>
                    {/each}
                </div>
                <div class="flex flex-col text-right">
                    <div><h3 class="font-bold text-lg ">Best Segments</h3></div>
                    <div class="time font-bold">Time:</div>
                    {#each form?.Run.Segments.Segment as segment}
                    <div class="bestTime  font-mono"><p>{getTimeDuration(segment.BestSegmentTime.GameTime.slice(0,-4).split(":")).minutes}:{getTimeDuration(segment.BestSegmentTime.GameTime.slice(0,-4).split(":")).seconds}.{getTimeDuration(segment.BestSegmentTime.GameTime.slice(0,-4).split(":")).miliseconds}</p></div>
                    {/each}
                </div>
                <div class="flex flex-col text-right">
                    <div><h3 class="font-bold text-lg">Personal Best</h3></div>
                    <div class="time font-bold">Time:</div>
                    {#each form?.Run.Segments.Segment as segment,i}
                    <div class="personalBest text-right font-mono"><p>{getPersonalBestSegment(i).minutes}:{getPersonalBestSegment(i).seconds}.{getPersonalBestSegment(i).miliseconds}</p></div>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
    {/if}
</div>