if(process.env.NODE_ENV!="production"){
  require('dotenv').config()
}



const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride = require("method-override"); //to support put and delete
const ejsMate=require("ejs-mate");//install npm i ejs-mate
const ExpressError=require("./utils/ExpressError.js");
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const { runInNewContext } = require("vm");
const session=require("express-session");//npm i express-session
const flash=require("connect-flash");//npm i connect-flash for show mesg 
const passport=require("passport");//npm i passport
const LocalStrategy=require("passport-local");//npm i passport-local
const User=require("./models/user.js");//require models

//to connect database
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
// const dburl=process.env.ATLASDB_URL;
 //FOR CALL main funtion
 main()
 .then(()=>{    
    console.log("connected to db");
 })
 .catch((err)=>{
console.log(err);
 });
 async function main(){
   await mongoose.connect( MONGO_URL);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));//yeh view ke liye h
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const sessionOption={
  secret:"mysecret",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  }
};

app.get("/",(req,res)=>{
res.send("hi I am root");//basic api
});

app.use(session(sessionOption));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));//

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
});
app.get("/demouser",async(req,res)=>{
  let fakeUser=new User({
    email:"rahul@gmail.com",
    username:"rahul1233"
  });
   
  let registerUser=await User.register(fakeUser,"rahul@123")
res.send(registerUser);
});
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);
app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"page not found"));
});
app.use((err,req,res,next)=>{
  let{statuscode=500,message="something went wrong"}=err;
  res.status(statuscode).render("error.ejs", {message});
  // res.status(statuscode).send(message);
  // res.send("something went wrong");
});


app.listen(8080,()=>{
    console.log("server is listening to port 8080");//for server
});