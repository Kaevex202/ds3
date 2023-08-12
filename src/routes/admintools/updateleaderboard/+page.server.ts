const DISCORD_API_URL = import.meta.env.VITE_DISCORD_API_URL;
const STRAPI_SERVER_ADMIN_TOKEN = import.meta.env.VITE_STRAPI_SERVER_ADMIN_TOKEN;
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;


let userid: String;
let leaderboard = [];

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function load({url, cookies}) {
    const access_token = cookies.get("disco_access_token");
    const refresh_token = cookies.get("disco_refresh_token");

    if (refresh_token && !access_token){
        //Add code to regain access token here
        console.log("No access token, log out and log in again.");
    }
    

    if (access_token) {
        console.log('setting discord user via refresh token..')
        const request = await fetch(`${DISCORD_API_URL}/users/@me`, {
          headers: { 'Authorization': `Bearer ${access_token}` }
        });
    
        // returns a discord user if JWT was valid
        const discordResponse = await request.json();
        if (discordResponse.username == ADMIN_USERNAME)
        {
            return {
                discordResponse: discordResponse,
                status: 200,
              };
        }
        else{
            return{
                status: 401
            }
        }
    }
}


