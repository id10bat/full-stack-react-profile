const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');

router.post('/signup', UserController.authSignUp);
router.post('/signin', UserController.authSignIn);
router.get('/onAuth', UserController.onAuth);
router.get('/logout', UserController.logOut);
router.get('/log_users', UserController.logUsers);
router.get('/user/id=:userId', UserController.personalUser);
router.get('/users/:userID', UserController.publicUser)
router.get('/users', UserController.publicUsers)
router.get('/img/:imgID', UserController.imgUser);
router.delete("/delete_log_users/:userId", UserController.deleteLogUser);


module.exports = router;