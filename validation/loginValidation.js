const Validator = require("validator");
const isEmpty   = require("is-empty");

module.exports = input => {
    let errors = {};

    const email = isEmpty(input.email)? "" : input.email;
    const password = isEmpty(input.password)? "" : input.password;
    
    
    if(Validator.isEmpty(email)){
        errors.email = "The Email Field is Required!!!";
    }else if(!Validator.isEmail(email)){
        errors.email = "Please Enter a Valid Email Address!!!";   
    }
    
    if(Validator.isEmpty(password)){
        errors.password = "The Password Field is Required!!!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};