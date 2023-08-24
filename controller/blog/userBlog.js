// internal imports
const userBlog = require('../../model/blogSchema')

async function userBlogSave(req, res, next) {
    let newBlog
    newBlog = new userBlog({
        ...req.body,
        author: req.user.id,
    })

    // save or error message send
    try {
        const blog = await newBlog.save()
        res.status(200).json({
            message: "blog saved successfully"
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function userBlogList(req, res, next) {
    try {
        const userBlogList = await userBlog.find({author: ObjectId(req.user.id)})
        res.status(200).json({userBlogList})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function allBlogList (req, res, next) {
    try {
        const blogList = await userBlog.find()
        res.status(200).json({blogList})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
module.exports = {userBlogSave, userBlogList, allBlogList}