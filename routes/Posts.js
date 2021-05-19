const express = require('express');

const router = express.Router();
const isAuth = require('../middleware/isAuth');

const postController = require('../controllers/Posts');

router.get('/get-friends-post/:userId', isAuth, postController.getFriendsPost);
router.post('/store-mypost', isAuth, postController.storePost);
router.get('/myposts/:ID', isAuth, postController.myPosts);
router.post('/update-mypost-Details', isAuth, postController.updateMyPostDetails);
router.post('/remove-mypost', isAuth, postController.removeMypost);
router.get('/remove-all-mypost/:userId', isAuth, postController.removeMyPosts);

module.exports = router;
