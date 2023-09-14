import catchAsync from 'lib/catchAsync'
import User from 'models/User'
import DB from 'lib/db'
const updateUser = catchAsync(async (req, res) => {
    await DB()
    const body = {
        fullName: req?.body?.fullName,
        email: req?.body?.email,
        phoneNumber: req?.body?.phoneNumber,
        profileImage: req?.body?.profileImage,
        address: req?.body?.address
    }
    const user = await User.findByIdAndUpdate(req.query?.id, body)

    return res.status(200).json({
        status: 'OK',
        data: user
    })
})

export default updateUser;