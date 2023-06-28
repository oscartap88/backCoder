import { Strategy as GithubStrategy }   from "passport-github2";
import passport from "passport";
import UserDao from "../daos/mongodb/user.dao.js";
const userDao = new UserDao();

const strategyOptions = {
    clientID: 'Iv1.753ee887b9c9e2bd',
    clientSecret: '3fae169670e487ed30a22a1217217ecac29208f6',
    callbackURL: 'http://localhost:8080/users/profile-github'
};

const registerOrLogin = async(accessToken, refreshToken, profile, done) => {
    console.log('profile:::', profile);
    const email = profile._json.email 
    const user = await userDao.getByEmail(email);
    if(user) return done(null, user);
    const newUser = await userDao.createUser({
        name: profile._json.name.split(' ')[0],
        last_name: profile._json.name.split(' ')[1],
        email: email,
        password: ' ',
        isGithub: true
    });
    return done (null, newUser);
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));