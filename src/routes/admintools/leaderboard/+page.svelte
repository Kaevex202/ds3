<script lang="ts">
	import { element } from "svelte/internal";

    let time1 = 1500;
    let time2 = 2100;
    let time3 = 1600;
    let time4 = 1000;
    let time5 = 6400;

    $: points1 = pointsByRatio[0];
    $: points2 = pointsByRatio[1];
    $: points3 = pointsByRatio[2];
    $: points4 = pointsByRatio[3];
    $: points5 = pointsByRatio[4];

    let pointsByRatio=[];

    $: average = total/5

    $: total = +time1 + +time2 + +time3 + +time4 + +time5;

    $: bonusPointsToDistribute = (1000*log(4,5))

    $: totalPointsToDistribute = 1000 + +(1000*log(4,5));

    function calculateRatioPoints(){
        let arr=[];
        arr.push(time1,time2,time3,time4,time5)
        let maxValue = Math.max(...arr);
        let ratioValues = arr.map(
            function(element){
            return maxValue/element;
            }
        )
        console.log(ratioValues);
        let shareValue = 0;
        ratioValues.forEach(element =>{
            shareValue = shareValue + +element;
        })
        shareValue = shareValue.toFixed(2)
        console.log(shareValue)

        let value = bonusPointsToDistribute / shareValue;

        pointsByRatio = ratioValues.map(
            function(element){
                return Math.round(element*value);
            }
        )
    }

    function getPercentage(x,y){
       return x/y;
    }

    function log(b, n) {
    return Math.log(n) / Math.log(b);
}
</script>

<div id="distributionCalculator" class="ml-16 mt-16">
        <input type="text" class="block mb-2 text-sm font-medium text-gray-900 border" bind:value={time1}>
        <input type="text" class="block mb-2 text-sm font-medium text-gray-900 border" bind:value={time2}>
        <input type="text" class="block mb-2 text-sm font-medium text-gray-900 border" bind:value={time3}>
        <input type="text" class="block mb-2 text-sm font-medium text-gray-900 border" bind:value={time4}>
        <input type="text" class="block mb-2 text-sm font-medium text-gray-900 border" bind:value={time5}>
</div>

<div id="scores" class="ml-16 mt-16 font-semibold text-xl flex flex-col w-1/2">
    <div class="flex-row flex justify-between w-1/2"><div><p>First Time: </p></div><div>{time1}</div></div>
    <div class="flex-row flex justify-between w-1/2"><div><p>Second Time: </p></div><div>{time2}</div></div>
    <div class="flex-row flex justify-between w-1/2"><div><p>Third Time: </p></div><div>{time3}</div></div>
    <div class="flex-row flex justify-between w-1/2"><div><p>Fourth Time: </p></div><div>{time4}</div></div>
    <div class="flex-row flex justify-between w-1/2"><div><p>Fifth Time: </p></div><div>{time5}</div></div>
</div>

<div id="other info" class="ml-16 mt-16 font-semibold text-xl flex flex-col w-1/2">
    <div class="flex-row flex justify-between w-1/2"><div><p>Total: </p></div><div>{total}</div></div>
    <div class="flex-row flex justify-between w-1/2"><div><p>Average: </p></div><div>{total/5}</div></div>
    <br/>
    <div class="flex-row flex justify-between w-1/2"><div><p>Bonuspoints to distribute: </p></div>{Math.round(bonusPointsToDistribute)}<div></div></div>
    <br/>
    <div class="flex-row flex justify-between w-1/2"><div><p>First player percentage of total: </p></div><div>{getPercentage(time1,total).toFixed(2)}</div></div>
    <div class="flex-row flex justify-between w-1/2"><div><p>Second player percentage of total: </p></div><div>{getPercentage(time2,total).toFixed(2)}</div></div>
    <div class="flex-row flex justify-between w-1/2"><div><p>Third player percentage of total: </p></div><div>{getPercentage(time3,total).toFixed(2)}</div></div>
    <div class="flex-row flex justify-between w-1/2"><div><p>Fourth player percentage of total: </p></div><div>{getPercentage(time4,total).toFixed(2)}</div></div>
    <div class="flex-row flex justify-between w-1/2"><div><p>Fifth player percentage of total: </p></div><div>{getPercentage(time5,total).toFixed(2)}</div></div>
    <br/>
    <div class="flex-row flex justify-between w-1/2"><div><p>First player points: </p></div><div>{points1}</div></div>
    <div class="flex-row flex justify-between w-1/2"><div><p>Second player points: </p></div><div>{points2}</div></div>
    <div class="flex-row flex justify-between w-1/2"><div><p>Third player points: </p></div><div>{points3}</div></div>
    <div class="flex-row flex justify-between w-1/2"><div><p>Fourth player points: </p></div><div>{points4}</div></div>
    <div class="flex-row flex justify-between w-1/2"><div><p>Fifth player points: </p></div><div>{points5}</div></div>
</div>

<button on:click={() => calculateRatioPoints()}>CALCULATE POINTS</button>