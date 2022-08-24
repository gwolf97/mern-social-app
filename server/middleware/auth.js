import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"


export const auth = asyncHandler(async (req, res, next) =>{
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : req.body.headers.Authorization.split(" ")[1]
        const isCustomAuth = token.length < 500
        
        let decodedData

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, "secret")

            req.userId = decodedData.id
        }else{
            decodedData = jwt.decode(token)

            req.userId = decodedData.sub
        }

        next()
    } catch (error) {
       console.log(error)
    }
})


export default auth