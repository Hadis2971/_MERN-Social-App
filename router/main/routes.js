const User = require("../../models/user");
const Post = require("../../models/post");


const routes = module.exports = {
    "post": {
        "/newPost/:id": (req, res, next) => {
            const newPost = new Post({
                text: req.body.text,
                user: req.params.id
            });

            newPost.save()
            .then((post) => {
                User.findById(req.params.id)
                .then((user) => {
                        user.posts.push(post._id);
                        user.save()
                        .then(() => {
                            
                            const responsePost = {
                                text: post.text,
                                id: post._id
                            }
                            
                            return res.status(200).json({
                                responsePost: responsePost
                            })
                        })
                        .catch(next) 
                })
                .catch(next)
            })
            .catch(next);
        }
    },

    "get": {
        "/newPost/:id": (req, res, next) => {
            Post.find({user: req.params.id})
            .then(posts => {
                return res.status(200).json(posts);
            })
            .catch(next);
        }
    },
    "delete": {
        "/newPost/:userID/:postID": (req, res, next) => {
            User.findOne({'_id' : req.params.userID}, function(err, user){ 
            for(var i=0; i <= user.posts.length; i++){ 
                if (String(user.posts[i]) == String(req.params.postID)){ 
                    user.posts.remove(req.params.postID); 
                    user.save()
                    .then((user) => {
                        Post.findByIdAndRemove(req.params.postID)
                        .then(() => {
                            Post.find({user: req.params.userID})
                            .then(posts => res.status(200).json(posts));
                        });
                    })
                    .catch(next);
                } 
            }  
            });
        }
    },
    "put": {
        "/newPost/:id/:userID": (req, res, next) => {
            Post.findByIdAndUpdate(req.params.id)
            .then(post => {
                console.log(1);
                console.log(req.body);
                post.text = req.body.text;
                post.save()
                .then(() => {
                    Post.find({user: req.params.userID})
                    .then(posts => res.status(200).json(posts))
                    .catch(next);
                })
            })
        }
    }
};

