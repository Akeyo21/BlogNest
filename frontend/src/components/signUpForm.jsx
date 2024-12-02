import React,{useState,useEffect} from "react";
import {Box,Heading,Button,FormControl,FormLabel,Input,InputGroup,Text, InputRightElement, useToast} from "@chakra-ui/react"
import { ViewOffIcon,ViewIcon } from "@chakra-ui/icons";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [showPassword, setShowpassword] = useState(false);
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:''
    });
    const toast = useToast();
    const navigate = useNavigate();
    const [existingEmails,setExistingEmails] = useState([]);   
    const [names,setNames] = useState([]);     
    const [errors,setErrors] = useState({}); 
    
    useEffect(() => {
        fetch('http://localhost:4000/api/users')
        .then(resp => resp.json())
        .then(data => {
            const emails = data.map((user) => user.email)
            const username = data.map((user) => user.name)
            setExistingEmails(emails)
            setNames(username)
        })
    },[])

    const handleShowPassword = () => {
        // toggle show password state
        setShowpassword(!showPassword)
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
        setErrors('')
    }

     //form validation
     const validateForm = () => {
        const newErrors = {}

        //username exists and empty
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (names.includes(formData.name)) {
            newErrors.name = 'Username already exists';
        }

        // email format,exists and empty
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else {
            const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!emailFormat.test(formData.email)) {
                newErrors.email = "Please enter a valid email address";
            } else if (existingEmails.includes(formData.email)) {
                newErrors.email = 'Email already exists';
            }
        }

        // password conatins 8 characters,atleast 1 letter, atleast 1 number,and empty
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else {
            const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!passwordFormat.test(formData.password)) {
                newErrors.password = 'Password must be at least 8 characters long and contain at least 1 letter and 1 number';
            }
        }

        setErrors(newErrors);

         // return true if there are no errors
         return Object.keys(newErrors).length === 0;
    }
        

    const handleSubmit = (e) => {
        e.preventDefault();

        if(validateForm()){
            const signUpPromise = fetch('http://localhost:4000/api/users/register',{
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(res => {
                if(res.ok){
                    return res.json();
                } else {
                    throw new Error('Failed to post blog')
                }
            })
            .then(() => {
                setFormData({
                    name:'',
                    email:'',
                    password:''
                });
                navigate('/login')
            })

            toast.promise(signUpPromise, {
                loading: { 
                    title: 'Registering the user...', 
                    description: 'Please wait while we register the user' 
                },
                success: { 
                    title: 'Registration successful!', 
                    description: 'Your account has been created successfully.', 
                },
                error: { 
                    title: 'Registration failed', 
                    description: 'An error occurred. Please try again.' 
                },
            })
        }
    }

    return (
        <>
            <Navbar />
            <Box p='3rem' bgColor='#e8f3fe' borderRadius='10px' mt={{base:'5rem', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'10rem',xl: '14rem',dm: '15rem',xxl: ''}} width={{base:'', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'50vw',xl: '',dm: '40vw',xxl: ''}} ml={{base:'', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'20rem',xl: '22rem',dm: '35rem',xxl: '37rem'}} height={{base:'105vh', xxm: '87vh',xm: '88vh',sm: '90vh',xmd: '',md: '92vh',slg: '94vh',lg:'67vh',xl: '57vh',dm: '55vh',xxl: ''}}>
                <form onSubmit={handleSubmit}>
                    <Heading textAlign='center' mt={{base:'', xxm: '',xm: '2rem',sm: '3rem',xmd: '',md: '11rem',slg: '17rem',lg:'0rem',xl: '',dm: '1rem',xxl: ''}}>Sign Up</Heading>

                    <FormControl mt='2rem'>
                    <FormLabel>Full name</FormLabel>
                    <Input name='name' value={formData.name} onChange={handleInputChange} placeholder='full name' focusBorderColor='#213576' borderColor='#BAB5B5'/>
                    {errors.name && <Text color='red.500'>{errors.name}</Text>}
                    </FormControl>

                    <FormControl mt='1.5rem'>
                    <FormLabel>Email</FormLabel>
                    <Input name='email' value={formData.email} onChange={handleInputChange} placeholder='email' focusBorderColor='#213576' borderColor='#BAB5B5'/>
                    {errors.email && <Text color='red.500'>{errors.email}</Text>}
                    </FormControl>

                    <FormControl mt='1.5rem'>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input name='password' value={formData.password} onChange={handleInputChange} placeholder='password' focusBorderColor='#213576' borderColor='#BAB5B5' type={showPassword ? 'text' : 'password'}/>
                        <InputRightElement onClick={handleShowPassword}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </InputRightElement>
                    </InputGroup>
                    {errors.password && <Text color='red.500'>{errors.password}</Text>}
                    </FormControl>

                    <Button type='submit' colorScheme='#213576' bgColor='#213576' mt='2rem' ml={{base:'rem', xxm: '',xm: '',sm: '',xmd: '27.5rem',md: '30rem',slg: '39rem',lg:'10rem',xl: '12rem',dm: '28.5rem',xxl: '30rem'}} width={{base:'72vw', xxm: '73vw',xm: '75.5vw',sm: '77vw',xmd: '30vw',md: '',slg: '',lg:'',xl: '',dm: '10vw',xxl: ''}}>Sign up</Button>
                </form>
            </Box>
    </>
  )
}
export default SignUp;