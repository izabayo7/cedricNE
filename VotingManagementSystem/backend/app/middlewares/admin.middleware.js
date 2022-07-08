async function admin(req, res, next) {
    if (req.user.category !== 'ADMIN')
        return res.status(403).send({ message: 'You don\'t have access' })
    next()
}
module.exports.admin = admin