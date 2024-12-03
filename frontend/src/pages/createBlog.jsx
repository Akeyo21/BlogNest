import React,{useState, useCallback} from "react";
import { Box,Heading,FormControl,FormLabel,Input,Select,Text,Image,Button,Flex,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter,useDisclosure,useToast } from "@chakra-ui/react";
import {useDropzone} from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toolbarOptions from "../themes/quillToolbarOptions";
import Navbar from "../components/navbar";
import DOMPurify from "dompurify"
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
    const [formData, setFormData] = useState({
        title: '', 
        image: '', 
        category: '', 
        content: ''
    });
    const [imagePreview, setImagePreview] = useState(null)
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }

    const onDrop = useCallback(acceptedFiles => {
        // Set the selected image to display
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0]
            setFormData(prevData => ({
                ...prevData,
                image: file
            }));
            setImagePreview(URL.createObjectURL(file))
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

    const handleContentChange = (value) => {
        setFormData({
            ...formData,
            content: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('image', formData.image);
        data.append('content', formData.content);

        const postBlogPromise = fetch('https://blognest-tsf6.onrender.com/api/blogs',{
            method: 'POST',
            body: data,
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
                title: '', 
                image: null, 
                category: '', 
                content: ''
            });
            setTimeout(() => {
                navigate('/')
            },2000)
        })

        toast.promise(postBlogPromise, {
            loading: { 
                title: 'Submitting your blog...', 
                description: 'Please wait while we process your submission.' 
            },
            success: { 
                title: 'Blog posted successfully!', 
                description: 'Your blog has been published.', 
            },
            error: { 
                title: 'Submission failed.', 
                description: 'An error occurred while submitting your blog.' 
            },
        });
    };
    
    return (
        <>
        <Navbar />
        <Box p='2rem' width={{base:'', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'',xl: '89vw',dm: '79vw',xxl: '74vw'}} ml={{base:'', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'',xl: '4rem',dm: '15rem',xxl: ''}} mt='5rem'>
            <form onSubmit={handleSubmit}>
                <Heading textAlign='center' color='#213576'>Create a  New Blog Post</Heading>
                {/* <Flex mt='2rem'> */}
                    <FormControl isRequired mt='2rem' >
                        <FormLabel color='#213576'>Blog Title</FormLabel>
                        <Input name='title' value={formData.title} onChange={handleInputChange} placeholder='Title' focusBorderColor='#213576' textTransform='capitalize'/>
                    </FormControl>
                    <FormControl isRequired mt='2rem'>
                    <FormLabel color='#213576'>Category</FormLabel>
                    <Select name='category' value={formData.category} onChange={handleInputChange} placeholder='Select category' focusBorderColor='#213576'>
                        <option>Technology</option>
                        <option>Health & Wellness</option>
                        <option>Business & Finance</option>
                        <option>Travel</option>
                        <option>Education</option>
                        <option>Lifestyle</option>
                        <option>Entertainment</option>
                        <option>Food & Cooking</option>
                    </Select>
                    </FormControl>
                {/* </Flex> */}

                <FormControl isRequired mt='2rem'>
                    <FormLabel color='#213576'>Blog Cover Image</FormLabel>
                    <Box {...getRootProps()} border='2px dashed' borderColor='gray.300' p='2rem' borderRadius='10px' textAlign='center' cursor='pointer' mt='rem' bgColor='#e8f3fe'>
                        <Input {...getInputProps()} />
                        {
                            isDragActive ?
                            <Text>Drop the files here ...</Text> :
                            <Text>Drag 'n' drop some files here, or click to select files</Text>
                        }
                        {formData.image && (
                        <Box>
                            <Image src={imagePreview} alt="Selected Cover" boxSize="200px" objectFit="cover" borderRadius="md" ml='auto' mr='auto' mt='2rem'/>
                        </Box>
                        )}
                    </Box>
                </FormControl>
                <Box height='50vh'>
                    <FormControl isRequired mt='2rem'>
                        <FormLabel color='#213576'>Content</FormLabel>
                        <ReactQuill placeholder="Write your blog post here..." theme="snow" modules={{ toolbar: toolbarOptions }} 
                        value={formData.content} onChange={handleContentChange} style={{ height: "48vh" }} />
                    </FormControl>
                </Box>

                <Flex>
                    <Button onClick={onOpen} colorScheme='#5A647D' bgColor='#5A647D' mt={{base:'14rem', xxm: '',xm: '',sm: '',xmd: '8rem',md: '',slg: '',lg:'6rem',xl: '',dm: '5rem',xxl: ''}} width={{base:'55vw', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'20vw',xl: '',dm: '15vw',xxl: ''}} ml={{base:'', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'43rem',xl: '',dm: '41.3rem',xxl: '46rem'}}>Preview Blog</Button>
                    <Button type='submit' colorScheme='#213576' bgColor='#213576' mt={{base:'14rem', xxm: '',xm: '',sm: '',xmd: '8rem',md: '',slg: '',lg:'6rem',xl: '',dm: '5rem',xxl: ''}} width={{base:'55vw', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'20vw',xl: '',dm: '15vw',xxl: ''}} ml={{base:'1rem', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'',xl: '',dm: '3rem',xxl: ''}}>Publish Blog</Button>
                </Flex>
            </form>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <Image src={imagePreview} alt='coverImage'/>
                <ModalHeader>{formData.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Box
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(formData.content)
                    }}
                />
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose} colorScheme='#213576' bgColor='#213576'>Close</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
        </>
    )
}
export default CreateBlog;