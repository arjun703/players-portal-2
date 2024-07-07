import {  getLoggedInUsername,databaseConnection, generateToken, executeQuery} from '@/app/api/utils'

export async function isPremium(connection){
    let query = `SELECT email from subscriptions WHERE email IN (SELECT email from users WHERE username ='${getLoggedInUsername()}' )  `;
    const emails = await executeQuery(connection, query);
    if(emails.length > 0){
        return true
    }else{
        return false
    }
}