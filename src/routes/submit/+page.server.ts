const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = import.meta.env.VITE_DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI;

let disco_access_token;
let disco_refresh_token;

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, fetch , cookies, url }) => {

        disco_access_token = cookies.get('disco_access_token');
        disco_refresh_token = cookies.get('disco_refresh_token');

        if(disco_refresh_token && !disco_access_token){
            // initializing data object to be pushed to Discord's token endpoint.
            // quite similar to what we set up in callback.js, expect with different grant_type.
            const dataObject = {
                client_id: DISCORD_CLIENT_ID,
                client_secret: DISCORD_CLIENT_SECRET,
                grant_type: 'refresh_token',
                redirect_uri: DISCORD_REDIRECT_URI,
                refresh_token: disco_refresh_token,
                scope: 'identify email guilds'
            };

            // performing a Fetch request to Discord's token endpoint
            const request = await fetch('https://discord.com/api/oauth2/token', {
                method: 'POST',
                body: new URLSearchParams(dataObject),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            const response = await request.json();

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

        //code to search Challengers in strapi api and compare with username.

        //code to POST formdata to rundata, to submit the run.

        //code to POST rundata to challengers, to link the run with the challenger.



        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        // TODO log the user in
    }
};