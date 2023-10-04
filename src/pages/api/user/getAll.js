import catchAsync from 'lib/catchAsync'
import User from 'models/User'
import DB from 'lib/db'

const getAllUser = catchAsync(async (req, res) => {
    await DB()
    const users = await User.find()
    if (!users) {
        return res.status(404).json({
            status: 'Not found',
            message: "Error fetching users"
        })
    }
    return res.status(200).json({
        status: "OK",
        data: users
    })
});

export default getAllUser;