const Listing=require("../models/listing")
module.exports.index=async (req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index",{allListings});
}

module.exports.renderNewFrom=(req,res)=>{
      res.render("listings/new.ejs");
      }

 module.exports.showListing=async (req,res)=>{
        let {id}=req.params;
        const listing = await Listing.findById(id).populate("reviews").populate("owner");
        if(!listing){
          req.flash("error","does not exit ");
          res.redirect("/listings");
        }
        console.log(listing);
        res.render("listings/show",{listing});
    }
module.exports.creatListing=async (req, res,next) => {
    // if(!req.body.listing){
    //   throw new ExpressError(400,"send valid data");
    // }
 let filename= req.file.filename;
 let url=req.file.path;
 console.log(filename,"..",url);
      // const newListing = new Listing(req.body.listing);
      // newListing.owner=req.user._id;
      // newListing.image={filename,url};
      // await newListing.save();
      req.flash("success","new listing added");
      res.redirect("/listings");
  }  
  
  module.exports.editListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","does not exit ");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  }

  module.exports.updateListing=async (req, res) => {
    // if(!req.body.listing){
    //   throw new ExpressError(400,"send valid data");
    // }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success","updated listing");
    res.redirect(`/listings/${id}`);
  }
  module.exports.deleteListing=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," listing deleted");
    res.redirect("/listings");
  }