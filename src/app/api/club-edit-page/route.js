import mysql from 'mysql2';
import {  getLoggedInUsername,databaseConnection, generateToken, executeQuery} from '@/app/api/utils'

export  async function GET(request) {

    const loggedinUser = getLoggedInUsername()

    try {
        // Save the title and filenames in the MySQL database
        const query = `
            SELECT only_club.username,email, sport_type, info FROM users 
            INNER JOIN only_club ON users.username = only_club.username AND only_club.username = '${getLoggedInUsername()}'
        `;

        const connection = await databaseConnection();

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
        }else{
            club = false
        }

        return new Response(JSON.stringify({success: true, club: club}), {
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
    }
}

export  async function POST(request) {
    let connection =false
    try {

        const data = await request.formData()

        const club = JSON.parse(data.get('info'))

        const name = club.name
        const email = club.email
        const sport_type = club.sport_type

        if(name.trim().length === 0 || email.trim().length === 0 || sport_type.trim().length == 0){
            throw new Error('Fill all fields')
        }
        
        const loggedinUser= getLoggedInUsername();

        // Save the title and filenames in the MySQL database
        const query = `
            UPDATE users 
                SET
                    email = '${email}'
                WHERE
                    username = '${loggedinUser}'
        `;

        connection = await databaseConnection()

        const isCreationSuccess = await executeQuery(connection, query);

        if(isCreationSuccess){
            
            const basicInfoInsertQuery = `
                UPDATE  only_club
                    SET
                        info = '${JSON.stringify(club)}',
                        sport_type = '${sport_type}'
                    WHERE
                        username = '${loggedinUser}'
            `

            const isBasicInfoInsertionSuccess = await executeQuery(connection, basicInfoInsertQuery)

            if(isBasicInfoInsertionSuccess){


                return new Response(JSON.stringify({ success: true}), {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    status: 201
                });

            }else{
                throw new Error('Unknown error Editing club info. Plese try again later. ErrorCode: basicInfoInsertQuery ')
            }

        }else{
            throw new Error('Unknown error editing club info. Plese try again later. Error Code: userInsertQuery')
        }

    } catch (error) {
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