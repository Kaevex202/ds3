<script lang="ts">
	import { page } from '$app/stores';
	import {Hamburger} from 'svelte-hamburgers'
	import { username } from './stores';
	import LoggedInIcon from './LoggedInIcon.svelte';

	import MobileMenu from './MobileMenu.svelte';
	let open;
</script>

<header>
	<div class="w-full flex items-center">
	<nav class="inline-flex lg:flex justify-between flex-wrap p-6 w-full lg:w-[85%] mx-auto h-min items-center">
		<div id="logo" class="flex items-center flex-shrink-0 text-white mr-6 flex-[100] w-fit h-1/2">
			<a href="/" aria-current={$page.url.pathname === '/' ? 'page' : undefined}><h1 class="w-full hidden lg:flex lg:text-4xl font-black px-6 lg:px-0 text-black ">SOULSBORNECHALLENGES</h1></a>
			<a href="/" aria-current={$page.url.pathname === '/' ? 'page' : undefined}><h1 class="w-full flex lg:hidden text-lg text-black font-black items-start">SOULSBORNECHALLENGES</h1></a>
		</div>


	

		<div class="w-full block flex-grow hidden lg:flex lg:w-auto font-medium ml-8">
			<div class="text-sm lg:flex-grow inline-flex items-center" >
				<a href="/about" class="block mt-4 lg:inline-block lg:mt-0 text-[#000] hover:text-[#105D97] mr-12 text-lg" aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				About
				</a>
				<a href="/leaderboards" class="block mt-4 lg:inline-block lg:mt-0 text-[#000] hover:text-[#105D97] mr-12 text-lg" aria-current={$page.url.pathname === '/leaderboards' ? 'page' : undefined}>
					Leaderboards
					</a>
				<a href="/challenge" class="block mt-4 lg:mt-0 text-[#000] hover:text-[#105D97] mr-12 text-lg" aria-current={$page.url.pathname.startsWith('/challenge') ? 'page' : undefined} >
				Challenge of the Month
				</a>
				<a href="/contact" class=" hidden text-base font-semibold inline-block px-4 py-2 h-min leading-none border rounded text-[#000] border-[#000] hover:border-[#105D97] hover:text-[#105D97] hover:bg-[#fff] mt-4 lg:mt-0" aria-current={$page.url.pathname.startsWith('/contact') ? 'page' : undefined}>Contact</a>
			</div>
		</div>
		<div class="lg:hidden"><Hamburger bind:open /></div>


		<MobileMenu bind:open />
	</nav>
	{#if $username.length > 0}
		<LoggedInIcon/>
	{/if}
</div>
</header>

<style>
</style>
