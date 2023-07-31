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

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, fetch , cookies, url }) => {
        let disco_access_token = cookies.get('disco_access_token');
        let disco_refresh_token = cookies.get('disco_refresh_token');
        console.log("Update Leaderboard, "+"Discord tokens: "+disco_access_token+" refreshtoken: "+disco_refresh_token)
        updateLeaderBoard()
        //update leaderboard function

        
    }
}

async function updateLeaderBoard(){
    //grab all score value for each user.
    const strapiUserSearch = await fetch(`https://api.soulsbornechallenges.com/api/challenges?populate=*`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${STRAPI_SERVER_ADMIN_TOKEN}`
        }
      })

    const strapiResponse = await strapiUserSearch.json();
    leaderboard = [];


    strapiResponse.data.forEach(async element => {
        let bodyContent = {
            "username": element.attributes.username,
            "score": element.attributes.score,
            "runsCompleted": element.attributes.runsCompleted,
        }

        const res = await fetch('http://api.soulsbornechallenges.com/api/leaderboard',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${STRAPI_SERVER_ADMIN_TOKEN}`
            },
            body: JSON.stringify({data:bodyContent}),
        })
        const responseJson = await res.json()
        console.log(responseJson)
    })


    //save leaderboard in db.
    //write to static leaderBoard when wanting to cache it.
}


async function checkAccessToken(){

}