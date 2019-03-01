const express = require("express");
const data = require("../data");
const router = express.Router();
const xss = require("xss");

router.get("/:id", async (req, res) => {


    let cookie = req.cookies.name;

    if (cookie) {

        if (cookie.includes("user")) {

            let formId = xss(req.params.id);
            let formDetail = await data.getForm(formId);


            if(!formDetail.hasOwnProperty("message")){

                if(formDetail.ageRestriction == true){

                    formDetail.ageRestriction = "Above 18 years Only"

                }
                else{

                    formDetail.ageRestriction = "No age restriction"

                }

                if(formDetail.genderRestriction == "M"){

                    formDetail.genderRestriction = "Only Males Allowed";

                }
                else if(formDetail.genderRestriction == "F"){

                    formDetail.genderRestriction = "Only Females Allowed";
                }
                else{

                    formDetail.genderRestriction = "Males/Females Allowed"

                }

            }
            

            res.render("registrationForm", { title: "Form Registration",userShow:true, form: formDetail, show: true });

        }
        else {
            //admin is trying to loggin

            res.status(403).render("wrongAccess");
        }
    }
    else {
        //user is not logged in

        res.status(403).render("notLogged");
    }








    
});


module.exports = router;