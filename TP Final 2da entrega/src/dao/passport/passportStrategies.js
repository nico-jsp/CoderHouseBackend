import passport from 'passport';
import { hashPassword } from '../../utils.js';
import { usersModel } from "../models/users.model.js";
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2';
import { disconnect } from 'mongoose';


//Estas variables van en un .env
const GITHUB_CLIENT_ID = 'Iv1.724c2a6d7dd90ad4'
const GITHUB_CLIENT_SECRET = '6bc54f08c73acc8830d7f96e1a89e02e46c4c494'
//-----------------------------

passport.use('registro', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await usersModel.findOne({ email })
    if (user) {
        return done(null, false)
    }
    const hashNewPassword = await hashPassword(password)
    const newUser = { ...req.body, password: hashNewPassword }
    // console.log(newUser)
    const newUserBD = await usersModel.create(newUser)
    // console.log(newUserBD)
    done(null, newUserBD)
}))

//github strategy
passport.use('github', new GithubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/users/github"
}, async (accessToken, refreshToken, profile, done) => {
    const user = await usersModel.findOne({ email: profile._json.email })
    // console.log(profile)
    if (!user) {
        const newUser = {
            firstName: profile._json.name.split(' ')[0],
            lastName: profile._json.name.split(' ')[1] || ' ',
            email: profile._json.email,
            dni: ' ',
            password: ' '
        }
        // console.log(newUser);
        const userDB = await usersModel.create(newUser)
        done(null, userDB)
    } else {
        done(null, user)
    }
    done(null, true)
}))


//Estas dos funciones se pasan SIEMPRE a passport
passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const user = await usersModel.findById(id)
    done(null, user)
})


/**
 * 
 * App ID: 306223

Client ID: Iv1.724c2a6d7dd90ad4

Client Secret: 6bc54f08c73acc8830d7f96e1a89e02e46c4c494
 */