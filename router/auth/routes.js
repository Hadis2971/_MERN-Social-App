const User        = require("../../models/user");
const jwt         = require("jsonwebtoken");
const bcrypt      = require("bcryptjs");
const secretOrKey = require("../../config").secretOrKey; 
const registerValidation = require("../../validation/registerValidation");
const loginValidation    = require("../../validation/loginValidation");



const routes = module.exports = {
    "post": {
        "/register": (req, res, next) => {
            
            const { errors, isValid } = registerValidation(req.body);

            if(!isValid){
                return res.json({
                    Client_Error: "Wrong Input",
                    errors
                })
            }

            User.findOne({email: req.body.email})
            .then(user => {
                if(user){
                    return res.status(400).json({Email_Exists: true});
                }else {
                    const name         = req.body.name;
                    const email        = req.body.email;
                    const password     = req.body.password;
                    const password2    = req.body.password2; 
                    const profileImage = (req.file)? 
                    req.file.filename : "";

                    let newUser = new User({
                        name,
                        email,
                        password,
                        password2,
                        profileImage
                    });

                   newUser.hashPassword(newUser)
                   .then((user) => {
                       user.save()
                       .then(user => {
                            return res.status(200).json({
                                User_Registration: "Success",
                                user
                            });
                       })
                       .catch(next);
                   })
                   .catch(next);
                }
            })

            
        },
        "/login": (req, res, next) => {
            const { errors, isValid } = loginValidation(req.body);

            if(!isValid){
                return res.json({errors});
            }

            User.findOne({email: req.body.email})
            .then(user => {
                if(!user){
                    return res.json({Client_Error: "Email Not Found!!!"});
                }else {
                    bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
                        if(!isMatch){
                            return res.json({Client_Error: "Wrong Password!!!"});
                        }else {
                            const payload = {
                                user: user.name,
                                id: user._id
                            }

                            jwt.sign(payload, secretOrKey, (err, token) => {
                                if(err){
                                    return res.status(400).json({Server_Error: err});
                                }else {
                                    res.status(200).json({
                                        Login: "Success",
                                        token: "Bearer " + token,
                                        expires: 3600
                                    });
                                }
                            });
                        }
                    });
                }
            })

        }
    }
}