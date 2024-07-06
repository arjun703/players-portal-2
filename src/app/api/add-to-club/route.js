import { databaseConnection, getLoggedInUsername,generateToken, executeQuery} from '@/app/api/utils'
import basicInfo from '@/app/view-profile/[username]/_basic-info/general_info'

export  async function PUT(request) {
    let connection = false
    try {   

        const data = await request.formData()

        const info = data.get('info')
        
        const infoJSON = JSON.parse(info)

        const name = infoJSON?.name || ''
        const gender = infoJSON?.gender || ''

        if(name.trim().length === 0){
            throw new Error('Fill sport fields')
        }

        const username = getLoggedInUsername();

        // Save the title and filenames in the MySQL database
        const query = `
            INSERT INTO basic_info(username, info, name, gender) VALUES (
                '${username}', '${info}', '${name}', '${gender}'
            )
            ON DUPLICATE KEY UPDATE 
                username = VALUES(username),
                info = VALUES(info),
                name = VALUES(name),
                gender = VALUES(gender)
        `;

        connection = await databaseConnection()

        const isCreationSuccess = await executeQuery(connection, query);

        if(isCreationSuccess){

            return new Response(JSON.stringify({ success: true}), {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 201
            });

        }else{
            throw new Error('Unknown error occured while editing basic info. Plese try again later. Error Code: BasicInfoUpsert')
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

export  async function GET(request) {

    const { searchParams } = new URL(request.url)
    const userName = searchParams.get('username')

    const action = searchParams.get('action')
    let connection = false
    try {
        connection = await databaseConnection()

        // Save the title and filenames in the MySQL database
        const query = `SELECT athlete_username from club_athlete 
            WHERE club_username = '${getLoggedInUsername()}' AND athlete_username = '${userName}'
        `;
        

        const basic_info = await executeQuery(connection, query);

        if(action){
            var query2 = ''
            if(action == 'add' && basic_info.length == 0){

                query2 = `INSERT INTO club_athlete (club_username, athlete_username) 
                    VALUES ('${getLoggedInUsername()}', '${userName}') 
                `

            }else if(action =='remove' && basic_info.length == 1){
                query2 = `DELETE FROM   club_athlete
                   WHERE club_username='${getLoggedInUsername()}' AND athlete_username = '${userName}'
                `

            }
            if(query2 != ''){
                await executeQuery(connection, query2);
            }

        }

        connection.end()

        return new Response(JSON.stringify({ success: true, editable: getLoggedInUsername() == userName,  basic_info: basic_info }), {
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