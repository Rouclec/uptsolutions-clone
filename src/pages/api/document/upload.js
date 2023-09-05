import DB from 'lib/db'
import User from "models/User";
import Document from 'models/Document';
import { getSession } from 'next-auth/react'
import aws from 'aws-sdk'
import catchAsync from '../../../lib/catchAsync';
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const upload = catchAsync(async (req, res, next) => {
    await DB()
    const session = await getSession({ req })

    const { name, pages, paperType, paperSize, orientation, printSides, color, pagesPerSheet, printingType, bindingType, description, file, createdBy } = JSON.parse(req.body)

    const document = {
        name,
        pages,
        paperType,
        paperSize,
        orientation,
        printSides,
        color,
        pagesPerSheet,
        printingType,
        bindingType,
        description,
        file,
        createdBy,
    }
    const doc = await Document.create(document)
    res.send({
        status: 'OK',
        data: doc
    })
})

export default upload