const router = require('express').Router();
const auth = require('../middleware/auth');
const usersController = require('../controllers/userController');

//sử dụng middleware để tiền xử lý
//middleware ở đây là auth: có nhiệm vụ xác thực người dùng đã đăng nhập hay chưa
router.get('/search', auth, usersController.searchUser);

router.get('/user/:id', auth, usersController.getUser);

router.patch('/user', auth, usersController.updateUser);

router.patch('/user/:id/follow', auth, usersController.follow);

router.patch('/user/:id/unfollow', auth, usersController.unfollow);

module.exports = router;