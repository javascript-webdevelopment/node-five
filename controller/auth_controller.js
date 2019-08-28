const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    // get db instance
    const db = req.app.get('db');
    // get email and password from body
    const {email, password} = req.body;
    // find an existing email
    const foundUser = await db.get_user([email]);
    // check to see if user is found
    if(foundUser[0]) return res.status(409).send('Sorry, email already exists.');
    // If user is not found, create a new hash and salt
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(password, salt);
    // Add user to database
    const newUser = await db.register_user([email, hash]);
    // Add user to the session
    req.session.user = newUser[0];
    // Send user back
    res.status(200).send(req.session.user);
};

const login = async (req, res) => {
    // get db instance
    const db = req.app.get('db');
    // get email and password from body
    const {email, password} = req.body;
    // find an existing email
    const foundUser = await db.get_user([email]);
    // check to see if user is found
    if(!foundUser[0]) return res.status(409).send('Sorry, email already exists.');
    // else use will be found so compare password to the hashed password stored in db
    const authenticated = bcrypt.compareSync(password, foundUser[0].password);
    // check to see if authenticated is true or false
    if(authenticated){
        // remove user password
        delete foundUser[0].password;
        // if authed set user to session and make a response
        req.session.user = foundUser[0];
        // send response
        res.status(200).send(req.session.user);
    } else {
        // if failure send error message
        return res.status(401).send('Inccorect username or password');
    };
};

module.exports = {
    register,
    login
};