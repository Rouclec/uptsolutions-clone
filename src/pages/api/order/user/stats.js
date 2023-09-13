import catchAsync from "lib/catchAsync";
import DB from "lib/db";
import Document from "models/Document";
import mongoose from "mongoose";

const getStats = catchAsync(async (req, res) => {
    await DB()

    const userId = new mongoose.Types.ObjectId(req?.query?.user.toString())

    const stats = await Document.aggregate([
        {
            $match: { createdBy: userId },
        },
        {
            $group: {
                _id: '$status',
                total: { $sum: 1 },
                totalAmount: { $sum: "$amount" },
            }
        }
    ])

    console.log('stats: ', stats)

    const totalPending = stats.find(stat => stat._id === 'pending');
    const totalCompleted = stats.find(stat => stat._id === 'completed');
    const totalRejected = stats.find(stat => stat._id === 'rejected');

    return res.status(200).json({
        status: "OK",
        data: {
            pending: totalPending?.total || 0,
            completed: totalCompleted?.total || 0,
            refunded: totalRejected?.total || 0,
            amount: totalCompleted?.totalAmount || 0
        }
    })
})

export default getStats;