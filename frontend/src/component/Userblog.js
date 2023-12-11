import React from 'react';
import { useBlogContext } from '../hooks/useBlogContext';
import UserblogComp from './UserblogComp';
import { useAuthContext } from '../hooks/useAuthContext';

const UserBlog = () => {
  const { blogs } = useBlogContext();
  const { user } = useAuthContext();
  const userId = user.user._id;
  
  console.log(userId)
  return (
    <>
   {blogs &&
      blogs.map((blog) => (
        
        blog.user_id === userId && <UserblogComp key={blog._id} blog={blog}  />
        ))}
   </>
  );
};

export default UserBlog;
