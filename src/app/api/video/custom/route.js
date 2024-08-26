import {generateRandomString,databaseConnection, getLoggedInUsername} from '@/app/api/utils'
import path from 'path';
import { writeMediasAndAttachments } from '../../file/write';


export  async function POST(request) {

    let connection = false

    try {

        const data = await request.formData()

        const title = data.get('title')

        let video = data.get('video')
        let thumbNail = data.get('thumbnail')
        
        const id=generateRandomString(20)
        let thumbnailFileName = generateRandomString(20) + path.extname(thumbNail.name);
        let videoFileName = generateRandomString(20) + path.extname(video.name);
        
        if( !(['.jpg', '.jpeg', '.webp', '.png', '.gif', '.bmp'].includes(path.extname(thumbNail.name.toLowerCase())))){
            throw new Error('Error - Invalid image format. Supported types are jpg, png, gif, bmp')
        }
        
        if( !(['.mp4', '.webm', '.ogv', '.ogg', '.avi', '.wmv'].includes(path.extname(video.name.toLowerCase())))){
            throw new Error('Error - Invalid video format. Supported types are mp4, webm, ogv, ogg, avi, wmv')
        }

        if(title.trim().length == 0){
            throw new Error('Error - Empty title')
        }
        
        const thumbnailUploaded = await writeMediasAndAttachments(process.env.USER_GENERATED_MEDIA_FOLDER+'/'+thumbnailFileName, thumbNail)
        if(thumbnailUploaded === false){
            throw new Error('Error uploading thumbnail')
        }
        thumbnailFileName = thumbnailUploaded

        const videoUploaded = await writeMediasAndAttachments(process.env.USER_GENERATED_MEDIA_FOLDER+'/'+videoFileName, video)
        if(videoUploaded === false){
            throw new Error('Error uploading video')
        }
        videoFileName = videoUploaded

        // Save the title and filenames in the MySQL database
        const query = `INSERT INTO videos 
            (id, title, thumbnail_src, video_src, type, user_id) 
            VALUES 
            ('${id}', '${title}', '${thumbnailFileName}', '${videoFileName}', 'custom', '${getLoggedInUsername()}')
        `;

        connection = await databaseConnection();

        const thumbnail_src = thumbnailFileName

        connection.query(query, (error, results) => {
            if (error) {
                throw new Error('Error inserting data into database- '+ error.message);
            } 
        });
        
        return new Response(JSON.stringify({ success: true, video: {
            id: id, title: title, thumbnail_src: thumbnail_src, video_src: videoFileName, type: 'custom'
        }}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201
        });

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