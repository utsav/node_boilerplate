var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var ObjectId = Schema.ObjectId;

// set up a mongoose model
var UserSchema = new Schema({
    firstName: {
        type: String,
        default : null
    },
    lastName: {
        type: String,
        default : null
    },
    role: {
        type: Number,
        required : true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    mobile: {
        type: String
    },
    is_Active : {
        type : Boolean,
        default : true
    },
    is_Archieved: {
        type: Boolean,
        default : false
    },
    last_login: {
        type: Date
    },
    created_on: {
        type: Date
    },
    facebookId: {
        type: String
    },
    googleId: {
        type: String
    },
    name: {
        type: String
    }
});

UserSchema.index({ email: 1}, { unique: true });

// this function causing issue when not provided password
UserSchema.pre('save', function (next)
{
    var user = this;

    // if password is not provided then skip this section
    if(!user.password) {
        return next();
    }

    if (this.isModified('password') || this.isNew)
    {
        bcrypt.genSalt(10, function (err, salt)
        {
            if (err)
            {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash)
            {
                if (err)
                {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }
    else
    {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb)
{
    bcrypt.compare(passw, this.password, function (err, isMatch)
    {
        if (err)
        {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

var user = mongoose.model('user', UserSchema);
module.exports = user;
