import catchAsync from 'lib/catchAsync';
import { getTokenFromCampay } from 'lib/helper'

/* initiate payments using the makePyamentsRequest model. @ vote_id to the external_reference field*/
const withdrawal = async (withdrawalRequest) => {
    const creds = {
        username: process.env.CAMPAY_USER,
        password: process.env.CAMPAY_PWD,
    };

    // get token from campay.
    const token = await getTokenFromCampay(creds);

    try {
        const response = await fetch(`${process.env.CAMPAY_BASE_URL_DEMO}/withdraw/`, {
            method: "post",
            body: JSON.stringify(withdrawalRequest),
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


const withdraw = catchAsync(async (req, res) => {
    const response = await withdrawal({
        amount: req?.query?.amount,
        to: "+237650184172",
        description: 'Test',
        external_reference: ''
    })

    return res.send(response)
})

export default withdraw;