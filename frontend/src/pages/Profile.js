import React from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import UserBlog from '../component/Userblog';
import Blogfrom from '../component/Blogfrom'

const Profile = () => {

  return (

   <>
   <ChakraProvider>
      <Blogfrom/>
      <UserBlog/>

   </ChakraProvider>
   </>
  )
}

export default Profile