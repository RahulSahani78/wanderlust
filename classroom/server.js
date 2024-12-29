const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");
// const cookiParser=require("cookie-parser");
const session=require("express-session");
const sessionOption={
    secret:"mysecret",
    resave:false,
    saveUninitialized:true
};
app.use(session(sessionOption));

app.get("/test",(req,res)=>{
    res.send("test successfull");
});
app.get("/register",(req,res)=>{
    let {name="no name"}=req.query;
    console.log(req.session);
    res.send(name);
});
app.get("/hello",(req,res)=>{
    res.send("hello");
});
// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count=1; 
//     }
   
//     res.send(`u sent request ${req.session.count} times`);
// });

// app.use(cookieParser());
// app.get("/getcookies",(req,res)=>{
    
//     res.cookie("greet","namaste");
//     res.cookie("madeIn","India");
//     res.send("hi , I am cookies");
// });

// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("hi,I am root");
// });

// app.use("/users",users); 
// //for post
// app.use("/post",posts);

app.listen(3000,()=>{
    console.log("server is listening to 3000");
});