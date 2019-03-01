const express = require("express");
const data = require("../data");
const xss = require("xss");
const router = express.Router();


try {
    router.post("/", async (req, res) => {



        let cookie = req.cookies.name;

        if (cookie) {

            if (cookie.includes("admin")) {

                let body = {};
                body.eventName = xss(req.body.eventName);
                body.eventPlace = xss(req.body.eventPlace);
                body.eventDate = xss(req.body.eventDate);
                body.eventTime = xss(req.body.eventTime);
                body.noOfSeats = xss(req.body.noOfSeats);
                body.cost = xss(req.body.cost);
                body.age = xss(req.body.age);
                body.gender = xss(req.body.gender);
                body.description = xss(req.body.description);

                let message = {};

                // var dateArr = [];
                // dateArr = body.eventDate.split("-");

                var today = new Date();

                let month = today.getMonth();
                month = month + 1;

                var todayDate = `${today.getFullYear()}-${month}-${today.getDate()}`;
               

                var givendateComp = new Date(body.eventDate);
                var todayDateComp = new Date(todayDate);


                if (body.eventName.length == 0) {

                    message.description = "Event Name is Empty. Sorry Could not create Form.";

                }
                else if (body.eventPlace.length == 0) {

                    message.description = "Event Locationis Empty. Sorry Could not create Form.";

                }
                else if (body.eventDate.length == 0) {

                    message.description = "Event Date is Empty. Sorry Could not create Form."

                }
                else if (givendateComp <= todayDateComp) {

                    message.description = "Event Date must be greater than todays date. Sorry Could not create Form."

                }
                else if (body.eventTime.length == 0) {

                    message.description = "Event Time is Empty. Sorry Could not create Form."

                }
                else if (body.noOfSeats.length == 0) {

                    message.description = "Event Acomodation seats is Empty. Sorry Could not create Form."

                }
                else if (body.noOfSeats.includes("-")) {

                    message.description = "Event Acomodation seats Cannot be Negative. Sorry Could not create Form."

                }
                else if (body.noOfSeats == "0") {

                    message.description = "Event Acomodation seats Cannot be zero. Sorry Could not create Form."

                }
                else if (body.cost.includes("-")) {

                    message.description = "Event cost seats cannot be Negative. Sorry Could not create Form."

                }
                else if (body.age.length == 0) {

                    message.description = "Age restriction is Empty. Sorry Could not create Form."

                }
                else if (body.gender.length == 0) {

                    message.description = "Gender Restriction is Empty. Sorry Could not create Form."

                }
                else if (body.description.length == 0) {

                    message.description = "Event Description is Empty. Sorry Could not create Form."

                }

                if (message.hasOwnProperty("description")) {

                    message.title = "Error";

                    res.status(400).render('admin', { Message: message, modal: "modal", title: 'Admin Page', show: true, showMessage: true, formInfoActive: "", createFormActive: "active" });


                }
                else {

                    let insert = await data.createForm(req.body);



                    let objectEmpty = true;
                    await isEmpty(insert);


                    if (!insert.hasOwnProperty("message")) {

                        message.title = "Success";
                        message.description = "Successfully Created Form."

                        res.status(200).render('admin', { Message: message, modal: "modal", title: 'Admin Page', show: true, showMessage: true, formInfoActive: "", createFormActive: "active" });

                    }
                    else {

                        message.title = "Error";
                        message.description = "Sorry could not Create form."


                        res.status(400).render('admin', { Message: message, show: true, modal: "modal", title: 'Admin Page', showMessage: true, formInfoActive: "", createFormActive: "active" });
                    }

                    function isEmpty(obj) {



                        for (var key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                objectEmpty = false;
                                break;
                            }

                        }
                    }

                }




            }
            else {
                // user trying to loggin
                res.status(403).render("wrongAccess");
            }


        }
        else {
            // not logged in

            res.status(403).render("notLogged");

        }





    });




}
catch (e) {
    throw console.log("Problem occured in displaying Result Page.");
}

module.exports = router;


