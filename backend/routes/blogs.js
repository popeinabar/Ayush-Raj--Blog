const express = require('express');
const{
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
}=require('../controller/blogController')

const requireAuth=require('../middleware/requireAuth')
const router = express.Router();

// Get all blogs
router.get('/', getBlogs);

router.use(requireAuth)


// Get a single blog by ID
router.get('/:id', getBlog);

// Post a new blog
router.post('/', createBlog);

// Delete a blog by ID
router.delete('/:id', deleteBlog);

// Update a blog by ID
router.put('/:id', updateBlog);



module.exports = router;
