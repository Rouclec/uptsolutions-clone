import catchAsync from 'lib/catchAsync'
import Order from "models/Order";
import Document from 'models/Document'
import DB from 'lib/db'

const confirmOrder = catchAsync(async (req, res) => {
    await DB()
    const order = await Order.findById(req?.query?.id)
    const documents = order?.documents
    documents.forEach(async document => {
        await Document.findByIdAndUpdate(document, { status: 'printed' })
    })
    const updatedOrder = await Order.findByIdAndUpdate(order?._id, { status: 'completed' })
    return res.status(200).json({
        status: "OK",
        data: updatedOrder,
    });
})
export default confirmOrder;