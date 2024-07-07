import {  getLoggedInUsername,databaseConnection, generateToken, executeQuery} from '@/app/api/utils'

export  async function GET(request) {

    const loggedinUser = getLoggedInUsername()
    let connection = false
    try {

        // Save the title and filenames in the MySQL database
        const query = `
            SELECT only_coach.username, profile_pic, info FROM users 
            INNER JOIN only_coach ON users.username = only_coach.username AND only_coach.username = '${getLoggedInUsername()}'
        `;

        connection = await databaseConnection();

        let coach = await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(new Error('Error fetching data from database: ' + error.message));
                } else {
                    resolve(results);
                }
            });
        });

        if(coach.length){
            coach = coach[0]
        }

        const trackedPlayerQuery = `
            SELECT athlete_username, profile_pic, name FROM coach_athlete 
            INNER JOIN basic_info ON basic_info.username = coach_athlete.athlete_username AND coach_athlete.coach_username = '${getLoggedInUsername()}'
            INNER JOIN users ON users.username=coach_athlete.athlete_username
            `;

        const trackedPlayers = await new Promise((resolve, reject) => {
            connection.query(trackedPlayerQuery, (error, results) => {
                if (error) {
                    reject(new Error('Error fetching data from database: ' + error.message));
                } else {
                    resolve(results);
                }
            });
        });


        return new Response(JSON.stringify({success: true, coach: coach, trackedPlayers: trackedPlayers }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ success: false, msg: error.message  }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });
    }finally{
        if(connection){
            connection.end()
        }
    }
}
