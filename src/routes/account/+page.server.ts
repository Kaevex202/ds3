const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = import.meta.env.VITE_DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI;
const DISCORD_API_URL = import.meta.env.VITE_DISCORD_API_URL;



/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function load({url, cookies}) {
    const access_token = cookies.get("disco_access_token");
    const refresh_token = cookies.get("disco_refresh_token");

    if (refresh_token && !access_token){
        const discord_request = await fetch(`https://soulsbornchallenges.com/api/refresh?code=${refresh_token}`);
        const discord_response = await discord_request.json();

        if (discord_response.disco_access_token) {
            console.log('setting discord user via refresh token..')
            const request = await fetch(`${DISCORD_API_URL}/users/@me`, {
              headers: { 'Authorization': `Bearer ${discord_response.disco_access_token}` }
            });
            const response = await request.json();

            return response;
        }
    }


    if (access_token) {
        console.log('setting discord user via refresh token..')
        const request = await fetch(`${DISCORD_API_URL}/users/@me`, {
          headers: { 'Authorization': `Bearer ${access_token}` }
        });
    
        // returns a discord user if JWT was valid
        const response = await request.json();
        return response;
    }
}