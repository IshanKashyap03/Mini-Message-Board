const express = require("express");
const path = require("node:path");
const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const links = [
    { href: "/", text: "Home" },
    { href: "/new", text: "Write a new message" },
]

const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
];

app.get('/', (req, res) => {
    res.render("index", { title: "Mini Messageboard", links: links, messages: messages });
})

app.get('/new', (req, res) => {
    res.render('form');
})

app.get('/details/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const message = messages[id];
    res.render("details", {links: links, message: message });
})

app.post('/new', (req, res) => {
    const messageText = req.body.message;
    const messageUser = req.body.author;
    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect("/");
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
