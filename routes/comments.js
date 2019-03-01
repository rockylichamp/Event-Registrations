const express = require("express");
const data = require("../data");
const router = express.Router();
const xss = require("xss");

const mongoCollections = require("../setting/mongoCollection");
const comment = mongoCollections.comment;


try {

    router.get("/:id", async (req, res) => {

        let cookie = req.cookies.name;

        let formId = xss(req.params.id);

        let userComment;

        var userShow = true;

        if (cookie) {

            let showaddComment = "show";
            let userId;



            if (!cookie.includes("user")) {
                showaddComment = "hide";
                userShow = false;

            }
            else {
                userId = cookie.replace("user", "");
            }

            let formDetails = await data.getForm(formId);

            const commentCollection = await comment();

            const form = await commentCollection.findOne({ formId: formId });

            let dataComment = [];

            if (form != null) {
                let comments = form.user;

                // console.log(form);




                for (let prop in comments) {




                    let user = await data.getUser(comments[prop].id);

                    let fullName = " ";

                    fullName = user.firstName + " " + user.lastName;


                    let obj = {
                        name: fullName,
                        comment: comments[prop].comment
                    }

                    if (comments[prop].id == userId) {
                        showaddComment = "hide";
                        dataComment.unshift(obj);
                    }
                    else {
                        dataComment.push(obj);
                    }
                    



                }
            }

            if (dataComment.length == 0) {

                userComment = true;

            }




            res.status(200).render("comments", { title: "Comments", user: userComment, userShow: userShow, show: true, dataComment: dataComment, form: formDetails, showaddComment: showaddComment });

        }
        else {
            res.status(403).render("notLogged");
        }



    });


}
catch (e) {
    //internal sever error

    console.log(e);
}

module.exports = router;