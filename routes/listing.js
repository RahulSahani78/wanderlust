const express = require("express");
const router = express.Router();
const wrapAsyc = require("../utils/wrapAsyc.js");

const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({storage})

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
   
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

router
    .route("/")
    .get(wrapAsyc(listingController.index))
    .post(
        isLoggedIn, 
        validateListing,
        upload.single('listing[image]'),
        
        wrapAsyc(listingController.createListing))
    // .post( (req, res, next) => {
    //     if (!req.file) {
    //         return next(new ExpressError(400, "Image upload failed"));
    //     }
    //     res.send(req.file);
    // });
    
     
// New route
router.get("/new", isLoggedIn, listingController.renderNewFrom);


router
    .route("/:id")
    .get(wrapAsyc(listingController.showListing))
    .put(isLoggedIn, validateListing, wrapAsyc(listingController.updateListing))
    .delete(isLoggedIn, wrapAsyc(listingController.deleteListing));


// Show route
router.get("/:id", wrapAsyc(listingController.showListing));

// Edit route
router.get("/:id/edit", isLoggedIn, wrapAsyc(listingController.editListing));

// Update Route
router.put("/:id", isLoggedIn, validateListing, wrapAsyc(listingController.updateListing));

// Delete Route
router.delete("/:id", isLoggedIn, wrapAsyc(listingController.deleteListing));

module.exports = router;
