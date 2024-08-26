import { databaseConnection, generateToken, executeQuery, hashPassword, comparePassword} from '@/app/api/utils'
import { cookies } from 'next/headers'

export  async function POST(request) {
    let connection = false
    try {

        const data = await request.formData()

        const username = data.get('username')
        const password = data.get('password')

        // Save the title and filenames in the MySQL database
        const query = `SELECT * from admins WHERE username ='${username}'`;
        
        const connection = await databaseConnection()

        const results = await executeQuery(connection, query);
        
        // console.log("results", results, query)

        if(results.length){
            const user = results[0]
            const match = await comparePassword(password, user.password)
            if(match === true){
                const token = generateToken(user.username, 'admin')
                cookies().set('admin_token', token)
                return new Response(JSON.stringify({ success: true, msg: 'Login Successful' }), {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    status: 201
                });
            }else{
                throw new Error('Incorrect username or password')
            }
        }else{
            const pass = await hashPassword(password)
            throw new Error('Incorrect username or password')
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