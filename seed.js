// const bcrypt = require('bcrypt');
// const mongoCollections = require("./setting/mongoCollection");
// const todoItems = mongoCollections.todoItems;
// const users = mongoCollections.users;
const data = require("./data");



async function main() {

 

    let user = {
        firstName: "Patrick",
        lastName: "Hill",
        email: "phill@stevens.edu",
        password: "patrickHill",
        dob: "1980-11-23",
        type: "A"
    }

    let createUser = await data.createUser(user);
    console.log(createUser);

    user = {
        firstName: "Shreesh",
        lastName: "Chavan",
        email: "schavan7@stevens.edu",
        password: "shreeshChavan",
        dob: "1995-06-23",
        type: "U"
    }

    createUser = await data.createUser(user);
    console.log(createUser);

    user = {
        firstName: "Harish",
        lastName: "Indalkar",
        email: "hindalka@stevens.edu",
        password: "harishIndalkar",
        dob: "1993-06-23",
        type: "U"
    }

    createUser = await data.createUser(user);
    console.log(createUser);

    user = {
        firstName: "Himanshu",
        lastName: "Chavan",
        email: "hchavan@stevens.edu",
        password: "himanshuChavan",
        dob: "1997-04-16",
        type: "U"
    }

    createUser = await data.createUser(user);
    console.log(createUser);

    let form = {
        eventName: "Sunburn Festival 2018",
        eventPlace: "Jersey Cities",
        eventDate: "2019-12-29",
        eventTime: "12:59",
        noOfSeats: "75",
        age: 'option1',
        gender: "option3",
        description: "Sunburn Festival 2018 is a 3 days festival from the 29th till the 31st of December 2018.",
        cost: "100"
    }

    let createForm = await data.createForm(form);
    console.log(createForm);




}

main();