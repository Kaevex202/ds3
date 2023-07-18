<script lang="ts">
	import { page } from '$app/stores';
    import logo from '$lib/images/alogo-4.svg'
	import {Hamburger} from 'svelte-hamburgers'
	import { username , avatarUrl , loggedIn} from './stores';

	import MobileMenu from './MobileMenu.svelte';

	let open;
</script>

<header>

	<nav class="inline-flex lg:flex items-center justify-between flex-wrap p-6 w-full lg:w-[85%] mx-auto">
		<div id="logo" class="flex items-center flex-shrink-0 text-white mr-6 flex-[100] w-fit h-1/2">
			<a href="/" aria-current={$page.url.pathname === '/' ? 'page' : undefined}><h1 class="w-full hidden lg:flex lg:text-4xl font-black px-6 lg:px-0 text-black">SOULSBORNECHALLENGES</h1></a>
			<a href="/" aria-current={$page.url.pathname === '/' ? 'page' : undefined}><h1 class="w-full flex lg:hidden text-lg text-black font-black items-start">SOULSBORNECHALLENGES</h1></a>
		</div>


	

		<div class="w-full block flex-grow hidden lg:flex lg:items-center lg:w-auto font-medium">
			<div class="text-sm lg:flex-grow inline-flex" >
				{#if $loggedIn == "true"}<h4>{$username}</h4>{/if}
				<a href="/about" class="block mt-4 lg:inline-block lg:mt-0 text-[#000] hover:text-[#105D97] mr-12 text-lg" aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				About
				</a>
				<a href="/leaderboards" class="block mt-4 lg:inline-block lg:mt-0 text-[#000] hover:text-[#105D97] mr-12 text-lg" aria-current={$page.url.pathname === '/leaderboards' ? 'page' : undefined}>
					Leaderboards
					</a>
				<a href="/challenge" class="block mt-4 lg:mt-0 text-[#000] hover:text-[#105D97] mr-12 text-lg" aria-current={$page.url.pathname.startsWith('/challenge') ? 'page' : undefined} >
				Challenge of the Month
				</a>
				<a href="/contact" class="text-base font-semibold inline-block px-4 py-2 leading-none border rounded text-[#000] border-[#000] hover:border-[#105D97] hover:text-[#105D97] hover:bg-[#fff] mt-4 lg:mt-0" aria-current={$page.url.pathname.startsWith('/contact') ? 'page' : undefined}>Contact</a>
			</div>
		</div>
		<div class="lg:hidden"><Hamburger bind:open /></div></nav>

		<MobileMenu bind:open />
</header>

<style>
</style>
