const { requiresAuth } = require('express-openid-connect');
const Course = require('../models/Course');
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
        res.send(JSON.stringify(req.oidc.user));
    }
    // [GET] /login
    login(req, res) {
        res.oidc.login({ returnTo: '/login_setting' });
    }
    // logout(req, res) {
    //     res.send("Log out");
    // }
}

module.exports = new SiteController();
