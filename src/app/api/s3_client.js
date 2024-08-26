import { S3 } from "@aws-sdk/client-s3";

const s3Client = new S3({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: "https://blr1.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.S3_COMPATIBLE_SPACES_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_COMPATIBLE_SPACES_SECRET_ACCESS_KEY
    }
});

export { s3Client };