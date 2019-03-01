const express = require("express");
const data = require("../data");
const bcrypt = require('bcrypt');
const router = express.Router();


router.get("/", async (req, res) => {

    let message = req.query.message;

    let cookie = req.cookies.name;
    if (cookie) {

        let userId;

        if (cookie.includes("user")) {
            userId = cookie.replace("user", "");

            // console.log("user id:" + userId);


            let forms = await data.getAllForms();

            let updateForms = [];

            for (let prop in forms) {
                // console.log(prop);
                // console.log("form id:" + forms[prop]._id);
                let formExist = await data.checkFormRegisteredByUser(forms[prop]._id);
                // console.log("324567890");
                // console.log(JSON.stringify(formExist));
                // console.log(JSON.stringify(formExist).hasOwnProperty('user'));

                if (!JSON.stringify(formExist).hasOwnProperty('user') && JSON.stringify(formExist) != "null") {

                    // console.log(JSON.parse(JSON.stringify(formExist)));
                    // console.log("%%%%%%%%%%%%%%");
                    // console.log(JSON.stringify(formExist));

                    // let obj = JSON.parse(JSON.stringify(formExist)).user.find(o => o.id === userId);

                    let flag = true;
                    let obj = JSON.parse(JSON.stringify(formExist)).user;

                    for (let a in obj) {

                        if (obj[a].id == userId) {
                            flag = false;
                        }
                    }



                    // console.log("object"+JSON.parse(JSON.stringify(formExist)).user[0].id);

                    if (flag) {
                        if (forms[prop].ageRestriction == true) {
                            forms[prop].ageRestriction = "Below 18 Years";
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
                        updateForms.push(forms[prop]);
                    }
                }
                else {
                    // console.log(forms[prop]);
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
                    updateForms.push(forms[prop]);
                }



            }

            let modal = "";
            let status;
            if (message == "success") {

                message = {};
                message.title = "Success";
                message.description = "Successfully Registered for Event. Thank you for registering. Check your mail for confirmation."
                modal = "modal";
                status = 200;

            }
            else if(message == "failure"){

                message = {};
                message.title = "Error";
                message.description = "Sorry could not Register for Event. Please try after Some Time"
                modal = "modal";
                status = 400;

            }else if(message == "notDeleted"){

                message = {};
                message.title = "Error";
                message.description = "Sorry could not Cancel ticket. Please try after Some Time"
                modal = "modal";
                status = 400;

            }
            else if(message == "deleted"){
                message = {};
                message.title = "Success";
                message.description = "Successfully Canceled the tickets. Please look at other events."
                modal = "modal";
                status = 200;
            }
            else if(message == "updated"){

                message = {};
                message.title = "Success";
                message.description = "Successfully Updated the ticket. Please look at other events. Check your mail for confirmation."
                modal = "modal";
                status = 200;

            }
            else if(message == "notUpdated"){

                message = {};
                message.title = "Error";
                message.description = "Sorry could not Update ticket. Please try after Some Time"
                modal = "modal";
                status = 400;
                
            }

            // console.log(typeof status);

            if(typeof status == "undefined"){
                status = 200;
            }


            // console.log(forms);
            res.status(status).render('user', { Message: message, modal: modal, title: 'User Page', form: updateForms, show: true, homeActive: "active", userShow: true });

        }
        else {
            //error for admin cookie

            res.status(403).render("wrongAccess");
        }

    }
    else {

        //error for no cookie
        res.status(403).render("notLogged");

    }


});


module.exports = router;