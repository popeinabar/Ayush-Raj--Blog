import React, { useState } from 'react';
import {
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {login, errors, isLoading }= useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await login(email, password)
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Stack spacing={4}>
      <form className='login' onSubmit={handleSubmit}>
        <h3>login</h3>
        <Input
          placeholder='Enter Email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <InputRightElement width='4.5rem'>
            <Button
              h='1.75rem'
              size='sm'
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button disabled={isLoading} colorScheme='blue' type='submit'>
          Login
        </Button>
        {errors && <div>{errors}</div>}
      </form>
    </Stack>
  );
};

export default Login;
