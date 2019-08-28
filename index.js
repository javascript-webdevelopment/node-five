require('dotenv').config();
const express = require('express');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session');

// Controllers
const authCtrl = require('./controller/auth_controller');

// ENV Variable
const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET
} = process.env;

// App Instance
const app = express();

// Database Connection
massive(CONNECTION_STRING)
    .then(dbInstance => {
        app.set('db', dbInstance);
        console.log('Database is running!')
    })
    .catch(error => {
        console.log('Databse connection failed!')
    });

// TLM
app.use(express.json());
app.use(cors());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 60000
    }
}));

// End Points
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);


// App Listening
app.listen(SERVER_PORT, () => console.log('Server running!'))