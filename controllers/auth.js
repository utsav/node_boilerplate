var User = require('./../models/users');
var jwt = require('jsonwebtoken');
var config = require('./../config/config');
var bcrypt = require('bcryptjs');

exports.adminLogin = function (req, res) {

    if(!req.body.email || !req.body.password)
        return res.status(400).json({message : 'Invalid Parameters'});

    User.findOne({email : req.body.email, role : 1}, function (err, resultAdminLogin){
        if(err)
            return res.status(400).json(err);
        else {
            if(resultAdminLogin !== null) {
                resultAdminLogin.comparePassword(req.body.password, function (err, isMatch){
            console.log(">>> ok");
                   if(isMatch && !err) {
                        var token = jwt.sign({email : resultAdminLogin.email, role : resultAdminLogin.role}, config.secret);
                        console.log(token);
                        var obj = {
                            name : resultAdminLogin.firstName,
                            email : resultAdminLogin.email,
                            token : token
                        };
                        return res.status(200).json(obj);
                   } else {
                       return res.status(400).json({message : 'Invalid credentials'});
                   }
                });

            } else {
                return res.status(400).json({message : 'Invalid credentials'});
            }

        }
    });
};


exports.userRegister = function (req, res){
    if(!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.mobile)
        return res.status(400).json({message : 'Invalid Parameters'});

    var salt = bcrypt.genSaltSync(10);

    var userObj = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        role : 2,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, salt),
        mobile : req.body.mobile,
        created_on : new Date(),
        last_login : new Date()
    };

    var user = new User(userObj);
    user.save(function(err, resultUserRegister){
        if(err)
            res.status(400).json(err);
        else
            res.status(200).json({message : 'User successfully registered', row:resultUserRegister});
    })
};

exports.userLogin = function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({message: 'Invalid Parameters'});
    }

    User.findOne({email: req.body.email}, function(err, userResult) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(userResult);
        }
    });
}
