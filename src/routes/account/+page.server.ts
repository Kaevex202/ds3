const DISCORD_API_URL = import.meta.env.VITE_DISCORD_API_URL;
const STRAPI_SERVER_ADMIN_TOKEN = import.meta.env.VITE_STRAPI_SERVER_ADMIN_TOKEN;


let userid: String;

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function load({url, cookies}) {
    const access_token = cookies.get("disco_access_token");
    const refresh_token = cookies.get("disco_refresh_token");

    if (refresh_token && !access_token){
        const discord_request = await fetch(`https://soulsbornechallenges.com/auth/discord/refresh?code=${refresh_token}`);
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
        const discordResponse = await request.json();

        console.log("discordresponse.id: "+discordResponse.id)
        //Check if a user exist with that specific discord id.
        const strapiUserSearch = await fetch(`https://api.soulsbornechallenges.com/api/challenges?filters[username]=`+discordResponse.username+'&populate=*', {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${STRAPI_SERVER_ADMIN_TOKEN}`
          }
        })

        const strapiResponse = await strapiUserSearch.json();

        return {
          discordResponse: discordResponse,
          strapiResponse: strapiResponse,
          status: 200,
        };
    }


}