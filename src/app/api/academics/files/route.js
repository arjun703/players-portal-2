import {generateRandomString,databaseConnection, getLoggedInUsername} from '@/app/api/utils'
import path from 'path';
import {writeMediasAndAttachments} from '@/app/api/file/write'

export  async function POST(request) {

    await  new Promise((resolve, reject)=> setTimeout(()=> resolve(), 1000))

    try {

        const data = await request.formData()

        const type = data.get('type')

        const file = data.get('file')

        const description = data.get('description')
       
        if(type.trim().length == 0 || !(file.name)){
            throw new Error('Error - Empty title')
        }

        const id=generateRandomString(20)
        const fileName = generateRandomString(20) + path.extname(file.name);

        const fileLocation = await writeMediasAndAttachments(process.env.USER_GENERATED_MEDIA_FOLDER+'/'+fileName, file)

        const info={type: type, file_src: fileLocation, description: description}
        
        // Save the title and filenames in the MySQL database
        const query = `INSERT INTO academic_files 
            (id, user_id, info ) 
            VALUES 
            ('${id}', '${getLoggedInUsername()}', '${JSON.stringify(info)}' )
        `;
        const connection = await databaseConnection();

        connection.query(query, (error, results) => {
            if (error) {
                throw new Error('Error inserting data into database- '+ error.message);
            } 
        });

        return new Response(JSON.stringify({ success: true, academicFile: {
            id: id, info: info
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
    }
}
export  async function PUT(request) {

    await  new Promise((resolve, reject)=> setTimeout(()=> resolve(), 1000))


    try {

        const data = await request.formData()

        const academicInfo = JSON.parse(data.get('academic_info'))

        const id = academicInfo.id
        const info = academicInfo.info

        // Save the title and filenames in the MySQL database
        const query = `UPDATE  academic_files 
            SET info = '${JSON.stringify(info)}' 
            WHERE id = '${id}'
        `;

        const connection = await databaseConnection();

        connection.query(query, (error, results) => {
            if (error) {
                throw new Error('Error inserting data into database- '+ error.message);
            } 
        });

        return new Response(JSON.stringify({ success: true, academicFile: {
            id: id, info: info
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
    }
}


export async function DELETE(request) {

    await  new Promise((resolve, reject)=> setTimeout(()=> resolve(), 1000))

    try {
        const data = await request.formData()
        const academic_info_id = data.get('academic_info_id')
        // Save the title and filenames in the MySQL database
        const query = `UPDATE  academic_files 
            SET is_active = 0 
            WHERE id = '${academic_info_id}' AND user_id='${getLoggedInUsername()}'
        `;
        const connection = await databaseConnection();

        const result = await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(new Error('Error deleting the video: ' + error.message));
                } else {
                    resolve(results);
                }
            });
        });

        const successStatus  = result.affectedRows > 0

        return new Response(JSON.stringify({ success: successStatus, academic_info_id: academic_info_id }), {
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