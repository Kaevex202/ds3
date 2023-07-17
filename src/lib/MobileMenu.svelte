<script>
    import { fly, scale } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';
    
    export let open;

    import { page } from '$app/stores';

</script>

{#if open}
    <div>
        <a href="/" on:click={() =>open=false } class="block mt-32 text-[#000] font-semibold hover:text-[#105D97]text-lg" aria-current={$page.url.pathname === '/' ? 'page' : undefined} >
            Home
            </a>
            <a href="/about" on:click={() =>open=false } class="block mt-16 text-[#000] font-semibold hover:text-[#105D97]text-lg" aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
            About
            </a>
            <a href="/challenge" on:click={() =>open=false } class="block mt-16 text-[#000] font-semibold	 hover:text-[#105D97]text-lg " aria-current={$page.url.pathname.startsWith('/challenge') ? 'page' : undefined} >
            Challenge of the Month
            </a>
            <a href="/contact" on:click={() =>open=false } class="text-base mt-16 font-semibold inline-block px-8 py-4 leading-none border rounded text-[#000] border-[#000] hover:border-[#105D97] hover:text-[#105D97] hover:bg-[#fff]" aria-current={$page.url.pathname.startsWith('/contact') ? 'page' : undefined}>Contact</a>
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
