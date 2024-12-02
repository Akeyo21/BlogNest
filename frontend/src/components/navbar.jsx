import React from "react";
import { Box,Flex,Heading,Avatar,Button, Divider,Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

const Navbar = () => {
    const navigate = useNavigate();
    const {loggedInUser} = useStore();

    return (
        <>
        <Box display='flex' justifyContent='space-between' p='1rem' mt='' zIndex='100' position='fixed' top='0' left='0' right='0' bgColor='white'>
            <Heading color='#213576' ml={{base:'-0.9rem', xxm: '-0.5rem',xm: '-rem',sm: '',xmd: '0.5rem',md: '',slg: '',lg:'',xl: '5rem',dm: '15.5rem',xxl: '16rem'}} onClick={() => navigate('/')} cursor='pointer' >BlogNest</Heading>
            <Flex mr='16rem'>
                <Button mr='5rem' mt='0.3rem' bgColor='#213576' colorScheme='#213576' color='white' onClick={() => navigate('/createBlog')} ml={{base:'3.6rem', xxm: '4rem',xm: '5.8rem',sm: '7.3rem',xmd: '11.5rem',md: '14.5rem',slg: '26rem',lg:'43rem',xl: '',dm: '51rem',xxl: ''}}>Create Blog</Button>

                <Box display={{base:'none', xxm: '',xm: '',sm: '',xmd: 'flex',md: '',slg: '',lg:'',xl: '',dm: '',xxl: ''}}>
                <Text color='#254E70' mr='5rem' mt='0.8rem' cursor='pointer' onClick={() => navigate('/login')}>Login</Text>
                <Avatar name={loggedInUser}/>
                </Box>
            </Flex>
        </Box>
        <Divider borderColor='#BAB5B5' mt='5rem' position='fixed' top='0' left='0' right='0'/>
        </>
    )
}
export default Navbar;