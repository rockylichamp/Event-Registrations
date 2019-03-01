const express = require("express");
const data = require("../data");
const router = express.Router();
const path = require("path");

try {
    router.get("/", async (req, res) => {

        let cookie = req.cookies.name;

        if (cookie) {

            if (cookie.includes("admin")) {

                let forms = await data.getAllForms();

                for (let prop in forms) {

                    if (forms[prop].ageRestriction == true) {
                        forms[prop].ageRestriction = "Above 18 Years";
                    }
                    else {
                        forms[prop].ageRestriction = "No Age Restriction"
                    }

                    if (forms[prop].genderRestriction == "M") {
                        forms[prop].genderRestriction = "Male Event"
                    }
                    else if (forms[prop].genderRestriction == "F") {
                        forms[prop].genderRestriction = "Female Event"
                    }
                    else {
                        forms[prop].genderRestriction = "Male/Female Event"
                    }

                }
                if (forms.length > 0) {
                    res.render('admin', { title: 'Admin Page-Form Info', form: forms, show: true, formInfoActive: "active", createFormActive: "", empty: false });
                }
                else {

                    res.render('admin', { title: 'Admin Page-Form Info', form: forms, show: true, formInfoActive: "active", createFormActive: "", empty: true });
                }

            }
            else {
                //user is trying to access

                res.status(403).render("wrongAccess");
            }

        }
        else {
            //user is not logged in

            res.status(403).render("notLogged");
        }

    });



    module.exports = router;
}
catch (e) {
    throw console.log("Problem occured in displaying Result Page.");
}