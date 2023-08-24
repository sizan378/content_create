const Blog = require('../../model/blogSchema')

async function userComment(req, res, next) {
    try {
        const comment = req.body.body

        const commentSave = await Blog.findById({_id: req.params.id})
        if (!commentSave) {
            res.status(404).json({message: "blog doesn't exist"})
        } else {
            comment_data = {
                user_id: req.user.id,
                user_name: req.user.username,
                body: comment
            }
            commentSave.comments.push(comment_data)
            await commentSave.save()
            res.status(200).json({
                message: "Comment saved successfully"
            })
        }
    } catch (error) {
        res.status(500).json({message: "Error saving comment"})
    }
}

module.exports = userComment