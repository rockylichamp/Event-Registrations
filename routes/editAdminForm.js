const express = require("express");
const data = require("../data");
const router = express.Router();
const xss = require("xss");

router.post("/:id", async (req, res) => {

    let cookie = req.cookies.name;

    if (cookie) {

        if (cookie.includes("admin")) {

            let message = {};

            let body ={};
            body.name = xss(req.body.name);
            body.location = xss(req.body.location);
            body.eventDate = xss(req.body.eventDate);
            body.eventTime = xss(req.body.eventTime);
            body.noOfSeats = xss(req.body.noOfSeats);
            body.cost = xss(req.body.cost);
            body.age = xss(req.body.age);
            body.gender = xss(req.body.gender);
            body.description = xss(req.body.description);

            let form = body;

            let formId = xss(req.params.id);

            var today = new Date();

            let month = today.getMonth();
                month = month + 1;

                var todayDate = `${today.getFullYear()}-${month}-${today.getDate()}`;
               

                var givendateComp = new Date(body.eventDate);
                var todayDateComp = new Date(todayDate);

            
        if (body.name.length == 0) {

            // console.log(body.eventName.length);
            message.description = "Event Name is Empty. Sorry Could not update Form.";

        }
        else if (body.location.length == 0) {
           
            message.description = "Event Locationis Empty. Sorry Could not update Form.";

        }
        else if (body.eventDate.length == 0) {

            message.description = "Event Date is Empty. Sorry Could not update Form."

        }
        else if (body.eventTime.length == 0) {

            message.description = "Event Time is Empty. Sorry Could not update Form."

        }
        else if (body.noOfSeats.length == 0) {

            message.description = "Event Acomodation seats is Empty. Sory Could not update Form."

        }
        else if (givendateComp <= todayDateComp) {

            message.description = "Event Date must be greater than todays date. Sorry Could not update Form."

        }
        else if(body.cost.includes("-")){

            message.description = "Event cost seats cannot be Negative. Sorry Could not create Form."

        }
        else if(body.noOfSeats.includes("-")){

            message.description = "Event Acomodation seats Cannot be Negative. Sorry Could not update Form."

        }
        else if (body.age.length == 0) {

            message.description = "Age restriction is Empty. Sorry Could not update Form."

        }
        else if (body.gender.length == 0) {

            message.description = "Gender Restriction is Empty. Sorry Could not update Form."

        }
        else if (body.description.length == 0) {

            message.description = "Event Description is Empty. Sorry Could not update Form."

        }

        if (message.hasOwnProperty("description")) {

            message.title = "Error";

            res.status(400).render('admin', { Message: message, modal: "modal", title: 'Admin Page', show: true, showMessage: true, formInfoActive: "", createFormActive: "active" });


        }

        else{

            if (form.age == "option1") {
                form.age = true;
            }
            else {
                form.age = false;
            }

            if (form.gender == "option1") {
                form.gender = "M";
            }
            else if (form.gender == "option2") {
                form.gender = "F";
            }
            else{
                form.gender = "MF";
            }

            let edit = await data.replaceForm(formId, form);

            

            if (edit.hasOwnProperty("message")) {


                message.title = "Error";
                message.description = "Sorry could not update form."

                //error occured
                res.status(403).render("admin", { Message: message, title: 'Admin Page', createFormActive: "active", show: true, formInfoActive: "", modal: "modal" });
            }
            else {

                message.title = "Success";
                message.description = "Successfully Updated Form."

                res.status(200).render("admin", { modal: "modal", Message: message, title: 'Admin Page', createFormActive: "active", show: true, formInfoActive: "" });

            }


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