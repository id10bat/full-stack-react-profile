const mongose = require('mongoose');
const bcrypt = require('bcrypt');
const os = require('os')
const fs = require('fs');
const url = require('url')

const User = require('../models/user');
const Log = require('../models/log');
const IDB = require('../../indexedDB/index');
const Personal = require('../models/personal')
const Public = require('../models/public')
const Response = require('../common/response');

// img path
// var img  = require ('../../../client/img/user.jpg')

var imgPath = `C:/Users/my_nu/Project/workshop/simple-react-full-stack/src/client/img/user.jpg`

exports.authSignUp = (req, res, next) => {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("passwords dont match");
        return next(err);
    }

    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {


        User.find({ email: req.body.email })
            .exec()
            .then(user => {
                if (user.length >= 1) {

                    Response.CONFLICT('Invalid registered CONFLICT ', res);
                } else {

                    // return res.redirect('/');
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            Response.INTERNAL_SERVER_ERROR(err.message, res)
                        }
                        const user = new User({
                            email: req.body.email,
                            username: req.body.username,
                            password: hash,
                            passwordConf: req.body.passwordConf,
                            img_profile: [{ img: { data: fs.readFileSync(imgPath), contentType: 'image/png' } }],
                            head_story: "ทดสอบเว็บไซต์",
                            story: "ตอนนี้อยู่ในขั้นตอนการสร้าง และ อับ เดต ไม่สามารใช้งานเว็บไซ์ได้อย่างเต็มที่ ",
                            content_about: "ยินดีตอนรับ เข้าสู่เว็บไซต์ของฉัน"

                        })
                        user
                            .save()
                            .then(result => {
                                req.session.userId = user._id;
                                console.log(result);

                                Response.CREATED('User CREATED successfully!', req, res, result)
                            })
                            .catch(err => {
                                // console.log(err);
                                Response.INTERNAL_SERVER_ERROR(err.message, res)
                            });

                        Log.create({
                            hostname: os.hostname(),
                            startTime: new Date(),
                            startTimeLocal: new Date(),
                            userID: user._id,
                            pid: process.pid,
                            data: {
                                name: user.username,
                                email: user.email,
                                img: `http://${req.host}:3000/api/img/${user._id}`
                            }
                        }, function (err, doc) { })

                        Personal.create({
                            startTime: new Date(),
                            startTimeLocal: new Date(),
                            userID: user._id,
                            pid: process.pid,
                            name: user.username,
                            email: user.email,
                            img: `http://${req.host}:3000/api/img/${user._id}`,
                            head_story: user.head_story,
                            story: user.story,
                            content_about: user.content_about,
                        }, function (err, doc) { })

                        Public.create({
                            startTime: new Date(),
                            startTimeLocal: new Date(),
                            userID: user._id,
                            pid: process.pid,
                            name: user.username,
                            email: user.email,
                            img: `http://${req.host}:3000/api/img/${user._id}`,
                            head_story: user.head_story,
                            story: user.story,
                            content_about: user.content_about,
                        }, function (err, doc) { })

                    })
                }
            });


    }

}

exports.authSignIn = (req, res, next) => {
    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
                Response.UNAUTHORIZED(error.message, res)
            } else {
                req.session.userId = user._id;
                Log.find({ userID: user._id })
                    .exec()
                    .then(log => {
                        if (log.length >= 1) {

                        } else {
                            Log.create({
                                hostname: os.hostname(),
                                startTime: new Date(),
                                startTimeLocal: new Date(),
                                userID: user._id,
                                pid: process.pid,
                                data: {
                                    name: user.username,
                                    email: user.email,
                                    img: `http://${req.host}:3000/api/img/${user._id}`
                                }
                            }, function (err, doc) { })

                            Personal.create({
                                startTime: new Date(),
                                startTimeLocal: new Date(),
                                userID: user._id,
                                pid: process.pid,
                                name: user.username,
                                email: user.email,
                                img: `http://${req.host}:3000/api/img/${user._id}`,
                                head_story: user.head_story,
                                story: user.story,
                                content_about: user.content_about,
                            }, function (err, doc) { })

                        }
                    })

                Response.LOGIN_OK('User loggedin successfully!', req, res, user);
            }
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }

}

exports.onAuth = (req, res, next) => {
    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    Response.UNAUTHORIZED('You are not logged in', res);
                    console.log(user);
                } else {
                    Response.CHECK_ON_OK('User loggedin successfully!', req, res, user)
                    console.log(user);
                }
            }
        });
}

exports.imgUser = (req, res, next) => {
    User.findById({ _id: req.params.imgID },
        function (err, doc) {
            if (err) return next(err);
            res.contentType(doc.img_profile[0].img.contentType);
            res.send(doc.img_profile[0].img.data);
        }
    )

}

exports.logOut = (req, res, next) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                // return next(err);
                Response.UNAUTHORIZED('You are not delete in', res);
            } else {
                DELETE_OK("Delete successfully!", req, res)
                // return res.redirect('/');
            }
        });
    }
}

exports.deleteLogUser = (req, res, next) => {
    Log.remove({ _id: req.params.userId })
        .exec()
        .then(log => {
            Response.DELETE_OK('Delet successfully!', req, res, log)
        })
        .catch(err => {
            console.log(err);
            Response.INTERNAL_SERVER_ERROR(err.message, res)
        });
};

exports.logUsers = (req, res, next) => {
    Log.find({ hostname: os.hostname() })
        .exec(function (error, log) {
            if (error) {
                return next(error);
            } else {
                if (log === null) {
                    Response.UNAUTHORIZED('You are not logged in', res);
                    console.log(log);
                } else {
                    Response.LOG_USER_OK('log loggedin successfully!', req, res, log)
                    console.log(log);
                }
            }
        });
}

exports.personalUser = (req, res, next) => {
    Personal.find({ userID: req.session.userId })
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    Response.UNAUTHORIZED('You are not Personal in', res);
                    console.log(user);
                } else {
                    Response.USER_PERSONAL_OK('Personal loggedin successfully!', req, res, user)
                    console.log(user);
                }
            }
        });
}

exports.publicUser = (req, res, next) => {
    Public.find({ userID: req.params.userID })
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    Response.UNAUTHORIZED('You are not Public in', res);
                    console.log(user);
                } else {
                    Response.USER_PUBLIC_OK('Public loggedin successfully!', req, res, user)
                    console.log(user);
                }
            }
        });
}

exports.publicUsers = (req, res, next) => {
    Public.find(req.body.userID )
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    Response.UNAUTHORIZED('You are not Public in', res);
                    console.log(user);
                } else {
                    Response.USERS_PUBLIC_OK('Public loggedin successfully!', req, res, user)
                    console.log(user);
                }
            }
        });
}