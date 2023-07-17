const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI;
const DISCORD_ENDPOINT = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}&response_type=code&scope=identify%20email%20guilds`;
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';


/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function GET() {
	return {
    headers: { Location: DISCORD_ENDPOINT },
    status: 302
  }
  return ("test")
}
