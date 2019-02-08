const Grid     = require('gridfs-stream');
const mongoose = require("mongoose");
const User     = require("../../models/user");
const mongoURI = require("../../config").mongoURI; 

var conn = mongoose.createConnection(mongoURI);
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("profileImages");  
})


const routes = module.exports = {
    "get": {
        "/profile_image/:user": (req, res, next) => {
            User.findById(req.params.user)
            .then(user => {
               gfs.files.findOne({filename: user.profileImage}, (err, file) => {
                if(err) console.log(1);
                if(file){
                    const readstream = gfs.createReadStream(file);
                    readstream.pipe(res);
                }else {
                    return res.status(500).json("No Image Available");
                }
                
               })
            })
            .catch(next);
        }
    }
};