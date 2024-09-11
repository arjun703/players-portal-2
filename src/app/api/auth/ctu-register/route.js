import {generateRandomString, generateToken, databaseConnection , executeQuery, hashPassword} from '@/app/api/utils'
import { EmailRounded } from '@mui/icons-material';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers'

export  async function POST(request) {

    try {

        const data = await request.formData()

        const club = JSON.parse(data.get('info'))

        const name = club.name
        const email = club.email
        const sport_type = club.sport_type
        let password = await hashPassword(club.password)

        if(name.trim().length === 0 || email.trim().length === 0 || club.password.trim().length === 0){
            throw new Error('Fill all fields')
        }
        
        const username = name.toLowerCase().replace(/ /g, '-') + '-'+generateRandomString(8);

        // Save the title and filenames in the MySQL database
        const query = `
            INSERT INTO users(username, email, password, type, phone) VALUES (
                '${username}', '${email}', '${password}', 'club', ''
            )
        `;

        const connection = await databaseConnection()

        const isCreationSuccess = await executeQuery(connection, query);

        if(isCreationSuccess){

            club.password = ''

            club.confirm_password = ''
            
            const basicInfoInsertQuery = `
                INSERT INTO only_club(username, info, sport_type) 
                VALUES ('${username}', '${JSON.stringify(club)}', '${sport_type}' )
            `

            const isBasicInfoInsertionSuccess = await executeQuery(connection, basicInfoInsertQuery)

            if(isBasicInfoInsertionSuccess){

                const token = generateToken(username, 'club')

                cookies().set('token', token)

                return new Response(JSON.stringify({ success: true, token: token }), {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    status: 201
                });

            }else{
                throw new Error('Unknown error signing up. Plese try again later. ErrorCode: basicInfoInsertQuery ')
            }

        }else{
            throw new Error('Unknown error signing up. Plese try again later. Error Code: userInsertQuery')
        }

    } catch (error) {
        if(error.message.includes('Duplicate entry')){
            error.message = 'Error - email already exists'
        }
        return new Response(JSON.stringify({ success: false, msg: error.message  }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });
    }
}