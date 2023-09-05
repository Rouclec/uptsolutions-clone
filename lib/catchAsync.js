module.exports = (fxn) => {
    return async (req, res) => {
        fxn(req, res).catch((err) => {
            if (err.name === "ValidationError") {
                return res.status(500).json({
                    status: "Server Error",
                    message: err.message.split(",")[0],
                })

            } else {
                console.log('error: ', err);
            }
        });
    };
};
