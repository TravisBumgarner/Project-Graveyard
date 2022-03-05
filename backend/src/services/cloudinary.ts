import { v2 as cloudinary } from 'cloudinary'

import config from '../../config'
import { logger } from '../utilities'

const uploadFile = async (filename, data) => {
    await cloudinary.config(config.cloudinary)
    try {
        await cloudinary.uploader.upload(data, {
            use_filename: true,
            resource_type: 'raw',
            public_id: `${config.cloudinary.directory}/${filename}`,
        })
        return `https://res.cloudinary.com/${config.cloudinary.cloud_name}/raw/upload/v1646189376/${config.cloudinary.directory}/${filename}` // eslint-disable-line
    } catch (error) {
        logger(JSON.stringify(error))
    }
}
export default {
    uploadFile,
}
