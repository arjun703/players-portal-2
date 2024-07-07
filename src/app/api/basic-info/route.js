import { databaseConnection, getLoggedInUsername,generateToken, executeQuery} from '@/app/api/utils'
import { isPremium } from '../is_premium';
import { listItemAvatarClasses } from '@mui/material';

export  async function PUT(request) {

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

        const connection = await databaseConnection()

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
    }
}

export  async function GET(request) {

    const { searchParams } = new URL(request.url)
    const userName = searchParams.get('username')
    let connection  = false
    try {

        // Save the title and filenames in the MySQL database
        const query = `SELECT * from basic_info 
            WHERE username = '${userName}'
        `;
        
        connection = await databaseConnection()

        const is_premium = await isPremium(connection)

        const limitedAccess = userName != getLoggedInUsername()  && !is_premium 

        let basic_info = {};

        if(!limitedAccess){
            basic_info = await executeQuery(connection, query);
        }

        return new Response(JSON.stringify({limitedAccess:limitedAccess, success: true,editable: getLoggedInUsername() == userName,  basic_info: basic_info }), {
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