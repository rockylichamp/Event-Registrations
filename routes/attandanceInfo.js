const express = require("express");
const data = require("../data");
const router = express.Router();

try {

    router.get("/", async (req, res) => {

        let cookie = req.cookies.name;

        let registeredData = [];

        if (cookie) {

        //     console.log('cookie.includes("admin")'+cookie.includes("admin"));

            if (cookie.includes("admin")) {



                let formsData = await data.getRegisterUserToForm();



                if (!formsData.hasOwnProperty("message")) {
                    //no one registered for the event

                    let arrForms = [];

                    for (let prop in formsData) {

                        let obj = {};

                        let formName = await data.getForm(formsData[prop].formId);

                        if (!formName.hasOwnProperty("message")) {
                            obj.formName = formName.title;
                            obj.formId = formName._id;

                            obj.user = [];

                            for (let i in formsData[prop].user) {


                                let id = formsData[prop].user[i].id;

                                let user = await data.getUser(id);


                                let name = "";

                                if (!user.hasOwnProperty("message")) {

                                    name = user.firstName + " " + user.lastName;
                                }

                                obj.user.push(name);

                            }

                            arrForms.push(obj);
                        }




                    }

                    console.log(arrForms);


                    res.status(200).render('admin', { title: 'Admin Page', formsData: arrForms, createFormActive: "", show: true, formInfoActive: "", attandanceActive: "active" });


                }
                else {

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

}
catch (e) {
    throw console.log(e);
}

module.exports = router;