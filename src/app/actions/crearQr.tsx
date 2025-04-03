import QRCode from "qrcode";
import {v2 as cloudinary, UploadApiResponse} from "cloudinary";
import { Stream } from "stream";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function CreadorQr(texto: string) {
    const buffer = await QRCode.toBuffer(texto, {type: "png"});

    const bufferStream = new Stream.PassThrough();
    bufferStream.end(buffer);
    
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
        {
            folder: 'qrcodes',
            public_id: `qr-${Date.now()}`
        },
        (error, result) => {
            if (error) reject(error);
            else resolve(result!);
        }
        )
            
        bufferStream.pipe(uploadStream);
    });

    const url = await result.secure_url;
    
    return url;
}