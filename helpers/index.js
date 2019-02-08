const router = require("express").Router();
const multer = require("multer");
const crypto = require('crypto');
const path   = require('path');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoURI = require("../config").mongoURI;

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'profileImages'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });

const _registerRoutes = (routes, method) => {
    for(key in routes){
        if(typeof routes[key] === "object" && routes[key] !== null && !(routes[key] instanceof Array)){
            _registerRoutes(routes[key], key);
        }else {
            if(method === "post"){
                if(key === "/register"){
                    router.post(key, upload.single('profileImage'), routes[key]);
                }else {
                    router.post(key, routes[key]);
                }
            }else if(method === "get"){
                router.get(key, routes[key]);
            }else if(method === "delete"){
                router.delete(key, routes[key]);
            }else if(method === "put"){
                router.put(key, routes[key]);
            }
        }
    }
}


const routing = routes => {
    _registerRoutes(routes);
    return router;
}

module.exports = {
    routing
}