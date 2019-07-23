const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

mongoose.connect("mongodb://localhost/nodestudy",  { useNewUrlParser: true });

const PersonModel = mongoose.model("person", {
    firstname: String,
    lastname: String
});

app.post("/person", async (request, response) => {
    try{
        var person = new PersonModel(request.body);
        var result = await person.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/", async (request, response) => {
    try {
        response.send("Node js + Mongoose Simple Example");
    } catch (error) {
        response.status(500).send(error);
    }}
);

app.get("/people", async (request, response) => {
    try {
        var result = await PersonModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }}
);
app.get("/person/:id", async (request, response) => {
    try {
        var person = await PersonModel.findById(request.params.id).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});
app.put("/person/:id", async (request, response) => {
    try {
        var person = await PersonModel.findById(request.params.id).exec();
        person.set(request.body);
        var result = await person.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});
app.delete("/person/:id", async (request, response) => {
    try {
        var result = await PersonModel.deleteOne({_id: request.params.id}).exec();
    } catch (error) {
        response.status(500).send(error);
    }
});

const bookModel = mongoose.model("book", {
    bookname: String,
});

app.post("/book", async (request, response) => {
    try{
        var person = new bookModel(request.body);
        var result = await person.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/book", async (request, response) => {
    try {
        var result = await bookModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }}
);

app.listen(3000, (data) => {
    console.log("Listening at :3000..."+data)
})


