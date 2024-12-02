import React from "react";
import Navbar from "./navbar";
import { useParams } from "react-router-dom";
import useStore from "../store/useStore";
import { Box,Heading,Image } from "@chakra-ui/react";
import DOMPurify from "dompurify"

const BlogDetails = () => {
    const {blogs} = useStore();
    const {title} = useParams();

    const selectedBlog = blogs.find(blog => {
        return blog.title.toLowerCase() === title.toLowerCase();
    });

    return (
        <>
        <Navbar />
        <Box>
            <Image src={selectedBlog.image} alt='coverImage' height={{base:'200px', xxm: '250px',xm: '',sm: '',xmd: '',md: '350px',slg: '500px',lg:'400px',xl: '',dm: '50vh',xxl: ''}} width={{base:'320px', xxm: '375px',xm: '397px',sm: '426px',xmd: '450px',md: '520px',slg: '700px',lg:'600px',xl: '',dm: '45vw',xxl: ''}} ml={{base:'', xxm: '',xm: '',sm: '',xmd: '9rem',md: '',slg: '10rem',lg:'20rem',xl: '25rem',dm: '30.5rem',xxl: '33rem'}} mt={{base:'5.4rem', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'',xl: '',dm: '8rem',xxl: '5.5rem'}}/>

            <Heading textAlign='center' mt='2rem' width={{base:'90vw', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'',xl: '85vw',dm: '',xxl: ''}} ml={{base:'1rem', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'3rem',xl: '5rem',dm: '6rem',xxl: '4.5rem'}}>{selectedBlog.title}</Heading>

            <Box
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(selectedBlog.content)
                }}
                ml={{base:'1.5rem', xxm: '',xm: '',sm: '',xmd: '2rem',md: '',slg: '',lg:'4rem',xl: '7rem',dm: '18rem',xxl: '19rem'}}
                mt='1rem'
                width={{base:'90vw', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'',xl: '84vw',dm: '66vw',xxl: ''}}
                mb='2rem'
            />
        </Box>
        </>
    )
}
export default BlogDetails;