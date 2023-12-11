import React, { useState, useEffect } from 'react';
import { Button,Image } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { useBlogContext } from '../hooks/useBlogContext';
import { useAuthContext } from '../hooks/useAuthContext';
import '../pages/Profile.css'
import { Textarea } from '@chakra-ui/react';


function BlogForm() {
  const { dispatch } = useBlogContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState(null);
  const [ emptyFields,setEmptyFields] = useState([]);
  const [image, setImage] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const handleImageChange = (event) => {
    setImage([...event.target.files]);
  };

  useEffect(() => {
    if (image.length < 1) return; 

    const uploadImage = async () => {
      const data = new FormData();
      data.append('file', image[0]);
      data.append('upload_preset', 'BlogRaj');
      data.append('cloud_name', 'dvk41mh9f');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dvk41mh9f/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );
      const result = await response.json();

      setUploadedImageUrl(result.url);
    };

    uploadImage();
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const blog = { title, desc, Image: uploadedImageUrl };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs`, {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setTitle('');
      setDesc('');
      setError(null);
      setEmptyFields([]);
      setImage([]);
      setUploadedImageUrl('');
      console.log('New blog created', json);
      dispatch({ type: 'CREATE_BLOG', payload: json });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>

          <div className='input-form'>
            <div className='uplode-image-div'>
              <div className='uplode-image'>
            <label className="addPage-label">
              Blog image:
              <input
                type="file"
                required="required"
                className="addPage-input1"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            </div>
            {uploadedImageUrl && (
              <div className='image-prv'>
                {/* <img width={80} height={80} src={uploadedImageUrl} alt="" /> */}
                <Image
                src={uploadedImageUrl}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
                style={{ height: '229px', width: '333px', objectFit:'cover' }}
              />
              </div>

            )}
            

              </div>
              
              <div style={{ width: '100%'}}>
              <div className='uplode-text'>
                <div className='uplode-title'>

                <h3>
                  <Input
                    required="required"
                    variant="filled"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    wrap="soft"
                  />
                </h3>
                </div>
                <div className='uplode-desc'>

                <Textarea
                  required="required"
                  variant="outline"
                  placeholder="Blog description"
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                  resize="none"
                />

                </div>

              </div>
        
              <div className='uplode-btn'>
                
                <Button colorScheme="blue" type="submit">
                  Submit
                </Button>
              </div>
        </div>
        </div>
        {error && <div>{error}</div>}
      </form>
    </>
  );
}

export default BlogForm;
