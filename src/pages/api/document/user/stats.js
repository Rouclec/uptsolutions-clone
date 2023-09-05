import DB from "../../../../lib/db";
import mongoose from 'mongoose';
import catchAsync from "../../../../lib/catchAsync";
import Document from "../../../../models/Document";
const getStats = catchAsync(async (req, res) => {
    await DB()
    let userId = req.query?.userId;
    const id = new mongoose.Types.ObjectId(userId);

    const stats = await Document.aggregate([
        {
            $match: { createdBy: id }
        }, {
            $group: {
                _id: '$status',
                total: { $sum: 1 },
                // totalAmount: { $sum: "$amount" }
            }
        }
    ])

    const totalPending = stats.find(stat => stat._id === 'pending')?.total || 0;
    const totalPrinted = stats.find(stat => stat._id === 'printed')?.total || 0;

    return res.status(200).json({
        status: "OK",
        data: {
            files: totalPending + totalPrinted,
            printed: totalPrinted,
            saved: totalPending
        }
    })
})

export default getStats;