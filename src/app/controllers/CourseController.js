const Course = require('../models/Course');
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class CourseController {
    //[GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }
    //[GET] /course/create
    create(req, res, next) {
        if (req.app.locals.admin) res.render('courses/create');
        else res.render('notfound');
    }

    //[POST] /course/store
    store(req, res, next) {
        new Promise((resolve, reject) => {
            if (req.app.locals.admin) {
                resolve();
            } else {
                reject();
            }
        })
            .then(() => {
                req.body.image = `https://img.youtube.com/vi/${req.body.idV}/sddefault.jpg`;
                const course = new Course(req.body);
                course
                    .save()
                    .then(() => res.redirect(`/me/stored/courses`))
                    .catch((error) => {});
            })
            .catch(() => {
                res.render('notfound');
            });
    }

    //[GET] /course/:id/edit
    edit(req, res, next) {
        new Promise((resolve, reject) => {
            if (req.app.locals.admin) {
                resolve();
            } else {
                reject();
            }
        })
            .then(() => {
                Course.findById(req.params.id)
                    .then((course) =>
                        res.render('courses/edit', {
                            course: mongooseToObject(course),
                        }),
                    )
                    .catch(next);
            })
            .catch(() => {
                res.render('notfound');
            });
    }
    //[PUT] /course/:id
    update(req, res, next) {
        new Promise((resolve, reject) => {
            if (req.app.locals.admin) {
                resolve();
            } else {
                reject();
            }
        })
            .then(() => {
                Course.updateOne({ _id: req.params.id }, req.body)
                    .then(() => res.redirect('/me/stored/courses'))
                    .catch(next);
            })
            .catch(() => {
                res.render('notfound');
            });
    }

    //[DELETE]  /course/:id
    destroy(req, res, next) {
        new Promise((resolve, reject) => {
            if (req.app.locals.admin) {
                resolve();
            } else {
                reject();
            }
        })
            .then(() => {
                Course.delete({ _id: req.params.id })
                    .then(() => res.redirect('back'))
                    .catch(next);
            })
            .catch(() => {
                res.render('notfound');
            });
    }
    //[DELETE]  /course/:id/force
    forceDestroy(req, res, next) {
        new Promise((resolve, reject) => {
            if (req.app.locals.admin) {
                resolve();
            } else {
                reject();
            }
        })
            .then(() => {
                Course.deleteOne({ _id: req.params.id })
                    .then(() => res.redirect('back'))
                    .catch(next);
            })
            .catch(() => {
                res.render('notfound');
            });
    }

    //[PATCH]  /course/:id/restore
    restore(req, res, next) {
        new Promise((resolve, reject) => {
            if (req.app.locals.admin) {
                resolve();
            } else {
                reject();
            }
        })
            .then(() => {
                Course.restore({ _id: req.params.id })
                    .then(() => res.redirect('back'))
                    .catch(next);
            })
            .catch(() => {
                res.render('notfound');
            });
    }
}

module.exports = new CourseController();
