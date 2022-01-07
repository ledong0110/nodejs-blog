const Course = require('../models/Course');
const { multipleMongooseToObject, ...rest } = require('../../util/mongoose');

class MeController {
    //[GET] /me/stored/courses
    storedCourses(req, res, next) {
        new Promise((resolve, reject) => {
            if (req.app.locals.admin) {
                resolve();
            } else {
                reject();
            }
        })
            .then(() => {
                Promise.all([Course.find({}), Course.countDocumentsDeleted()])
                    .then(([courses, deletedCount]) =>
                        res.render('me/stored-courses', {
                            deletedCount,
                            courses: multipleMongooseToObject(courses),
                        }),
                    )
                    .catch(next);
            })
            .catch(() => {
                res.render('notfound');
            });
    }

    //[GET] /me/bin/courses
    binStored(req, res, next) {
        new Promise((resolve, reject) => {
            if (req.app.locals.admin) {
                resolve();
            } else {
                reject();
            }
        })
            .then(() => {
                Course.findDeleted()
                    .then((courses) =>
                        res.render('me/bin', {
                            courses: multipleMongooseToObject(courses),
                        }),
                    )
                    .catch(next);
            })
            .catch(() => {
                res.render('notfound');
            });
    }
}

module.exports = new MeController();
