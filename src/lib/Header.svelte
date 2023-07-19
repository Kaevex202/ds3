<script lang="ts">
	import { page } from '$app/stores';
    import logo from '$lib/images/alogo-4.svg'
	import {Hamburger} from 'svelte-hamburgers'
	import { username , avatarUrl , loggedIn} from './stores';

	import MobileMenu from './MobileMenu.svelte';

	let dropdownExpanded = false;

	console.log($username)
	console.log({$username})

	function expandMenu(){
		dropdownExpanded = !dropdownExpanded
	}

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
	{#if {$username}.length > 0}
		<div id="userInfo" >
			<button
			on:click={expandMenu}
			id="loggedIn"
			class="mr-8 flex flex-row items-center border px-4 py-2 rounded-xl bg-blue-200 hover:bg-blue-300 focus:ring-2 focus:outline-none focus:ring-blue-300 text-black"
			type="button"
			>
				<img src="https://cdn.discordapp.com/avatars/125998088409055233/${avatarUrl}.png" alt="your Discord profile" class="rounded-full mr-4" height=40 width=40 />
				<h4 class="font-bold text-lg">{username}</h4>
				<svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
				</svg>
			</button>
			{#if dropdownExpanded}
				<div id="dropdown" class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute">
					<ul class="py-2 text-sm text-gray-700 dark:text-gray-200" >
					<li>
						<a href="/account" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" on:click={expandMenu}>Account</a>
					</li>
					<li>
						<a href="/auth/discord/signout" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" on:click={expandMenu}>Logout</a>
					</li>
					</ul>
				</div>
			{/if}
		</div>
	{/if}
</div>
</header>

<style>
</style>
