import { generateVerificationCode } from "../../utils";
import sendMail from "../../send-mail";
import { executeQuery, databaseConnection } from "../../utils";
import { generateHTMLforVerificaitonCode } from "../utils";
export async function GET(request){
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    let connection  = false 
    try{

        if(email.trim().length < 6){
            throw new Error('Invalid email')
        }

        connection = await databaseConnection();

        const query= `SELECT * from users WHERE email = '${email}' `

        const users = await executeQuery(connection, query);

        const code = generateVerificationCode()


        if(!users.length){
            throw new Error('Email not found, verify that email is yours')
        }

        const insertCodeQuery = `INSERT INTO verification_codes 
            (
                email,
                code
            )
                VALUES
            (
                '${email}',
                '${code}'
            )
        `;

        executeQuery(connection, insertCodeQuery)

        sendMail(
            email, 
            'SportsTalentAsia Password Reset', 
            `${code} is your verification code`, 
            generateHTMLforVerificaitonCode(code, email)
        )

        return new Response(JSON.stringify({ success: true, msg: "Code sent"  }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

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