
const authorizedRole = (...role) => {

    return (req, res, next) => {

        if (!role || !role.includes(req.user.userRole)) {
            return res.status(403).json({
                message: "Access Denied"
            })
        }

        next()
    }

}

module.exports = authorizedRole;