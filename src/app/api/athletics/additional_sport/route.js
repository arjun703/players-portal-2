import {generateRandomString} from '@/app/api/utils'
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB,
});

export  async function POST(request) {

    try {

        await  new Promise((resolve, reject)=> setTimeout(()=> resolve(), 1000))

        const data = await request.formData()

        const additionalSportInfo = data.get('additional_sport_info')
        
        const id=generateRandomString(20)

        // Save the title and filenames in the MySQL database
        const query = `INSERT INTO additional_sports 
            (id, user_id, info) 
            VALUES 
            ('${id}', '${getLoggedInUsername()}',  '${additionalSportInfo}')
        `;
        
        connection.query(query, (error, results) => {
            if (error) {
                throw new Error('Error inserting data into database- '+ error.message);
            } 
        });

        return new Response(JSON.stringify({ success: true, additional_sport: {
            id: id, info: additionalSportInfo
        }}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201
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



export  async function PUT(request) {

    try {

        const data = await request.formData()

        const additionalSport = JSON.parse(data.get('additional_sport'))

        const id = additionalSport.id
        const additionalSportInfo = additionalSport.info

        // Save the title and filenames in the MySQL database
        const query = `UPDATE  additional_sports 
            SET info = '${JSON.stringify(additionalSportInfo)}' 
            WHERE id = '${id}'
            AND user_id = '${getLoggedInUsername()}'
        `;
        
        connection.query(query, (error, results) => {
            if (error) {
                throw new Error('Error inserting data into database- '+ error.message);
            } 
        });

        return new Response(JSON.stringify({ success: true, additional_sport: {
            id: id, info: additionalSportInfo
        }}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201
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


export async function DELETE(request) {

    await  new Promise((resolve, reject)=> setTimeout(()=> resolve(), 1000))

    try {
        const userID = '1234';
        const data = await request.formData()
        const additional_sport_id = data.get('additional_sport_id')
        // Save the title and filenames in the MySQL database
        const query = `UPDATE  additional_sports 
            SET is_active = 0 
            WHERE id = '${additional_sport_id}' AND user_id='${getLoggedInUsername()}'
        `;

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

        return new Response(JSON.stringify({ success: successStatus, additional_sport_id: additional_sport_id }), {
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