import mysql from 'mysql2';
import {  getLoggedInUsername,databaseConnection, generateToken, executeQuery} from '@/app/api/utils'

export  async function GET(request) {

    const loggedinUser = getLoggedInUsername()
    let connection = false
    try {

        // Save the title and filenames in the MySQL database
        const query = `
            SELECT only_club.username, profile_pic, info FROM users 
            INNER JOIN only_club ON users.username = only_club.username AND only_club.username = '${getLoggedInUsername()}'
        `;

         connection = await databaseConnection();

        let club = await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(new Error('Error fetching data from database: ' + error.message));
                } else {
                    resolve(results);
                }
            });
        });

        if(club.length){
            club = club[0]
        }

        const clubMemberQuery = `
            SELECT athlete_username	, name, profile_pic FROM club_athlete 
            INNER JOIN basic_info ON basic_info.username = club_athlete.athlete_username AND club_athlete.club_username = '${getLoggedInUsername()}'
            INNER JOIN users ON users.username=club_athlete.athlete_username
        `;

        const playersInClub = await new Promise((resolve, reject) => {
            connection.query(clubMemberQuery, (error, results) => {
                if (error) {
                    reject(new Error('Error fetching data from database: ' + error.message));
                } else {
                    resolve(results);
                }
            });
        });


        return new Response(JSON.stringify({success: true, club: club, playersInClub: playersInClub }), {
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
