import catchAsync from "../../../lib/catchAsync";
import DB from "../../../lib/db";
import Order from "../../../models/Order";

const getStats = catchAsync(async (_, res) => {
    await DB()

    const stats = await Order.aggregate([
        {
            $group: {
                _id: '$status',
                total: { $sum: 1 },
                totalAmount: { $sum: "$amount" }
            }
        }
    ])

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