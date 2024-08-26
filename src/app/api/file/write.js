import { s3Client } from './s3_client';
import { Upload } from '@aws-sdk/lib-storage';
import { Readable } from 'stream';

export  async function writeFileToSpaces(Key, body) {

    try {

        const params = {
            Bucket: process.env.S3_COMPATIBLE_SPACES_BUCKET_NAME,
            Key,
            Body: body,
            ACL: "public-read"
        };
        
        const upload = new Upload({
            client: s3Client,
            params: params,
        });
        
        const data = await upload.done();

        if(data.Location  !== undefined && data.Location !== null){
            return data.Location
        }else{
            throw new Error('Error uploading file')
        }
        
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function writeMediasAndAttachments(key, file){
    try{
        return await writeFileToSpaces(key, Readable.from(file.stream()) );
    }catch(error){
        return error
    }
}

export async function writeJsonFile(key, textContentObject){
    try{
        return await writeFileToSpaces(key, JSON.stringify(textContentObject))
    }catch(error){
        return error
    }
}