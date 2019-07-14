const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const knex = require('knex');
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
  		ssl: true
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json(`it's working`);
});

app.post('/signIn', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, saltRounds) });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });

app.put('/image', image.handleImagePost(db));

app.post('/imageUrl',  (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${ process.env.PORT }`);
});
