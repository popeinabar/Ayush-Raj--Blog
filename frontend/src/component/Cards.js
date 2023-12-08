import React from 'react';
import { Card, CardBody, CardFooter } from '@chakra-ui/react';

import { Image, Stack, Heading, Text, Button } from '@chakra-ui/react';

const Blog = ({ blog, handleExpand }) => {
  return (
    <div key={blog.id} style={{ margin: '20px' }} >
      <Card maxW='sm'>
        <CardBody>
          <div>

        <Image
         className='blog-image'
          src={blog.Image}
          alt='Green double couch with wooden legs'
          borderRadius='lg'
          style={{ objectFit:"contain"}}
        />
          </div>

          <Stack mt='6' spacing='3'>
        <Heading size='md'>{blog.title}</Heading>
        <Text>
          {blog.desc.length > 220 ? `${blog.desc.slice(0, 220)}...` : blog.desc}
        </Text>
      </Stack>

        </CardBody>
        <CardFooter>
          <Button variant='solid' colorScheme='blue' onClick={() => handleExpand(blog._id)}>
            Read More
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Blog;
