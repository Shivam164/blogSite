const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const User = require('./models/user');

const app = express();

app.use(express.json());

const URI = 'mongodb://localhost:27017/blogSite';

mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology : true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to the database");
    })
    .catch(err => console.log(err));

app.post('/create',(req,res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then(result => {
            console.log("data has been saved into the database", result);
            res.send(result);
        })
        .catch(err => {
            console.log("found error while saving the blog in the database")
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
    console.log(req);
    User.find({email : email})
        .then(result => {
            if(result.length === 0){
                res.json({"message" : "No such user is present"});
            }else{
                const person = result[0];
                if(password === person.password){
                    res.json(person);
                }else{
                    res.sendStatus(401);
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
    Blog.findByIdAndUpdate({_id : id} ,{$inc: { likes : 1 }})
        .then(result => {
            res.status(200).json({'message' : 'likes incremented'});
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})


app.listen(8000,() => console.log("connected to localhost 8000"));
 
