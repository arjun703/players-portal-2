import { executeQuery, databaseConnection } from "../utils"
import { hashPassword } from "../utils"

export async function POST(request){
    
    let connection = false

    try {

        const data = await request.formData()

        const email = data.get('email')
        const code = data.get('verificaiton_code')
        const newPassword = data.get('new_password')

        connection = await databaseConnection();

        const codeCheckQuery = `
            SELECT * from verification_codes WHERE email = '${email}' AND code ='${code}'
        `;

        const results = await executeQuery(connection, codeCheckQuery)

        if(results.length === 1){

            if(results[0].email === email && results[0].code === code){

                const hashedPassword  = await hashPassword(newPassword)

                const query = `UPDATE users SET password = '${hashedPassword}' WHERE email = '${email}' `
                
                const result = await executeQuery(connection, query)
                
                return new Response(JSON.stringify({ success: true, msg: 'Password changed successfully'}), {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    status: 201
                });
            }
        }

        throw new Error('Something went wrong, try again later')

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