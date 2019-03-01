const express = require("express");
const data = require("../data");
const bcrypt = require('bcrypt');
const router = express.Router();


router.post("/", async (req, res) => {

    let errorLogin = "";

    let email = req.body.email;

    let userExist = await data.checkEmail(email);

   

    if (JSON.stringify(userExist).length > 0 && userExist != null) {

        

        let user = JSON.parse(JSON.stringify(userExist));

        let password = req.body.password;


        let passwordCheck = await bcrypt.compareSync(password,user.password);


        if(passwordCheck){

            let type =  "";

            if(user.type == "U"){

                type = "user"
                res.cookie('name', `${type}${user._id}`);
                res.redirect("/user");
            }
            else{

                type = "admin";
                res.cookie('name', `${type}${user._id}`);
                res.redirect("/admin");
            }

        }
        else{

            errorLogin = "Username or Password incorrect";
            res.render('login',{title:'Login Page',show:false,errorLogin:errorLogin});

        }



    }
    else {

        errorLogin = "Username or Password incorrect";
        res.render('login',{title:'Login Page',show:false,errorLogin:errorLogin});

    }



});

module.exports = router;