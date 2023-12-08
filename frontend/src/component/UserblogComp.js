import React, { useState, useEffect, useRef } from 'react';
import { useBlogContext } from '../hooks/useBlogContext';
import { Button, Image, Input } from '@chakra-ui/react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Editable, EditableInput, EditablePreview, useEditableControls } from '@chakra-ui/react';
import { ButtonGroup, Flex, IconButton } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';

function UserblogComp({ blog }) {
  const { dispatch } = useBlogContext();
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [editedTitle, setEditedTitle] = useState(blog.title);
  const [editedDesc, setEditedDesc] = useState(blog.desc);
  const [ setUploadedImageUrl] = useState('');
  const [image, setImage] = useState(null);


  function EditableControls({ field }) {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

    const handleEditSubmit = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/blogs/${blog._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({ [field]: field === 'title' ? editedTitle : editedDesc }) // Adjust the payload as needed
        });

        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'UPDATE_BLOG', payload: json });
          console.log(`${field} edit successful`);
        } else {
          console.error(`${field} edit failed:`, json.message);
          // Handle error as needed
        }
      } catch (error) {
        console.error(`Error during ${field} edit:`, error);
        // Handle error as needed
      }
    };

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps({ onClick: handleEditSubmit })} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  const handleTitleChange = (value) => {
    setEditedTitle(value);
  };

  const handleDescChange = (value) => {
    setEditedDesc(value);
  };

  const handleTitleBlur = async () => {
    await handleEditSubmit('title', editedTitle);
  };

  const handleDescBlur = async () => {
    await handleEditSubmit('desc', editedDesc);
  };

  
  const imageInputRef = useRef(null);

  const handleEditImageClick = () => {
    imageInputRef.current.click();
  };
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    if (!image) return;

    const uploadImage = async () => {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'BlogRaj');
      data.append('cloud_name', 'dvk41mh9f');

      try {
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dvk41mh9f/image/upload',
          {
            method: 'POST',
            body: data,
          }
        );
        const result = await response.json();
        console.log("img data:", result)

        if (response.ok) {
          setUploadedImageUrl(result.url);
          console.log('Image upload successful');
          await handleEditSubmit('Image', result.url); // Update the image URL in your backend
        } else {
          console.error('Image upload failed:', result.message);
          // Handle error as needed
        }
      } catch (error) {
        console.error('Error during image upload:', error);
        // Handle error as needed
      }
    };

    uploadImage();

  }, [image]);

  const handleEditSubmit = async (field, value) => {
    try {
      const updatedData = { [field]: value };

      const response = await fetch(`http://localhost:4000/api/blogs/${blog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(updatedData)
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'UPDATE_BLOG', payload: json });
        console.log(`${field} edit successful`);
      } else {
        console.error(`${field} edit failed:`, json.message);
        // Handle error as needed
      }
    } catch (error) {
      console.error(`Error during ${field} edit:`, error);
      // Handle error as needed
    }
  }
  

  const handleClick = async () => {
    if (!user) {
      setError('You must be logged in');
      return;
    }

    const response = await fetch(`http://localhost:4000/api/blogs/${blog._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_BLOG', payload: json });
      console.log('Delete successful');
    } else {
      console.error('Delete failed:', json.message);
      // Handle error as needed
    }
  };

  return (
    <div>
      <div key={blog._id}>
    
       
        <Image
          // src={uploadedImageUrl}
          src={blog.Image}
          alt='Green double couch with wooden legs'
          borderRadius='lg'
          style={{ height: '229px', width: '333px',  objectFit: 'cover'}}
        />
        <Button colorScheme='blue' onClick={handleEditImageClick}>
          Edit Image
        </Button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={imageInputRef}
          style={{ display: 'none' }}
        />

        <Editable
          textAlign='center'
          defaultValue={blog.title}
          fontSize='2xl'
          isPreviewFocusable={false}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}  // Handle onBlur event for the title
        >
          <EditablePreview />
          <Input as={EditableInput} />
          <EditableControls field="title" />
        </Editable>

        <Editable
          textAlign='center'
          defaultValue={blog.desc}
          fontSize='2xl'
          isPreviewFocusable={false}
          onChange={handleDescChange}
          onBlur={handleDescBlur}  // Handle onBlur event for the description
        >
          <EditablePreview />
          <Input as={EditableInput} />
          <EditableControls field="desc" />
        </Editable>

        <Button colorScheme='blue' onClick={handleClick}>
          Delete
        </Button>
        <Button colorScheme='blue' onClick={() => { setEditedTitle(blog.title); setEditedDesc(blog.desc); }}>
          Complete Edit
        </Button>
      </div>
      {error && <div>{error}</div>}
    </div>
  );
}

export default UserblogComp;