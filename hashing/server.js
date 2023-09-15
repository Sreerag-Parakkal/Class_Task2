const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const saltround = 10;

dotenv.config({path:"./config/config.env"});
app.use(express.urlencoded({extended:true}));

const users = [
  { username: "akhil", password: "$2b$10$qRMEpVyL.a0Uj0Ur6SRKXuEYPLln28DoM4xnVlSKv0Eks0Dc3uqpe" },
  { username: "kumar", password: "$2b$10$ApKLrkeHZQQgXAVO3PA32uRw7B2f38J5Mj2YPrkCZ7o2vwp7XiIsi" },
  { username: "rahul", password: "$2b$10$eyFokX4ZQ3qpYNovgGOX2O.DGUTT29yunBKUXZTiAOJedo0YazerG" },
  { username: "john", password: "$2b$10$lmLZutbTYiTwCYNfzaz1W.KQ8/C9wwlWebABi0SqPnyPFuDoGQwyO" },
  { username: "ashiq", password: "$2b$10$wnT6BYZddaeTB6YXrlFkRecGzteefUBc7hzD8twmEo6VPqJgxWKaS" },
  { username: "arun", password: "$2b$10$0bFdlga3KzoncLqe5OmE9.nEA1wwVTFX45Bh1DX3CqLcE8rxAwwCK" },
];

app.get("/signup",(req,res)=>{
    res.sendFile(__dirname + "/signup.html")
});

app.post("/signup",(req,res)=>{
    const {userName, password} = req.body;
    bcrypt.hash(password, saltround, function(err,hash){
        if(err){
            res.send(err.message)
        }else{
            console.log(hash);
            res.redirect("/");
        }
    })
});

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/login.html")
});

app.post("/",(req,res)=>{
    
    const {userName, password} = req.body;
    
    const user = users.find((data)=> data.userName === userName);

    if(!user){
        res.send("Username not found");
    }else{
        bcrypt.compare(password, user.password, function(err,result){
            console.log(result);
            if(result){
                res.redirect("/profile");
            }else{
                res.send("Password does not match")
            }
        })
    }
});

app.get("/profile",(req,res)=>{
    res.sendFile(__dirname + "/profile.html")
    
});



app.listen(process.env.PORT,()=>{
    console.log(`server on ${process.env.PORT}`);
})