import {generateRandomString,hashPassword, databaseConnection, getLoggedInUsername, executeQuery, comparePassword} from '@/app/api/utils'


export  async function POST(request) {

    let connection = false

    try {

        const data = await request.formData()

        const currentPassword = data.get('current_password')

        const newPassword = data.get('new_password')

        connection = await databaseConnection()

        let query=  `SELECT * from admins WHERE username = 'admin' `;

        const results = await executeQuery(connection, query);

        // console.log("results", results, query)

        if(results.length){
            const user = results[0]
            let match = await comparePassword(currentPassword, user.password)
            console.log(match)
            if(match === true){
                match = await comparePassword(newPassword, user.password)
                console.log(match)
                if(match === true){
                    throw new Error('New password should be different from current password')
                }else{
                    const hashedPassword  = await hashPassword(newPassword)
                    query = `UPDATE admins SET password = '${hashedPassword}' WHERE username = 'admin' `
                    const result = await executeQuery(connection, query)
                    return new Response(JSON.stringify({ success: true, msg: 'Password changed successfully'}), {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        status: 201
                    });
                }
            }else{
                throw new Error('Invalid Current Password')
            }
        }else{
            throw new Error('User not found, query: ' + query)
        }

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