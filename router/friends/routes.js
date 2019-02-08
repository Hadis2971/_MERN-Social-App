const User    = require("../../models/user");
const Post    = require("../../models/post");
const Comment = require("../../models/comment");

const friendsRoutes = module.exports = {
    "get": {
        "/friendsPosts/:userID": async (req, res, next) => {
            let posts = [];
            const user = await User.findById(req.params.userID);

            for(let i = 0; i < user.friends.length; i++){
                let helpPosts  = await Post.find({user: user.friends[i]});
                let friendName = await User.findById(user.friends[i]);
                helpPosts.forEach(post => {
                    posts.push({
                        _id: post._id,
                        text: post.text,
                        userID: post.user,
                        name: friendName.name
                    });
                })
            }
            return res.status(200).json(posts);
        },

        "/friednsPost/:postID": (req, res, next) => {
            Post.findById(req.params.postID)
            .then(post => {
                return res.status(200).json(post);
            })
            .catch(next);
        },

        "/search/:name": (req, res, next) => {
                       
            User.find({name: req.params.name})
            .then(users => {

                let finalUsers = users.map(user => {
                    return {
                        name: user.name,
                        profileImage: user.profileImage,
                        _id: user._id
                    }
                });

                return res.status(200).json(finalUsers);
            })
            .catch(next);
        },
        "/getComments/:postID": (req, res, next) => {
            Comment.find({post: req.params.postID})
            .then(comments => {
                return res.status(200).json(comments);
            })
            .catch(next);
        } 

    },
    "post": {
        "/addFriend": (req, res, next) => {
            console.log(req.body);
            User.findById(req.body.userID)
            .then(user => {
                user.friends.push(req.body.friendID);
                user.save()
                .then(() => {
                    User.findById(req.body.friendID)
                    .then(friend => {
                        let finalFriend = {
                            name: friend.name,
                            profileImage: friend.profileImage,
                            _id: friend._id 
                        }
                        return res.status(200).json(finalFriend);
                    })
                    .catch(next);
                })
            })
        },
        "/addComment": (req, res, next) => {
            const newComment = new Comment({
                text: req.body.text,
                user: req.body.userID,
                post: req.body.postID
            });
            newComment.save()
            .then((comment) => {
                User.findById(req.body.userID)
                .then(user => {
                    user.comments.push(comment._id)
                    user.save()
                    .then(() => {
                        Post.findById(req.body.postID)
                        .then(post => {
                            post.comments.push(comment._id)
                            post.save()
                            .then(() => res.status(200).json(comment))
                            .catch(next);
                        })
                    })
                })
            })
        }
    }
}