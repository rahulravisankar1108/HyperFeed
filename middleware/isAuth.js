const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = async(req,res,next) => {
    const authorized = req.get('Authorization');
    if(authorized) {
        const token = authorized.split(' ')[1];
        let decodedToken;
        try{
            decodedToken = jwt.verify(token, SECRET);
        }
        catch(err) {
            console.log('Error in decoding token :',err);
            err.statusCode = 401;
            next(err);
        }
        if(!decodedToken) {
            const error = new Error('User is not Authenticated');
            error.setStatus = 401;
            next(error);
        }
        req.userId = decodedToken.userId;
        next();
    }
    else {
        const error = new Error('User is not Authenticated');
        error.setStatus = 401;
        next(error);
    }
}