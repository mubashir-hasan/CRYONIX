import jwt from 'jsonwebtoken';


function verifyToken (req, res, next){

    const authorize = req.headers.authorization;

    if(!authorize) {
        return res.status(401).json({
            status:false,
            message:"Token Missing"
        })
    }

    const token = authorize.split(' ')[1];
    

    try {
        const data = jwt.verify(token, process.env.JSONTOKEN);

        req.user = data;

        next();
    } catch (err) {
        res.status(401).json({
            status:false,
            message:"Invalid Token !!"
        })
    }
    
}



export default verifyToken;