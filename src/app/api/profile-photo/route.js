import { databaseConnection, getLoggedInUsername,generateToken, executeQuery} from '@/app/api/utils'
import basicInfo from '@/app/view-profile/[username]/_basic-info/general_info'

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

    try {

        // Save the title and filenames in the MySQL database
        const query = `SELECT name, profile_pic from users
            INNER JOIN basic_info ON basic_info.username = users.username AND basic_info.username = '${userName}'
        `;
        
        const connection = await databaseConnection()

        let basic_info = await executeQuery(connection, query);

        if(basic_info.length){
            basic_info = basic_info[0]
        }else{
            basic_info = false
        }

        connection.end()

        return new Response(JSON.stringify({ success: true,editable: getLoggedInUsername() == userName,  basic_info: basic_info }), {
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