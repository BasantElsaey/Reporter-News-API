
const jwt = require('jsonwebtoken')

const Reporter = require('../models/reporters')

const auth = async (req,res,next)=>{
    try{
        // req.header --> token
        // console.log('Auth Middleware)
        const token = req.header('Authorization').replace('Bearer ','')
        // console.log(token)
        // nodeAPI --> comes from user.js file (model) in sign function jwt

        const decode = jwt.verify(token,'nodeAPI')
        // console.log(decode)

        const reporter = await Reporter.findById({_id:decode._id})
        req.reporter = reporter
        next()
    }
    catch(e){
        res.send({Error : 'Failed to Authenticate'})
    }
}


module.exports = auth