import DB from "../../../../lib/db";
import Document from "../../../../models/Document";

const catchAsync = require("../../../../lib/catchAsync");

const getUserDocs = catchAsync(async (req, res) => {
    await DB()
    const documents = await Document.find({ createdBy: req.query.userId, active: true })
    res.status(200).json({
        status: "OK",
        results: documents?.length || 0,
        data: documents
    })
})

export default getUserDocs