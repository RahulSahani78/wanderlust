const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{
    res.send("gets users");
});

router.get("/:id",(req,res)=>{
    res.send("get user id");
});

router.post("/",(req,res)=>{
    res.send("post user");
});

router.delete("/:id",(req,res)=>{
    res.send("delete users");
});

module.exports=router;
