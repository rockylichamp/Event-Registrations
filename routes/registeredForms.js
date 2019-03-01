const express = require("express");
const data = require("../data");
const router = express.Router();


router.get("/", async (req, res) => {

    let cookie = req.cookies.name;

    let formSend = [];

    if (cookie) {

        if (cookie.includes("user")) {

            let formDetails = {};
            let formDetailsArray = [];

            let userId = cookie.replace("user", "");

            let formsRegistered = await data.getallRegisteredForms();

            let forms = JSON.parse(JSON.stringify(formsRegistered));

            for (let prop in forms) {


                let check = false;

                let users = forms[prop].user;

                if (users.hasOwnProperty("id")) {
                    if (users.id != "null" && users.id == userId) {

                        check = true;

                    }
                }
                else {

                    let user = JSON.parse(JSON.stringify(users));

                    let numberOfPersonAttending;

                    let nameOfPerson;

                    for (let i in user) {
                        if (user[i].id == userId) {
                            check = true;
                            nameOfPerson = user[i].name;
                            numberOfPersonAttending = user[i].number;
                            break;
                        }
                    }

                    if (check) {


                        let formId = forms[prop].formId

                        formDetails = await data.getForm(formId);

                        console.log(formDetails);

                        if (formDetails.hasOwnProperty("title")) {

                            if(formDetails.ageRestriction == true){
                                formDetails.ageRestriction = "Above 18 years only";
                            }
                            else{
                                formDetails.ageRestriction = "No restriction for age";
                            }
                            
                            if(formDetails.genderRestriction == "M"){
                                formDetails.genderRestriction = "Male event"
                            }
                            else if(formDetails.genderRestriction == "F"){
                                formDetails.genderRestriction = "Female event" ;
                            }
                            else{

                                formDetails.genderRestriction = "Male/Female both allowed";

                            }

                            formDetails.personName = nameOfPerson;

                            formDetails.numberOfPersonAttending = numberOfPersonAttending;

                            formDetailsArray.push(formDetails);

                        }



                    }



                }


            }




            res.render("registeredForms", { form: formDetailsArray, show: true ,userShow:true});


        }

        else {

            res.status(403).render("wrongAccess");
        }

    }
    else {


        res.status(403).render("notLogged");
    }


});

module.exports = router;