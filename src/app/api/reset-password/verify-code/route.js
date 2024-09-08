import { executeQuery, databaseConnection } from "../../utils"

export async function POST(request){
    
    let connection = false

    try {

        const data = await request.formData()

        const email = data.get('email')
        const code = data.get('code')

        connection = await databaseConnection();

        const codeCheckQuery = `
            SELECT * from verification_codes WHERE email = '${email}' AND code ='${code}'
        `;

        const results = await executeQuery(connection, codeCheckQuery)

        if(results.length === 1){
            if(results[0].email === email && results[0].code === code){
                return new Response(JSON.stringify({ success: true, msg: 'Code verified'  }), {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    status: 200
                }); 
            }
        }

        throw new Error('Incorrect code')

    }catch(error){

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