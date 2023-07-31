import { writeFileSync } from 'fs';

/** @type {import('./$types').LayoutServerLoad} */
export async function GET({ cookies }) {


    let jsonData = [
        {
            "Kaevex":{
                "id":1,
                "score":2400,
                "runsCompleted": 3
            },
            "FudgeQT":{
                "id":3,
                "score":1200,
                "runsCompleted":1
            }
        }
    ];
    
    writeFileSync('../../../leaderboard.json', JSON.stringify(jsonData), 'utf8')
    
    return new Response(
    );
}
