import catchAsync from 'lib/catchAsync'
import User from 'models/User'
import DB from 'lib/db'

const getUser = catchAsync(async (req, res) => {
    await DB()
    const user = await User.findById(req?.query?.id)
    if (!user) {
        return res.status(404).json({
            status: 'Not found',
            message: `User with id ${req?.query?.id} not found`
        })
    }
    return res.status(200).json({
        status: "OK",
        data: user
    })
});

export default getUser;