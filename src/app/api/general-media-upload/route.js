import {  generateRandomString} from '@/app/api/utils'
import path from 'path';
import {writeMediasAndAttachments} from '@/app/api/file/write'

export  async function POST(request) {
    
    try {

        const data = await request.formData()

        const media = data.get('media')

        const mediaName = generateRandomString(20) + path.extname(media.name);

        const mediaLocation = await writeMediasAndAttachments(process.env.USER_GENERATED_MEDIA_FOLDER+'/'+mediaName, media)

        return new Response(JSON.stringify({ success: true, media_location:  mediaLocation }), {
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
