module.exports = (err, req, res, next) => {
    if(req.xhr){
        res.status(400).json({err});
    }else {
        next(err);
    }
}