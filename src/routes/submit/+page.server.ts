const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = import.meta.env.VITE_DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI;
const STRAPI_SERVER_ADMIN_TOKEN = import.meta.env.VITE_STRAPI_SERVER_ADMIN_TOKEN;


let disco_access_token;
let disco_refresh_token;

let game = "";
let category = "";
let glitchless ="";
let glitches:boolean;
let weapon = "";
let startingClass = "";
let statRestriction = "";
let challenge = "";
let hardcoreChallenge = "";
let randomizerOption = "";
let videoUrl = "";
let timeHr;
let timeMins:number;
let timeSecs:number;
let comment:number;
let username = "";


/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, fetch , cookies, url }) => {

        disco_access_token = cookies.get('disco_access_token');
        disco_refresh_token = cookies.get('disco_refresh_token');
        console.log("Discord tokens: "+disco_access_token+" refreshtoken: "+disco_refresh_token);

        if(disco_refresh_token && !disco_access_token){
            // initializing data object to be pushed to Discord's token endpoint.
            // quite similar to what we set up in callback.js, expect with different grant_type.
            const dataObject = {
                client_id: DISCORD_CLIENT_ID,
                client_secret: DISCORD_CLIENT_SECRET,
                grant_type: 'refresh_token',
                redirect_uri: DISCORD_REDIRECT_URI,
                refresh_token: disco_refresh_token,
                scope: 'identify email'
            };

            // performing a Fetch request to Discord's token endpoint
            const request = await fetch('https://discord.com/api/oauth2/token', {
                method: 'POST',
                body: new URLSearchParams(dataObject),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            const response = await request.json();

            console.log(response);

            // Set cookie with discord access token
            cookies.set('disco_access_token', response.access_token, {
                httpOnly: true,
                sameSite: 'strict',
                secure: false,
                path: '/',
                maxAge: 60 * 10
              });

              disco_access_token = response.access_token;
        }

        //Code to get discordid from discord backend & compare username with localstorage username.
        const discordinfo = await fetch('https://discord.com/api/users/@me', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${disco_access_token}`
            }
        });
        const discordUserInfo = await discordinfo.json();
        
        //code to search Challengers in strapi api and compare with username.
        const verifyChallenger = await fetch('https://api.soulsbornechallenges.com/api/challenges?filters[discordId]='+discordUserInfo.id, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${STRAPI_SERVER_ADMIN_TOKEN}`
            }
        });

        const verifychallengerInfo = await verifyChallenger.json();
        console.log(verifychallengerInfo.data[0].attributes.discordId);

        const formData = await request.formData();
        game = formData.get('game');
        category = formData.get('category')?.toString();
        glitchless = formData.get('glitchless');
        if (glitchless == "on"){glitches = false}
        else if(glitchless !== "on"){glitches=true}
        weapon = formData.get('startingweapon');
        startingClass = formData.get('class');
        statRestriction = formData.get('stat restriction');
        challenge = formData.get('challenge');
        hardcoreChallenge = formData.get('hardcoreChallenge');
        randomizerOption = formData.get('randomizerOption');
        videoUrl = formData.get('videoURL');
        timeHr = formData.get('timeHr');
        timeMins = formData.get('timeMins');
        timeSecs = formData.get('timeSecs');
        comment = formData.get('comment');
        const time = new Date(Date.now())
        username = discordUserInfo.username;


        let bodyContent = {
              "game": game,
              "category": category,
              "glitchless": glitches,
              "startingWeapon": weapon,
              "class": startingClass,
              "statRestriction": statRestriction,
              "challenge": challenge,
              "hardcoreChallenge": hardcoreChallenge,
              "randomizerType": randomizerOption,
              "videoUrl": videoUrl,
              "timeHr": timeHr || null,
              "timeMins": timeMins || null,
              "timeSecs": timeSecs || null,
              "comment": comment,
              "username": username,
              "submissionDate": time
          }


        if (discordUserInfo.id !== verifychallengerInfo.data[0].attributes.discordId){
            return {
                error: "discordId does not match",
                status: 500
            }
        }
        else if(discordUserInfo.id == verifychallengerInfo.data[0].attributes.discordId)
        {
            //Post formData to api backend with POST request.
            const res = await fetch('https://api.soulsbornechallenges.com/api/rundata',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${STRAPI_SERVER_ADMIN_TOKEN}`
                },
                body: JSON.stringify({data:bodyContent}),
            })
            const responseJson = await res.json()
            console.log(responseJson)
            return{
                body: responseJson,
                succes: true,
            }
        }
    }
};