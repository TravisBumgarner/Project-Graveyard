import { v2 as cloudinary } from 'cloudinary'
import path from 'path';

import config from '../../config'

const uploadFile = async (filename, data) => {
    await cloudinary.config(config.cloudinary)
    try {
        await cloudinary.uploader.upload(data, {
            use_filename: true,
            resource_type: "raw",
            public_id: `${config.cloudinary.directory}/${filename}`
        })
        return `https://res.cloudinary.com/${config.cloudinary.cloud_name}/raw/upload/v1646189376/${config.cloudinary.directory}/${filename}`
    } catch (error) {
        console.log(JSON.stringify(error))
    }
}
export {
    uploadFile
}