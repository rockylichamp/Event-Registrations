const express = require("express");
const data = require("../data");
const formInfoRoutes = require("./formInfo");
const router = express.Router();
const xss = require("xss");

router.post("/:id", async (req, res) => {

    let cookie = req.cookies.name;

    // console.log(cookie);

    if (cookie) {

        if (cookie.includes("admin")) {


            let formId = xss(req.params.id);

            let del = await data.deleteForm(formId);



            let message = {};

            // console.log(del);

            if (del) {

                message.title = "Success";
                message.description = "Successfully Deleted Form."

                console.log("message"+message);

                res.status(200).render("admin", { Message: message, title: 'Admin Page', createFormActive: "active", show: true, formInfoActive: "", modal: "modal" });
               
            }
            else {

               

                message.title = "Error";
                message.description = "Sorry could not delete form."

                res.status(400).render("admin", { Message: message, title: 'Admin Page', createFormActive: "active", show: true, formInfoActive: "", modal: "modal" });
            }

        }
        else {

            //user is trying to loggin
            res.status(403).render("wrongAccess");

        }

    }
    else {
        //not loggedin
        res.status(403).render("notLogged");
    }







});


module.exports = router; 