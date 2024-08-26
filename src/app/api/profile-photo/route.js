import { databaseConnection, generateRandomString, getLoggedInUsername,generateToken, executeQuery} from '@/app/api/utils'
import path from 'path';
import {writeMediasAndAttachments} from '@/app/api/file/write'

export  async function POST(request) {

    let connection = false

    try {

        const data = await request.formData()

        const profile_photo = data.get('profile_photo')

        const id=generateRandomString(20)
        const profile_photoFileName = generateRandomString(20) + path.extname(profile_photo.name);
       
        if( !(['.jpg', '.jpeg', '.png', '.gif', '.bmp'].includes(path.extname(profile_photo.name.toLowerCase())))){
            throw new Error('Error - Invalid image format. Supported types are jpg, png, gif, bmp')
        }
        
        const profilePhotoLocation = await writeMediasAndAttachments(process.env.USER_GENERATED_MEDIA_FOLDER+'/'+profile_photoFileName, profile_photo)

        // Save the title and filenames in the MySQL database
        const query = `UPDATE users SET profile_pic = '${profilePhotoLocation}' WHERE username = '${getLoggedInUsername()}'  
        `;

        connection = await databaseConnection();

        const result = await executeQuery(connection, query);

        return new Response(JSON.stringify({ success: true, profile_photo: {
            profile_photo_src: profilePhotoLocation
        }}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201
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