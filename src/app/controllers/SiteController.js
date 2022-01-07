const { requiresAuth } = require('express-openid-connect');
const Course = require('../models/Course');
const User = require('../models/User');
const { multipleMongooseToObject, ...rest } = require('../../util/mongoose');

class SiteController {
    //[GET] /news
    home(req, res, next) {
        // res.render('home');
        // Course.find({}, function(err, courses) {
        //     if (!err) res.json(courses);
        //     else res.status(400).json({error: 'ERROR!!!'});
        // })
        // res.send(`hello ${req.oidc.user.name}`);
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
    // [GET] /profile
    profile(req, res) {
        new Promise((resolve, reject) => {
            if (req.app.locals.authenticated) {
                resolve();
            } else {
                reject();
            }
        })
            .then(() => {
                let user = req.oidc.user;
                if (req.app.locals.admin) user.admin = 'Admin';
                else user.admin = 'End-User';
                res.render('profile', { user });
            })
            .catch(() => {
                res.redirect('/login');
            });
    }
    // [GET] /login
    login(req, res) {
        req.app.locals.users = null;
        req.app.locals.authenticated = false;
        req.app.locals.admin = false;
        res.oidc.login({ returnTo: '/login_setting' });
    }
    // logout(req, res) {
    //     res.send("Log out");
    // }
    login_setting(req, res, next) {
        let users = {
            name: req.oidc.user.name,
            picture: req.oidc.user.picture,
        };
        User.findOne({ email: req.oidc.user.email })
            .then((user) => {
                if (!user) {
                    const add_user = new User({
                        name: req.oidc.user.name,
                        email: req.oidc.user.email,
                        admin: 0,
                    });
                    add_user.save().then();
                    req.app.locals.admin = 0;
                } else req.app.locals.admin = user.admin;
            })
            .catch(next);
        req.app.locals.users = users;
        req.app.locals.authenticated = true;
        res.redirect('/');
    }
    logout_setting(req, res) {
        req.app.locals.users = null;
        req.app.locals.authenticated = false;
        req.app.locals.admin = false;
        res.redirect('/');
    }
}

module.exports = new SiteController();
