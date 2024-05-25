//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("home", {
      homeStartingContent: homeStartingContent,
      posts: posts
    });
}); 

app.get("/posts/:postName", function(req, res){
  const requestTitle = req.params.postName;
  posts.forEach(function(post){
    const storedTitle = post.title;
    if( lodash.lowerCase(requestTitle) === lodash.lowerCase(storedTitle) ){
      res.render("post", {post_title: post.title, post_body: post.body});
    }
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});    
}); 

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});    
}); 

app.get("/compose", function(req, res){
  res.render("compose");    
}); 

app.post("/compose", function(req, res){
  
  const post = {
    title : req.body.postTitle,
    body : req.body.postBody
  };

  posts.push(post);
  res.redirect("/");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
