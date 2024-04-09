const express = require("express");
const app = express();
let port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid"); //To asign new id

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});


let posts = [
    {
        id: uuidv4(),
        username: "amitsaini",
        content: "i love coding",
    },
    {
        id: uuidv4(),
        username: "rahul",
        content: "i am a student",
    },
    {
        id: uuidv4(),
        username: "jaya",
        content: "today i want to go for walk ",
    },
];

// Index Route
app.get("/posts", (req,res) => {
    res.render("index.ejs", {posts});
})

//Create Route
app.get("/posts/new", (req,res) => {
    res.render("new.ejs")
})

app.post("/posts", (req,res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
})

//Show Route
 app.get("/posts/:id", (req,res) => {
    let { id } = req.params;
    let post = posts.find( (p) => id === p.id );
    res.render("show.ejs");
 });

 //Update Route
 app.patch("/posts/:id", (req,res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find( (p) => id === p.id );
    post.content = newContent;
    res.send(`patch request working`);
 })

 //Edit Route
 app.get("/posts/:id/edit", (req,res) => {
    let { id } = req.params;
    let post = posts.find( (p) => id === p.id );
    res.render("edit.ejs")
 })

 //Destroy Route
 app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find( (p) => id === p.id );
    
 })