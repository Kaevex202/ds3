<script>
import { username , avatarurl} from './localstores';

let dropdownExpanded = false;

function expandMenu(){
    dropdownExpanded = !dropdownExpanded
}
</script>

<div id="userInfo" class="">
    <button
    on:click={expandMenu}
    id="loggedIn"
    class="mr-8 flex flex-row items-center justify-evenly border 2xl:w-[7vw] xl:w-[9vw] lg:w-[12vw] items-center py-2 rounded-xl bg-blue-200 hover:bg-blue-300 focus:ring-2 focus:outline-none focus:ring-blue-300 text-black"
    type="button"
    >
        <img src="{$avatarurl}" alt="your Discord profile" class="rounded-full mr-4" height=40 width=40 />
        <h4 class="font-bold text-lg">{$username}</h4>
        <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
    </button>
    {#if dropdownExpanded}
        <div id="dropdown" class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow 2xl:w-[7vw] xl:w-[9vw] lg:w-[12vw] absolute">
            <ul class="py-2 text-sm text-gray-700 " >
                <li>
                    <a href="/account" class="block px-4 py-2 hover:bg-gray-100 " on:click={expandMenu}>Account</a>
                </li>
                <li>
                    <a href="/submit" class="block px-4 py-2 hover:bg-gray-100 " on:click={expandMenu}>Submit a Run</a>
                </li>
                <li>
                    <a href="/auth/discord/signout" class="block px-4 py-2 hover:bg-gray-100 " on:click={expandMenu}>Logout</a>
                </li>
            </ul>
        </div>
    {/if}
</div>