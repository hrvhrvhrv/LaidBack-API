// importing JWT module
import JWT from 'jsonwebtoken';
// Importing config file to define cross app variables
import Config from '../config/index.js';

//  used to create JWT for sites authentication process
let verifyToken = (req, res, next) => {

    // check header or url parameters or post parameters for token
    let token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    // verifies secret and checks exp
    JWT.verify(token, Config.secret, function(err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        // if everything is good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });

}

module.exports = {
    verifyToken
};
