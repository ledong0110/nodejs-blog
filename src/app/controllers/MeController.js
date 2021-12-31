const Course = require('../models/Course');
const { multipleMongooseToObject, ...rest } = require('../../util/mongoose');

class MeController {
    //[GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    //[GET] /me/bin/courses
    binStored(req, res, next) {
        Course.findDeleted()
            .then((courses) =>
                res.render('me/bin', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
