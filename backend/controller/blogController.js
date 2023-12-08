const Blog=require('../modles/blogModel')
const mongoose = require("mongoose");



// get all blog
const getBlogs = async (req, res) => {
  // const user_id = req.user._id

    const blog = await Blog.find({}).sort({ createdAt: -1 });
    
    res.status(200).json(blog);
  }


// get a single blog
const getBlog = async (req, res) => {
    const{id}=req.params//question
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such blog" });
      }
const blog = await Blog.findById(id)
if(!blog){
    return res.status(404).json({error:'no such blog'})
}
    res.status(200).json(blog);
}


//create a new blog
const createBlog=async(req, res)=>{
    const{title, desc, Image}= req.body
    let emptyFields=[]
    if(!title){
      emptyFields.push('tile')
    }
    if(!desc){
      emptyFields.push('description')
    }
    if(!Image){
      emptyFields.push('image')
    }
    if(emptyFields.length>0){
      return res.status(400).json({error:'Please fill in all the details', emptyFields})
    }
    //add doc to db
      try{
        const user_id = req.user._id
        const blog= await Blog.create({title, desc, Image, user_id })
        res.status(200).json(blog)
      } 
      catch(error){
        res.status(400).json({error: error.message})
      }

}

//delete a blog
const deleteBlog= async (req, res) => {
    const{id}=req.params//question
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such blog" });
      }
      const blog= await Blog.findOneAndDelete({ _id: id})
      if(!blog){
        return res.status(404).json({error:'no such blog'})
    }
    res.status(200).json(blog)
}

//upatate a blog   
const updateBlog= async (req, res) => {
    const{id}=req.params//question
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such blog" });
      }
      const blog= await Blog.findOneAndUpdate({ _id: id},{
        ...req.body
      })
      if(!blog){
        return res.status(404).json({error:'no such blog'})
    }
    res.status(200).json(blog)
}

module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog
};