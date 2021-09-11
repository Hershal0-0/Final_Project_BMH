const jwt = require('jsonwebtoken')

const authFunc = (req,res,next)=>{
    // Get the token from the header
    const token = req.header('x-auth-token')
    // Check if Token is available
    if(!token){
        return res.status(401).json({
            errors:[{msg: "No token. Authorization Denied"}]
        })
    }

    // Verify Token
    try {
        const decoded = jwt.verify(token,process.env.JWTSECRET)

        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({
            errors:[{msg:"Token is not valid"}]
        })
    }
}

module.exports = authFunc