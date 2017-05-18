var jwt = require('jsonwebtoken');
var config = require('./../config/config');

exports.validateToken = function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

    // decode token
    if (token) {

      // verifies secret
      jwt.verify(token, config.secret , function(err, decoded) {
        if (err) {
          return res.status(403).json({message: 'Invalid Token' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });
    } else {
      // if there is no token

      return res.status(403).json({
          message: 'Invalid Token'
      });
    }
};

exports.isAdmin = function(req, res, next) {

  if(req.decoded.role !== 1 || req.decoded.role !== 2)
    next();
  else
    return res.status(403).json({message : 'You are not authorized to perform this operation'});
};
