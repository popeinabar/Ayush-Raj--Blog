import React from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BlogContextProvider } from './Context/BlogContext';
// import { AuthContextProvider } from './Context/AuthContext';
import BasicExample from './component/Nav';
import Signup from './pages/Signup';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthContext } from './hooks/useAuthContext';


function App() {
  const{user}=useAuthContext()
  return (
    <ChakraProvider>
      {/* <AuthContextProvider> */}
        <BlogContextProvider>
          <BrowserRouter>
            <BasicExample />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login"/>} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to='/'/>} />
              <Route path="/signup" element={!user ? <Signup />: <Navigate to='/'/>} />
            </Routes>
          </BrowserRouter>
        </BlogContextProvider>
      {/* </AuthContextProvider> */}
    </ChakraProvider>
  );
}

export default App;
