const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const randomToken = require('random-token');
const cors = require("cors");
const app = express();
const port = 8800;

app.use('/', express.static('client'));
app.use(bodyParser.json());
app.use(cors()); 

class Post {
    author
    date
    text
    
    constructor(message) {
        title = message.title;
        receiver = message.user;
        sender = username;
        message = post.post;
        img = message.img == undefined ? null : post.img;
        url = message.url == undefined ? null : post.url;
    }

    insert() {
        return `
        insert into userinfo (author, title, receiver, url, img, message)
        values (${sender}, ${title}, ${receiver}, ${url}, ${img}, ${message})`;
    }
};

const db = require('better-sqlite3')('cobalt.db');
db.pragma('journal_mode = WAL');

const users = db.prepare('SELECT * FROM users;').iterate();
// const posts = db.prepare('SELECT * FROM posts;').run();

console.log(users.find(e => e.username == "nikeedev"));

const tokens = {

};


app.get('/', (req, res) => {
    res.status(200).send("hi :3");
});

app.post('/token', (req, res) => {
    const { username, password } = req.body;
    
    let user = users.find(e => {
        console.log("e:", e.username);

        return e.username == username;
    });

    console.log("username: '%s'", username);

    if (user.username == undefined || user.username == null) {
        res.statusCode = 403;
        res.send(JSON.stringify({ status: "error", message: `Username ${username} doesn't exist in the db. Are you registered?`}));
    }

    let hash = user.password_hash;
    
    if (bcrypt.compareSync(password, hash)) {
        if (Object.hasOwn(username)) {
            delete tokens[username];
        }
        let token = randomToken(32);

        tokens[username] = { "token": token };
        
        res.statusCode = 200;
        res.send(JSON.stringify({ status: "success", token: token }));
    } else {
        res.statusCode = 403;
        res.send(JSON.stringify({ status: "error", message: `Username or password is incorrect, failed to generate new token.`}));
    }
});

app.post('/check', (req, res) => {
    const { username, token } = req.body;
    if (tokens[username].token == undefined || tokens[username] == undefined) {
        res.statusCode = 403;
        res.send(JSON.stringify({ status: "error", message: `Username ${username} doesn't exist in the db. Are you registered?`}));
    }
    // console.log(tokens[username], token); 
    if (tokens[username].token == token) {
        res.statusCode = 200;
        res.send(JSON.stringify({ status: "success", exists: true }));
    } else {
        res.statusCode = 403;
        res.send(JSON.stringify({ status: "error", exists: false, message: `Token doesn't exist; generate new token.`}));
    }
});

app.post('/post', (req, res) => {
    /*
    const { username, token } = req.body.auth;
    
     if (tokens[username].token == undefined || tokens[username] == undefined) {
        res.statusCode = 403;
        res.send(JSON.stringify({ status: "error", message: `Username ${username} doesn't exist in the db. Are you registered?`}));
    }
    // console.log(tokens[username], token); 
    if (tokens[username].token == token) {
        const message = req.body.message;
        
        let data = new Message(message);
                
        chat_text.exec(data.insert());

        res.statusCode = 202;
        res.send(JSON.stringify({ status: "success", message: `Message successfully sent!`}));

    }*/
    res.status(202).send("Under development. Try it out later");
});


app.listen(port, () => {
    console.log(`Cobalt client running at: http://127.0.0.1:8800`);
});


