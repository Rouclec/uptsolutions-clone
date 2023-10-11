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
    console.log({ token })

    try {
        const response = await fetch(`${process.env.CAMPAY_BASE_URL}/collect/`, {
            method: "post",
            body: JSON.stringify(paymentRequest),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token.token}`,
            },
        });

        console.log('payemtn request response: ', response)
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

    console.log({
        body: req?.body
    });

    const paymentResponse = await initiatePayment(paymentRequest)

    console.log({ paymentResponse });

    return res.status(200).json({
        status: "OK",
        data: paymentResponse
    })
});

export default pay;