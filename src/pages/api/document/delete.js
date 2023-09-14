import { S3 } from "aws-sdk";
import catchAsync from "lib/catchAsync";
import DB from 'lib/db';
import Document from 'models/Document'

const deleteDoc = catchAsync(async (req, res) => {
    const { id, name } = req?.query

    const s3 = new S3({
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_TOKEN,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    })

    let params = {
        Bucket: process.env.AWS_BUCKET,
        Key: name
    };

    const response = s3.deleteObject(params, async function (err, data) {
        if (err) {
            console.log(`${err}, ${err.stack}`)
            return {
                status: 500,
                message: `An unknown error occured`
            }
        }
        else {
            await DB()
            const deletedDoc = await Document.findByIdAndDelete(id)
            return {
                status: 200,
                data: deletedDoc,
            }
        };
    });
    console.log('response on B.E: ', response)
    return res.send(response)
})

export default deleteDoc;