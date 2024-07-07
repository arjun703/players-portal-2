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

        // Save the title and filenames in the MySQL database
        const query = `SELECT * from videos 
            WHERE user_id = '${userName}' AND is_active=1
            ORDER BY created_at DESC ${ limitedAccess ? ' LIMIT 1 ': ''   }
        `;

        const videos = await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(new Error('Error fetching data from database: ' + error.message));
                } else {
                    resolve(results);
                }
            });
        });

        return new Response(JSON.stringify({limitedAccess: limitedAccess, editable: userName == getLoggedInUsername(), success: true, videos: videos }), {
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


export async function DELETE(request) {
    let connection = false
    try {
        const userID = getLoggedInUsername();
        const data = await request.formData()
        const video_id = data.get('video_id')
        // Save the title and filenames in the MySQL database
        const query = `UPDATE  videos 
            SET is_active = 0 
            WHERE id = '${video_id}' AND user_id='${userID}'
        `;
        connection = await databaseConnection()
        
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

        return new Response(JSON.stringify({ success: successStatus, video_id: video_id }), {
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

