import catchAsync from 'lib/catchAsync'
import Order from "models/Order";
import Document from 'models/Document';
import DB from 'lib/db';

const getOrders = catchAsync(async (req, res) => {
    await DB()
    let queryParms = { active: true };
    if (req?.query) queryParms = { ...queryParms, ...req.query }
    const query = Order.find(queryParms).populate('user').populate('documents')
    const docs = await query
    return res.status(200).json({
        status: "OK",
        results: docs?.length || 0,
        data: docs,
    });
})
export default getOrders;