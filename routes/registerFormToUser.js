const express = require("express");
const data = require("../data");
const router = express.Router();
var nodemailer = require('nodemailer');
let fs = require("fs");
let path = require("path");
const xss = require("xss");

router.post("/:id", async (req, res) => {


    let formData = req.body;

    let formId = xss(req.params.id);

 

    let cookie = req.cookies.name;

   

    let userId;

    if (cookie) {

        if (cookie.includes("user")) {

            userId = cookie.replace("user", "");

            formData.userId = userId.toString();



            let registerUserToForm = await data.registerForm(formData, formId);

            var formDetail = await data.getForm(formId);

       


            if (!registerUserToForm.hasOwnProperty("message")) {

                let message = "success";

                let userInfo = await data.getUser(userId);

      

                let emailId = userInfo.email;

                let fileName = "formRegisterd.txt";

                let filePath = path.join(__dirname, "../public", fileName);


                let content = "";

                fs.readFile(filePath, 'utf8', function read(err, data) {
                    if (err) {
                        throw console.log(err);
                    }

                    content = data;

                    

                    content = content.replace("&name&", formData.name);
                    content = content.replace("&number&", formData.number);
                    content = content.replace("&eventName&",formDetail.title);

                    let transporter = nodemailer.createTransport({
                        service: 'outlook',
                        auth: {
                            user: 'hindalka@stevens.edu',
                            pass: 'Stevens139158'
                        }
                    });

                    let mailOptions = {
                        from: 'hindalka@stevens.edu',
                        to: emailId,
                        subject: "Successfully registered for Event",
                        text: content
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                });


                res.redirect('/user?message=' + message);

            }
            else {
                // res.redirect("/user");

                let message = "failure";

                res.redirect('/user?message=' + message);
            }
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