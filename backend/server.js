const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const User = require('./models/user');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

const URI = 'mongodb://localhost:27017/blogSite';

mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology : true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to the database");
    })
    .catch(err => console.log(err));

app.get('/blogs',(req,res) => {
    Blog.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.status(500).send({'message' : "couldn't send data"});
        })
})


app.post('/create',(req,res) => {
    console.log(req.body);
    const blog = new Blog(req.body);

    blog.save()
        .then(result => {
            console.log("data has been saved into the database", result);
            res.send(result);
        })
        .catch(err => {
            console.log("found error while saving the blog in the database");
            console.log(err);
            res.sendStatus(404);
        })
    
        
})

app.post('/signup',(req,res) => {
    const user = new User(req.body);
    const email = req.body.email;

    User.find({email : email})
        .then(result => {
            if(result.length === 0){
                user.save()
                    .then(result => {
                        console.log("new user has been added to the database", result);
                        res.send(result);
                    })
                    .catch(err => {
                        console.log("error in adding the user")
                        res.sendStatus(404);
                    });
            }else{
                console.log(result);
                res.json({"message":"this email id is already in use"});
            }
        })
        .catch(err => console.log("error in finding the email id", err));
})

app.post('/signin',(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.find({email : email})
        .then(result => {
            if(result.length === 0){
                res.status(401).send({error : "No such user is present"});
            }else{
                const person = result[0];
                if(password === person.password){
                    res.json(person);
                }else{
                    res.status(401).send({error : "Entered password is wrong"});
                }
            }
        })
        .catch(err => {
            console.log("error in findind the user from the database");
        })
})

app.delete('/deleteBlog', (req, res) => {
    const id = req.body._id;
    console.log(id);
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.sendStatus(201);
        })
        .catch(err => {
            res.json({"message" : "couldn't find the blog in the database"});
            console.log(err);
        })
})

app.put('/incrementLike/:id', (req,res) => {
    const id = req.params.id;
    console.log(req.body.user);
    Blog.findByIdAndUpdate({_id : id} ,{$inc: { likes : 1 }}, {$push : {likedBy : req.body.user}})
        .then(result => {
            Blog.findByIdAndUpdate({_id : id}, {$push : {likedBy : req.body.user}})
                .then(Res => {
                    res.status(200).json({'message' : 'likes incremented'});
                }).catch(error => {
                    console.log("in pushing ", error);
                })
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })

    
})

app.put('/incBlogCount/:id', (req,res) => {
    const id = req.params.id;
    User.findByIdAndUpdate({_id : id}, {$inc : {blogCount : 1}})
        .then(result => {
            res.status(200).json({'message' : 'blogcount incremented'});
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})

app.put('/addComment/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    Blog.findByIdAndUpdate({_id : id}, {$push : {comments : req.body}})
        .then(result => {
            console.log("added data");
            res.status(200).json({'message' : 'added one more comment into the array'});
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})


app.listen(8000,() => console.log("connected to localhost 8000"));
 
