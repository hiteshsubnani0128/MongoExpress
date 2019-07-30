const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String

});

const Blog = mongoose.model('Blog', blogSchema);


app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post("/", (req, res)=>{
    const a={
        title:  req.body.title,
    author: req.body.author,
    body:   req.body.blog
    }

    const kitty = new Blog(a);
    kitty.save()
    .then(()=>{
        console.log("data logged");
        res.redirect("/");
    })
});


app.listen(3000, ()=>{
    console.log("App listening on port 3000");
})

