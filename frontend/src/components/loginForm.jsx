import React,{useState} from "react";
import {Box,Heading,Button,FormControl,FormLabel,Input,InputGroup,Text, InputRightElement, useToast, Flex} from "@chakra-ui/react"
import { ViewOffIcon,ViewIcon } from "@chakra-ui/icons";
import useStore from "../store/useStore";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

const Login = () => {
    const [showPassword, setShowpassword] = useState(false);
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });
    const toast = useToast();
    const {loggedInUser, setLoggedInUser} = useStore();
    const {accessToken, setAccessToken} = useStore();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleShowPassword = () => {
        // toggle show password state
        setShowpassword(!showPassword)
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }

    const validateLoginForm = () => {
        const newErrors = {};
    
        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else {
            const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!emailFormat.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }
        }
    
        // Validate password
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if(validateLoginForm()){
            const signInPromise = fetch('http://localhost:4000/api/users/login',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(res => {
                if(res.ok){
                    return res.json();
                } else {
                    throw new Error('Login failed. Please check your credentials.')
                }
            })
            .then((data) => {
                setLoggedInUser(data.user.name)
                setAccessToken(data.token)
                setFormData({
                    email:'',
                    password:''
                })
                navigate('/createBlog')
            })
    
            toast.promise(signInPromise, {
                loading: { 
                    title: 'Logging in...', 
                    description: 'Please wait while we log you in' 
                },
                success: { 
                    title: 'Login successful!', 
                    description: 'You have logged in successfully.', 
                },
                error: { 
                    title: 'Login failed', 
                    description: 'Invalid email or password' 
                },
            })
        }
    }

    return (
        <>  
            <Navbar />      
            <Box mt={{base:'5rem', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'11rem',xl: '14rem',dm: '15rem',xxl: ''}} width={{base:'', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'50vw',xl: '',dm: '40vw',xxl: ''}} ml={{base:'', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'20rem',xl: '22rem',dm: '35rem',xxl: '37rem'}} height={{base:'87vh', xxm: '',xm: '88vh',sm: '90vh',xmd: '',md: '92vh',slg: '94vh',lg:'60vh',xl: '53vh',dm: '50vh',xxl: ''}} p='3rem' bgColor='#e8f3fe' borderRadius='10px'>
                <form onSubmit={handleSubmit}>
                    <Heading textAlign='center' mt={{base:'-1rem', xxm: '1.5rem',xm: '3rem',sm: '5.5rem',xmd: '',md: '11rem',slg: '17rem',lg:'0rem',xl: '',dm: '2rem'}}>Login</Heading>

                    <FormControl mt='2rem'>
                    <FormLabel>Email</FormLabel>
                    <Input name='email' value={formData.email} onChange={handleInputChange} placeholder='email' focusBorderColor='#213576' borderColor='#BAB5B5'/>
                    {errors.email && <Text color="red.500">{errors.email}</Text>}
                    </FormControl>

                    <FormControl mt='2rem'>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input name='password' value={formData.password} onChange={handleInputChange}  placeholder='password' focusBorderColor='#213576' borderColor='#BAB5B5' type={showPassword ? 'text' : 'password'}/>
                        <InputRightElement onClick={handleShowPassword}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </InputRightElement>
                    </InputGroup>
                    {errors.password && <Text color="red.500">{errors.password}</Text>}
                    </FormControl>

                    <Flex mt={{base:'', xxm: '2rem',xm: '',sm: '',xmd: '3rem',md: '',slg: '',lg:'',xl: '',dm: '2.5rem',xxl: ''}} ml='0.5rem' width={{base:'170vw', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'',xl: '',dm: '',xxl: ''}}>
                    <Text mt='1rem' mr='0.5rem'>Don't have an account?</Text>
                    <Text mt='1rem' cursor='pointer' color='#004BA8' textDecoration='underline' onClick={() => navigate('/signUp')}>SignUp</Text>
                    <Button type='submit' colorScheme='#213576' bgColor='#213576' ml={{base:'-15rem', xxm: '-14.5rem',xm: '',sm: '',xmd: '12.7rem',md: '15rem',slg: '24rem',lg:'8rem',xl: '11.5rem',dm: '13.5rem',xxl: '15.5rem'}} mt={{base:'3.5rem', xxm: '',xm: '',sm: '',xmd: '0rem',md: '',slg: '',lg:'',xl: '',dm: '0.5rem',xxl: ''}} width={{base:'72vw', xxm: '',xm: '74.5vw',sm: '76vw',xmd: '30vw',md: '',slg: '',lg:'14vw',xl: '',dm: '10vw',xxl: ''}}> Sign in</Button>
                    </Flex>
                </form>
            </Box>
    </>
  )
}
export default Login