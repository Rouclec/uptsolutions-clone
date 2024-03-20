import Order from "models/Order";
import Document from 'models/Document'
import catchAsync from 'lib/catchAsync';
import DB from 'lib/db';

const createOrder = catchAsync(async (req, res) => {
    await DB()
    const body = {
        documents: req?.body?.documents,
        amount: req?.body?.amount,
        user: req?.body?.user,
        method: req?.body?.method
    }
    
    req?.body?.documents.forEach(async document => {
        await Document.findByIdAndUpdate(document, { status: 'paid' })
    })

    const order = await Order.create(body)
    return res.status(200).json({
        status: "OK",
        data: order
    });
});
export default createOrder;