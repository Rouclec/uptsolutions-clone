import catchAsync from 'lib/catchAsync'
import Order from "models/Order";
import DB from 'lib/db'

const refundOrder = catchAsync(async (_, res) => {
    await DB()
    res.send("OK")
})
export default refundOrder;