const Validator = require("validator");
const isEmpty   = require("is-empty");

module.exports = input => {
    let errors = {};

    const name = isEmpty(input.name)? "" : input.name;
    const email = isEmpty(input.email)? "" : input.email;
    const password = isEmpty(input.password)? "" : input.password;
    const password2 = isEmpty(input.password2)? "" : input.password2;
    
    

    if(Validator.isEmpty(name)){
        errors.name = "The Name Field is Required!!!";
    };
    
    if(Validator.isEmpty(email)){
        errors.email = "The Email Field is Required!!!";
    }else if(!Validator.isEmail(email)){
        errors.email = "Please Enter a Valid Email Address!!!";   
    }
    
    if(Validator.isEmpty(password)){
        errors.password = "The Password Field is Required!!!";
    }else if(!Validator.isLength(password, {min: 5, max: 20})){
        errors.password = "The Password Must Be Between 5 and 20 Charecters Long!!!";
    }
    
    if(Validator.isEmpty(password2)){
        errors.password2 = "The Confirm Password Field is Required!!!";
    }else if(!Validator.equals(password, password2)){
        errors.password2 = "The Passwords Must Match!!!";
    };
    console.log(errors);
    return {
        errors,
        isValid: isEmpty(errors)
    }
};