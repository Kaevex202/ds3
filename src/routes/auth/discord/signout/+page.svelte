<script>
    import { onMount } from "svelte";
    import {goto} from '$app/navigation'

    let timeout = 900;

onMount(() => {

    localStorage.clear();

    setTimeout(() => {
        goto('/')
    }, timeout);
  });

</script>

<h1 class="flex text-4xl font-extrabold md:text-7xl mt-4 mb-8 2xl:mt-12 px-4 lg:px-0 justify-center mx-auto">Logged out</h1>
