const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
const Schema   = mongoose.Schema;

const usersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }
});

usersSchema.methods.hashPassword = (user) => {
   return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) reject(err);
                else {
                    user.password = hash;
                    resolve(user);
                }
            });
        });
   });
}

const User = module.exports = mongoose.model("User", usersSchema);