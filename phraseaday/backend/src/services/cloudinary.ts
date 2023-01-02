import { v2 as cloudinary } from 'cloudinary'

import config from '../../config'
import { logger } from '../utilities'

const uploadFile = async (filename, data) => {
    await cloudinary.config(config.cloudinary)
    try {
        const response = await cloudinary.uploader.upload(data, {
            use_filename: true,
            resource_type: 'raw',
            public_id: `${config.cloudinary.directory}/${filename}`,
            overwrite: true
        })
        return response.url
    } catch (error) {
        logger(JSON.stringify(error))
    }
}
export default {
    uploadFile,
}
