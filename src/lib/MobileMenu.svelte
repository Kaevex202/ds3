<script>
    import { scale } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';
    import { loggedIn } from './localstores';
    import LoggedInIcon from './LoggedInIcon.svelte';
    
    export let open;

    import { page } from '$app/stores';
</script>

{#if open}
    <div class="">
        <a href="/" on:click={() =>open=false } class="block mt-16 text-[#000] font-semibold hover:text-[#105D97]text-lg dark:text-[#F7EBE8]" aria-current={$page.url.pathname === '/' ? 'page' : undefined} >
            Home
            </a>
            <a href="/about" on:click={() =>open=false } class="block mt-16 text-[#000] font-semibold hover:text-[#105D97]text-lg dark:text-[#F7EBE8]" aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
            About
            </a>
            <a href="/challenge" on:click={() =>open=false } class="block mt-16 text-[#000] font-semibold hover:text-[#105D97]text-lg dark:text-[#F7EBE8]" aria-current={$page.url.pathname.startsWith('/challenge') ? 'page' : undefined} >
            Challenge of the Month
            </a>
            {#if $loggedIn == false}
            <a href="https://discord.com/oauth2/authorize?client_id=1130486833101406239&redirect_uri=https%3A%2F%2Fsoulsbornechallenges.com%2Fauth%2Fdiscord%2Fcallback&response_type=code&scope=identify%20email" on:click={() =>open=false } class="text-base mt-16 font-semibold block px-8 py-4 leading-none border rounded text-[#000] border-[#000] hover:border-[#105D97] hover:text-[#105D97] hover:bg-[#fff]  dark:text-[#F7EBE8]">LOGIN</a>
            {:else}
                <a href="/account" on:click={() =>open=false } class="block mt-16 text-[#000] font-semibold hover:text-[#105D97]text-lg  dark:text-[#F7EBE8]" aria-current={$page.url.pathname.startsWith('/account') ? 'page' : undefined} >
                    Account
                </a>            
            {/if}
    </div>

    <hr transition:scale={{ duration: 750, easing: quadOut, opacity: 1 }} />
{/if}

<style>
    div {
        text-align: center;
        font-size: 2em;
        letter-spacing: 0.15em;
        padding: 2rem;
        padding-top: 0;
        color: #000;
        width: 100vw;
        height:100vh;
    }
    p {
        cursor: pointer;
        width: max-content;
        margin: 3rem auto;
    }
    p:hover {
        text-decoration: underline;
    }
</style>
