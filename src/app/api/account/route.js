import { databaseConnection, getLoggedInUsername, generateToken, executeQuery} from '@/app/api/utils'
import { isPremium } from '../is_premium';

export  async function GET(request) {

    const { searchParams } = new URL(request.url)
    const userName = searchParams.get('username')
    let connection = false
    try {
        
        connection = await databaseConnection();

        const is_premium = await isPremium(connection)

        const limitedAccess = userName != getLoggedInUsername()  && !is_premium 

        return new Response(JSON.stringify({limitedAccess: limitedAccess,  success: true }), {
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
    }finally{
        if(connection){
            connection.end()
        }
    }
}
