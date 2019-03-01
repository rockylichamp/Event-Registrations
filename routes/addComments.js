const express = require("express");
const data = require("../data");
const router = express.Router();
const xss = require("xss");


try{


    router.post("/:id",async(req,res)=>{

        let cookie = req.cookies.name;

        if(cookie){

            if(cookie.includes("user")){

                let comment = req.body.comments;

                let formID = xss(req.params.id);

                let userId = cookie.replace("user","");

                let addComment = await data.addComment(comment,userId,formID);

                console.log(addComment);

                res.redirect("user");




            }
            else{
                //admin doesnt have right to add comments

                res.status(403).render("wrongAccess");
            }

        }
        else{

            //please logg in first

            res.status(403).render("notLogged");
        }

    });

}

catch(e){
    
    //internal error occured
}

module.exports = router;