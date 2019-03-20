const express = require('express');
const path = require('path');
//const DB = require("./db");

const app = express();
const port = process.env.PORT || 1345;


/*
const db = new DB();

db.init()
    .then(() => console.log("DB ready"))
    .catch(err => console.log(err));
*/

app.listen(port, () => {
    console.log("Server is listening on port " + port);

})

app.get("/", async (req, res) => {

    //let user_object = await db.get_row("SELECT * FROM personal");
    res.sendFile(path.join(__dirname + '/startseite.html'));});