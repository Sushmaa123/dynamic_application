const { verify } = require('jsonwebtoken')
const user = require('../Models/user');
const secret="harsha"

const validateToken = (req, res, next) => {
    const accessToken = req.header("token");
    // const accessToken=req.header.authorization;

    if (!accessToken) {
        return res.status(400).json({ message: "User not Logged In" })
    }

    try {
        verify(accessToken, secret, async (err, decode) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            }
            const data = await user.findOne({ _id: decode.data })
            if (data) {
                req.user = data._id
                next()
            } else {
                res.json({ message: "failed" })
            }

        });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = { validateToken };