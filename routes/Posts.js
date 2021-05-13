const express = require('express');
const router = express.Router();

const postController = require("../controllers/Posts");

router.get('/get-friends-post/:userId' , postController.getFriendsPost);
router.post('/store-mypost',postController.storePost);
router.get('/myposts/:ID', postController.myPosts);
router.post('/update-mypost-Details', postController.updateMyPostDetails);
router.post('/remove-mypost',postController.removeMypost);
router.get("/remove-all-mypost/:userId" , postController.removeMyPosts);

router.get('/',(req,res) => {
    User.find({})
    .then(response => {
        res.json({
            response
        })
    })
});

module.exports = router;