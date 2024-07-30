const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoTask");
const path = require("path");

dotenv.config();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use("/stylesheets", express.static("public/stylesheets"));

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB!");
        app.listen(3000, () => console.log("Server running on port 3000"));
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });

// Set EJS as the view engine
app.set("view engine", "ejs");

// Routes
app.get('/', async (req, res) => {
    try {
        const tasks = await TodoTask.find({});
        res.render("todo", { todoTasks: tasks });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.post('/', async (req, res) => {
    const todoTask = new TodoTask({ content: req.body.content });
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.redirect("/");
    }
});

app.route("/remove/:id")
    .get(async (req, res) => {
        const id = req.params.id;
        try {
            await TodoTask.findByIdAndRemove(id);
            res.redirect("/");
        } catch (err) {
            console.error(err);
            res.redirect("/");
        }
    });

app.route("/edit/:id")
    .get(async (req, res) => {
        const id = req.params.id;
        try {
            const tasks = await TodoTask.find({});
            res.render("todoEdit", { todoTasks: tasks, idTask: id });
        } catch (err) {
            console.error(err);
            res.redirect("/");
        }
    })
    .post(async (req, res) => {
        const id = req.params.id;
        try {
            await TodoTask.findByIdAndUpdate(id, { content: req.body.content });
            res.redirect("/");
        } catch (err) {
            console.error(err);
            res.redirect("/");
        }
    });
