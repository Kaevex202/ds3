<script>
    import {onMount} from 'svelte'

    onMount(() => {
        const data = [
  { id: 25, username: 'Siegbruh', time: 3140 },
  { id: 30, username: 'weider96', time: 2968 },
  { id: 22, username: 'FudgeQT', time: 4999 },
  { id: 23, username: 'Siegbruh', time: 3659 }
];

// Create a map to track the fastest times per user
const fastestTimesMap = new Map();

// Create an array with all other objects that are not the fastest time
const leftoverObjects = [];

data.forEach(item => {
  const { id, username, time } = item;

  if (!fastestTimesMap.has(username) || time < fastestTimesMap.get(username)) {
    fastestTimesMap.set(username, { id, username, time });
    
    if (leftoverObjects.some(obj => obj.username === username)) {
      leftoverObjects.splice(leftoverObjects.findIndex(obj => obj.username === username), 1);
    }
  } else {
    leftoverObjects.push({ id, username, time });
  }
});

const fastestTimesArray = Array.from(fastestTimesMap.values());

console.log("Fastest Times Array:", fastestTimesArray);
console.log("Leftover Objects:", leftoverObjects);
    })
</script>