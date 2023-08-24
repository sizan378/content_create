// external imports
const express = require('express');
const router = express.Router();

// internal imports
const tokenValidate = require('../../utils/tokenValidate')
const { blogValidation, userBlog } = require('../../middleware/blog/blogValidate')
const {userBlogSave, userBlogList, allBlogList} = require('../../controller/blog/userBlog')
const userComment = require('../../controller/blog/userComments')



router.use(tokenValidate)
router.get('/', allBlogList).post('/', blogValidation, userBlog, userBlogSave)
router.post('/comments/:id/', userComment)
router.get('/user-blog-list/', userBlogList)



module.exports = router