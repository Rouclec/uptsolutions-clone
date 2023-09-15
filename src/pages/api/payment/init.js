import catchAsync from 'lib/catchAsync';
import { getTokenFromCampay } from 'lib/helper'

/* initiate payments using the makePyamentsRequest model. @ vote_id to the external_reference field*/
const initiatePayment = async (paymentRequest) => {
    const creds = {
        username: process.env.CAMPAY_USER,
        password: process.env.CAMPAY_PWD,
    };

    // get token from campay.
    const token = await getTokenFromCampay(creds);

    try {
        const response = await fetch(`${process.env.CAMPAY_BASE_URL_DEMO}/collect/`, {
            method: "post",
            body: JSON.stringify(paymentRequest),
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

const pay = catchAsync(async (req, res) => {
    const paymentRequest = {
        from: req?.body?.phoneNumber,
        external_ref: req?.body?.ref,
        amount: req?.body?.amount
    }
    const paymentResponse = await initiatePayment(paymentRequest)

    return res.status(200).json({
        status: "OK",
        data: paymentResponse
    })
});

export default pay;