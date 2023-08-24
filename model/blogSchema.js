const mongoose = require( 'mongoose');

const blogSchema = mongoose.Schema({
  title: {
    type: String, 
    required: true,
    trim: true
  },
  author:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  body: {
    type: String,
    required: true,
  },
  comments: [{ user_id: {type: String}, user_name: {type: String}, body: {type: String} , date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  },

},
{
    timestamps: true,
});


const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;