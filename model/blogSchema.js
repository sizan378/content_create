const mongoose = require( 'mongoose');

const blogSchema = mongoose.Schema({
  title: {
    type: String, 
  },
  author:{
    type: String,
  },
  body: {
    type: String,
  },
  comments: [{ body: {type: String} , date: Date }],
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