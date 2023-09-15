import catchAsync from 'lib/catchAsync';
import { getTokenFromCampay } from 'lib/helper'

/* initiate payments using the makePyamentsRequest model. @ vote_id to the external_reference field*/
const checkTransactionStatus = async (reference) => {
    const creds = {
        username: process.env.CAMPAY_USER,
        password: process.env.CAMPAY_PWD,
    };


    // get token from campay.
    const token = await getTokenFromCampay(creds);

    try {
        const response = await fetch(`${process.env.CAMPAY_BASE_URL_DEMO}/transaction/${reference}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token.token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        return await response.json();
    } catch (error) {
        return error;
    }
};

const processPay = catchAsync(async (req, res) => {
    const reference = req?.query?.reference;

    const response = await checkTransactionStatus(reference);

    return res.status(200).json({
        status: "OK",
        data: response
    })
})

export default processPay;