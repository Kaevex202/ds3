const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = import.meta.env.VITE_DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI;
const STRAPI_SERVER_ADMIN_TOKEN = import.meta.env.VITE_STRAPI_SERVER_ADMIN_TOKEN;
import { page } from '$app/stores';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, cookies }) {

  // fetch returnCode set in the URL parameters.
  const returnCode = url.searchParams.get('code')

  // initializing data object to be pushed to Discord's token endpoint.
  // the endpoint returns access & refresh tokens for the user.
  const dataObject = {
    client_id: DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: DISCORD_REDIRECT_URI,
    code: returnCode,
    scope: 'identify email'
  };

  // performing a Fetch request to Discord's token endpoint
  const request = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams(dataObject),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  const response = await request.json();

  // redirect to front page in case of error
  if (response.error) {
    console.log('redirect to / due error');
    return {
      headers: { Location: '/' },
      status: 302
    }
  }

  // redirect user to front page with cookies set
  const access_token_expires_in = new Date(Date.now() + response.expires_in); // 10 minutes
  const refresh_token_expires_in = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  console.log('redirect to / with cookies');


  cookies.set('disco_access_token', response.access_token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
  cookies.set('disco_refresh_token', response.refresh_token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });


const discordinfo = await fetch('https://discord.com/api/users/@me', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${response.access_token}`
      }
  });

  const discordUserInfo = await discordinfo.json();


  const strapiChallengeInfo = {
    data:{
      username: discordUserInfo.username,
      avatarurl: discordUserInfo.id+"/"+discordUserInfo.avatar,
      discordId: discordUserInfo.id,
      lastLogin: new Date(Date.now())
    }
  }

    //Check if a challengeRunner exist with that specific discord id.
    const strapiChallengerSearch = await fetch(`https://api.soulsbornechallenges.com/api/challenges?filters[discordId]=`+discordUserInfo.id, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${STRAPI_SERVER_ADMIN_TOKEN}`
      }
    })

    const strapiChallengerSearchData = await strapiChallengerSearch.json();

    console.log(strapiChallengerSearchData.data);

    let addNewChallenger;
    if (strapiChallengerSearchData.data.length == 0){
      console.log(JSON.stringify(strapiChallengeInfo))
      addNewChallenger = await fetch('https://api.soulsbornechallenges.com/api/challenges', {
        method: 'POST',
        body: JSON.stringify(strapiChallengeInfo),
        headers: { 'Content-Type': 'application/json',
        "Authorization": `Bearer ${STRAPI_SERVER_ADMIN_TOKEN}` }
      });
      console.log(addNewChallenger.json())
    }

  return {
    discordUserInfo,
    status: 302
  }
}
