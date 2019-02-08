const express  = require("express");
const passport = require("passport");
const cors = require("cors");
const app  = express();
const port = (process.env.PORT || 5000);

require("./database").setConnection()
.then(() => console.log("MongoDB Connected"))
.catch(error => console.log(`MongoDB Error => ${error}`));


app.use(cors());

/*
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Headers", "Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});*/

const authRouter    = require("./router").authRouter;
const apiRouter     = require("./router").apiRouter;
const mainRouter    = require("./router").mainRouter;
const friendsRouter = require("./router").friendRouter;
const clientError   = require("./router/errors/clientError");
const catchAll      = require("./router/errors/catchAll"); 

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(passport.initialize());
require("./config/passportConfig")(passport);

app.use("/auth", authRouter);
app.use("/api", apiRouter);

app.use((req, res, next) => {
    if(!req.headers.authorization){
        return res.status(400).send("<h1>Please Login</h1>");
    }else {
        next();
    }
});


app.use("/main", mainRouter);
app.use("/friends", friendsRouter);

app.use((req, res, next) => {
    res.status(404).json({Clinet_Error: "Page Not Found"});
});

app.use(clientError);
app.use(catchAll);

app.listen(port, () => console.log(`Server Started On Port ${port}`));