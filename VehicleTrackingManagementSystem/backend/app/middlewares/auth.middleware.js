// import dependencies
const { verify } = require('jsonwebtoken')
const { User } = require('../models/user.model')

async function auth(req, res, next) {
    const header = req.header('authorization')
    const token = header ? header.split(' ')[1] : req.query.token
    if (!token)
        return res.status(401).send({message:'No Token Found'})
    try {
        const decoded = verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({
            _id: decoded.id
        })
        if (!user)
            return res.status(401).send({message:'Invalid Token'})
        req.user = user
        next()
    }
    catch (err) {
        res.status(401).send({message:"Unauthorized"})
    }
}
module.exports.auth = auth