const STRAPI_SERVER_ADMIN_TOKEN = import.meta.env.VITE_STRAPI_SERVER_ADMIN_TOKEN;

let verifiedRunIDs = ["25","22"];
let verifiedRunIDsParameter = "";
let challengerInformation = [];
let verifiedRuns: { id: any; username: any; video: any; timeHr: any; timeMins: any; timeSecs: any; }[]=[];

export async function load({}) {

    verifiedRunIDs.forEach(element => {   
        verifiedRunIDsParameter = verifiedRunIDsParameter+ "&filters[id]="+element;
    });

    const runDataPopulate = await fetch(`https://api.soulsbornechallenges.com/api/rundata?${verifiedRunIDsParameter}&populate=*`, {
        method: 'GET',
        headers: {
        "Authorization": `Bearer ${STRAPI_SERVER_ADMIN_TOKEN}`
        }
    })

    const strapiRun = await runDataPopulate.json();
    const strapiRunData = strapiRun.data;

    verifiedRuns = [];
    strapiRun.data.forEach(element =>{
        let test = element.attributes.challenger.data.attributes.username;
        verifiedRuns.push({id:element.id,username:test,video:element.attributes.videoUrl,timeHr:element.attributes.timeHr,timeMins:element.attributes.timeMins,timeSecs:element.attributes.timeSecs})
        })

    return {
        verifiedRuns
    }
}
