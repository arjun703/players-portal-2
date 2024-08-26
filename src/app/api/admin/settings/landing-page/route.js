import {writeJsonFile} from '@/app/api/file/write'

export  async function POST(request) {

    try {

        const formdata = await request.formData()

        const data = formdata.get('data')

        const dataJson = JSON.parse(data)

        const fileLocation = await writeJsonFile(process.env.SITE_SETTINNGS_FOLDER+'/'+'landing_page_settings.json', dataJson)



        return new Response(JSON.stringify({ success: true, fileLocation: fileLocation}), {
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
    }
}

export  async function GET(request) {

    try {

        const fileLocation = process.env.S3_COMPATIBLE_SPACES_ORIGIN_URL 
                                + '/' 
                                + process.env.SITE_SETTINNGS_FOLDER
                                + '/'
                                + 'landing_page_settings.json'
                            ;

        const settings = await fetch(fileLocation)

        const settingsJson = await settings.json()

        return new Response(JSON.stringify({settings :settingsJson, success: true }), {
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