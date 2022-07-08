async function admin(req, res, next) {
    if (req.user.category !== 'ADMIN')
        return res.status(403).send({ message: 'You don\'t have access' })
    req.user = user
    next()
}
module.exports.admin = admin