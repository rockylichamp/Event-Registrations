const createFormRoutes = require("./createForm");
const formInfoRoutes = require("./formInfo");
const attandanceInfoRoutes = require("./attandanceInfo");
const deleteFormRoutes = require("./deleteForm");
const editFormAdminRoutes = require("./editAdminForm");
const registerFormRoutes = require("./registerForm");
const registrationUserRoutes = require("./registerUser");
const registerFormToUserRoutes = require("./registerFormToUser");
const loginMiddelWearRoutes = require("./loginMiddelWear");
const registeredFormsRoutes = require("./registeredForms");
const deleteRegisterUserRoutes = require("./deleteRegisterUser");
const commentRoutes = require("./comments");
const addCommentRoutes = require("./addComments");
const updateRegisterUserRoutes = require("./updateRegisterUser");
const userRoutes = require("./userRoute");
const data = require("../data");
const path = require("path");
const express = require("express");
const router = express.Router();


try {
    const constructorMethod = app => {

        
        
        app.use("/adminDelete", deleteFormRoutes);

        app.use("/createForm", createFormRoutes);

        app.use("/updateRegisterUser", updateRegisterUserRoutes);

        app.use("/formInfo", formInfoRoutes);

        app.use("/addComment", addCommentRoutes);


        app.use("/adminEditForm", editFormAdminRoutes);

        app.use("/registrationUser", registrationUserRoutes);

        app.use("/register", registerFormRoutes);

        app.use("/registerFormToUser", registerFormToUserRoutes);

        app.use("/registeredForms", registeredFormsRoutes);

        app.use("/deleteRegisterUser", deleteRegisterUserRoutes);

        app.use("/attandanceInfo", attandanceInfoRoutes);

        app.use("/comment", commentRoutes);

        app.get("/admin", (req, res) => {

            let cookie = req.cookies.name;
            if (cookie) {

                if (cookie.includes("admin")) {
                    res.status(200).render('admin', { title: 'Admin Page', createFormActive: "active", show: true, formInfoActive: "" });
                }
                else {

                    //user is trying to login
                    res.status(403).render("wrongAccess");
                }

            }
            else {

                res.status(403).render("notLogged");
                //user is not logged in

            }


        });

        

        

        app.use("/user", userRoutes);

        app.get("/allUsers", async (req, res) => {
            let users = await data.getAllUsers();
            res.json(users);
        });

        app.get("/allforms", async (req, res) => {

            let forms = await data.getAllForms();

            res.json(forms);
        });

        app.get("/allform/:id", async (req, res) => {

            let forms = await data.getForm(req.params.id);

            res.json(forms);
        });

        app.get("/allRegisterForms", async (req, res) => {
            let reg = await data.getRegisterUserToForm();
            res.json(reg);
        });

        app.use("/login", loginMiddelWearRoutes);

        app.use("/logout", (req, res) => {
            res.clearCookie('name');
            res.redirect("/");
        });

        app.use("/deleteUser/:id", async (req, res) => {
            let dat = await data.deleteUser(req.params.id);
            let users = await data.getAllUsers();
            res.json(users);
        });

        app.use("/deleteRefisteredForm/:id",async (req,res)=>{

            let del = await data.deleteRefisteredForm(req.params.id);
            res.redirect("/allRegisterForms");

        });

        app.use("/deleteForm/:id", async (req, res) => {
            let dat = await data.deleteForm(req.params.id);
            let users = await data.getAllForms();
            res.json(users);
        });

        app.use("/deleteRegisteredForms/:id", async (req, res) => {
            let dat = await data.deleteRegisterForms(req.params.id);
            let registerForms = await data.getallRegisteredForms();
            res.json(registerForms);
        });



        app.get("/public/site.css", async (req, res) => {

            let filePath = await path.join(__dirname, "../css/style.css");

            res.sendFile(filePath);
        });


        app.use("/", (req, res) => {
            // let filePath = path.join(__dirname,"../public/index.html");
            let cookie = req.cookies.name;
            if (cookie) {

                if (cookie.includes("user")) {
                    res.status(200).redirect("/user");
                }
                else {
                    res.status(200).redirect("/admin");
                }

            }
            else {

                res.status(200).render('login', { title: 'Login Page', show: false });

            }


        });

        app.use("*",(req,res)=>{

            res.status(404).render("pageNotFound");

        });

    };

    module.exports = constructorMethod;
}
catch (e) {
    throw console.log("Problem occured in Displaying Page.");
}

