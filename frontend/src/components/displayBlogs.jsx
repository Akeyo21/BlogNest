import React,{useState,useEffect} from "react";
import { Box,Text, Card, CardBody, CardFooter,Image,Stack,Heading,Button, Divider,Menu,MenuButton,MenuList,MenuItem,} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify"
import useStore from "../store/useStore";
import { ChevronDownIcon } from "@chakra-ui/icons";

const DisplayBlogs = () => {
    const { blogs, setBlogs} = useStore(); 
    const [category, setCategory] = useState('')

    useEffect(() => {
      // fetch('http://localhost:4000/api/blogs')
      fetch('https://blognest-tsf6.onrender.com/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data))
    },[])

    const filteredBlog = category === 'All Categories' ? blogs : blogs.filter((blog) => blog.category === category)
    
    return (
        <>
        <Box display={{base:'block', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'flex',xl: '',dm: '',xxl: ''}} mt='6rem'>
            <Box ml={{base:'', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'1.5rem',xl: '5.5rem',dm: '14rem',xxl: '16.5rem'}} bgColor='#e8f3fe' height='90vh' width={{base:'', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'',xl: '',dm: '15vw',xxl: ''}} p='1rem' borderRadius='10px' position='fixed' display={{base:'none', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'block',xl: '',dm: '',xxl: ''}}>
              <Heading textAlign='center' mt={{slg: '',lg:'',xl: '1rem',dm: '1rem',xxl: ''}}>Categories</Heading>
                <Divider borderColor='#BAB5B5' mt={{slg: '',lg:'0.5rem',xl: '',dm: '2rem',xxl: ''}}/>
                <Text color='#213576' ml='2rem' mt={{slg: '',lg:'1rem',xl: '2rem',dm: '2rem',xxl: ''}} onClick={() => setCategory('All Categories')} cursor='pointer'>All Categories</Text>
                <Divider borderColor='#BAB5B5' mt='1.5rem'/>
                <Text ml='2rem' mt={{slg: '',lg:'1rem',xl: '1.5rem',dm: '2rem',xxl: ''}} onClick={() => setCategory('Technology')} cursor='pointer'>Technology</Text>
                <Divider borderColor='#BAB5B5' mt='1.5rem'/>
                <Text ml='2rem' mt={{slg: '',lg:'1rem',xl: '1.5rem',dm: '2rem',xxl: ''}} onClick={() => setCategory('Health & Wellness')} cursor='pointer'>Health & Wellness</Text>
                <Divider borderColor='#BAB5B5' mt='1.5rem'/>
                <Text ml='2rem' mt={{slg: '',lg:'1rem',xl: '1.5rem',dm: '2rem',xxl: ''}} onClick={() => setCategory('Business & Finance')} cursor='pointer'>Business & Finance</Text>
                <Divider borderColor='#BAB5B5' mt='1.5rem'/>
                <Text ml='2rem' mt={{slg: '',lg:'1rem',xl: '1.5rem',dm: '2rem',xxl: ''}} onClick={() => setCategory('Travel')} cursor='pointer'>Travel</Text>
                <Divider borderColor='#BAB5B5' mt='1.5rem'/>
                <Text ml='2rem' mt={{slg: '',lg:'1rem',xl: '1.5rem',dm: '2rem',xxl: ''}} onClick={() => setCategory('Education')} cursor='pointer'>Education</Text>
                <Divider borderColor='#BAB5B5' mt='1.5rem'/>
                <Text ml='2rem' mt={{slg: '',lg:'1rem',xl: '1.5rem',dm: '2rem',xxl: ''}} onClick={() => setCategory('Lifestyle')} cursor='pointer'>Lifestyle</Text>
                <Divider borderColor='#BAB5B5' mt='1.5rem'/>
                <Text ml='2rem' mt={{slg: '',lg:'1rem',xl: '1.5rem',dm: '2rem',xxl: ''}} onClick={() => setCategory('Entertainment')} cursor='pointer'>Entertainment</Text>
                <Divider borderColor='#BAB5B5' mt='1.5rem'/>
                <Text ml='2rem' mt={{slg: '',lg:'1rem',xl: '1.5rem',dm: '2rem',xxl: ''}} onClick={() => setCategory('Food & Cooking')} cursor='pointer'>Food & Cooking</Text>
                <Divider borderColor='#BAB5B5' mt='1.5rem'/>
            </Box>

            {/* mobile menu for categories */}
            <Box  display={{base:'block', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'none',xl:'',dm:'',xxl:''}} ml='0.2rem' mb='1rem'>
            <Menu mt='10rem'>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width='50vw' bgColor='#e8f3fe'>Categories</MenuButton>
              <MenuList>
                <MenuItem color='#213576' mt='2rem' onClick={() => setCategory('All Categories')} cursor='pointer'>All Categories</MenuItem>
                <Divider borderColor='#BAB5B5' mt='1rem'/>
                <MenuItem mt='2rem' onClick={() => setCategory('Technology')} cursor='pointer'>Technology</MenuItem>
                <Divider borderColor='#BAB5B5' mt='1rem'/>
                <MenuItem mt='2rem' onClick={() => setCategory('Health & Wellness')} cursor='pointer'>Health & Wellness</MenuItem>
                <Divider borderColor='#BAB5B5' mt='1rem'/>
                <MenuItem mt='2rem' onClick={() => setCategory('Business & Finance')} cursor='pointer'>Business & Finance</MenuItem>
                <Divider borderColor='#BAB5B5' mt='1rem'/>
                <MenuItem mt='2rem' onClick={() => setCategory('Travel')} cursor='pointer'>Travel</MenuItem>
                <Divider borderColor='#BAB5B5' mt='1rem'/>
                <MenuItem mt='2rem' onClick={() => setCategory('Education')} cursor='pointer'>Education</MenuItem>
                <Divider borderColor='#BAB5B5' mt='1rem'/>
                <MenuItem mt='2rem' onClick={() => setCategory('Lifestyle')} cursor='pointer'>Lifestyle</MenuItem>
                <Divider borderColor='#BAB5B5' mt='1rem'/>
                <MenuItem mt='2rem' onClick={() => setCategory('Entertainment')} cursor='pointer'>Entertainment</MenuItem>
                <Divider borderColor='#BAB5B5' mt='1rem'/>
                <MenuItem mt='2rem' onClick={() => setCategory('Food & Cooking')} cursor='pointer'>Food & Cooking</MenuItem>
              </MenuList>
            </Menu>
            </Box>

            {(!filteredBlog || filteredBlog.length === 0) ? ( // all blogs
              <Box ml={{base:'', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'18rem',xl: '22.5rem',dm: '39.5rem',xxl: '39.5rem'}} >
                  {blogs.map((blog) => {
                    return <Card
                      direction={{base:'column', xxm: '',xm: '',sm: '',xmd: 'row',md: '',slg: '',lg:'',xl: '',dm: '',xxl: ''}}
                      overflow='hidden'
                      variant='outline'
                      key={blog.title}
                      mb='2rem'
                      width={{base:'', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'60rem',xl: '',dm: '',xxl: '63rem'}}
                      borderColor='#C4CBCA'
                    >
                      <Image
                        objectFit='cover'
                        // maxW={{ base: '100%', sm: '200px' }}
                        width={{base:'320px', xxm: '375px',xm: '397px',sm: '426px',xmd: '250px',md: '300px',slg: '',lg:'250px',xl: '',dm: '300px',xxl: ''}}
                        height={{base:'200px', xxm: '250px',xm: '',sm: '',xmd: '270px',md: '355px',slg: '',lg:'327px',xl: '',dm: '328px',xxl: ''}}
                        src={blog.image}
                        alt={blog.title}
                      />
                    
                      <Stack>
                        <CardBody>
                          <Heading size='lg' width={{base:'90vw', xxm: '',xm: '',sm: '',xmd: '60vw',md: '',slg: '',lg:'52vw',xl: '45vw',dm: '',xxl: '35vw'}}>{blog.title}</Heading>
                          
                          <Box
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(blog.content.length > 250 ? `${blog.content.slice(0, 250)} <span style="color: blue;">...</span>` : blog.content),
                            }}
                            mt='1.5rem'
                            width={{base:'90vw', xxm: '',xm: '',sm: '',xmd: '60vw',md: '',slg: '',lg:'53vw',xl: '45vw',dm: 'vw',xxl: '35vw'}}
                            display={{base:'none', xxm: '',xm: '',sm: '',xmd: '',md: 'block',slg: '',lg:'',xl: '',dm: '',xxl: ''}}
                          />
                        </CardBody>
                    
                        <CardFooter>
                          <Link to={`/blogDetails/${blog.title}`}>
                          <Button variant='solid' bgColor='#213576' colorScheme='#213576' mt='-1.5rem'>
                            Read more
                          </Button>
                          </Link>
                        </CardFooter>
                      </Stack>
                    </Card>
                  })}
              </Box>
              ) : (     //filtered blogs
              <Box ml={{base:'', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'18rem',xl: '22.5rem',dm: '39.5rem',xxl: '39.5rem'}}>
                  {filteredBlog.map((blog) => {
                    return <Card
                      direction={{base:'column', xxm: '',xm: '',sm: '',xmd: 'row',md: '',slg: '',lg:'',xl: '',dm: '',xxl: ''}}
                      overflow='hidden'
                      variant='outline'
                      key={blog.title}
                      mb='2rem'
                      width={{base:'', xxm: '',xm: '',sm: '',xmd: '',md: '',slg: '',lg:'60rem',xl: '',dm: '58rem',xxl: '64rem'}}
                    >
                      <Image
                        objectFit='cover'
                        // maxW={{ base: '100%', sm: '200px' }}
                        width={{base:'320px', xxm: '375px',xm: '397px',sm: '426px',xmd: '250px',md: '300px',slg: '',lg:'250px',xl: '',dm: '300px',xxl: ''}}
                        height={{base:'200px', xxm: '250px',xm: '',sm: '',xmd: '270px',md: '355px',slg: '',lg:'327px',xl: '',dm: '300px',xxl: '328px'}}
                        src={blog.image}
                        alt={blog.title}
                      />
                    
                      <Stack>
                        <CardBody>
                          <Heading size='lg' width={{base:'90vw', xxm: '',xm: '',sm: '',xmd: '60vw',md: '',slg: '',lg:'52vw',xl: '45vw',dm: '',xxl: '35vw'}}>{blog.title}</Heading>
                          
                          <Box
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(blog.content.length > 250 ? `${blog.content.slice(0, 250)} <span style="color: blue;">...</span>` : blog.content),
                            }}
                            mt='1.5rem'
                            width={{base:'90vw', xxm: '',xm: '',sm: '',xmd: '60vw',md: '',slg: '',lg:'53vw',xl: '45vw',dm: '',xxl: '35vw'}}
                            display={{base:'none', xxm: '',xm: '',sm: '',xmd: '',md: 'block',slg: '',lg:'',xl: '',dm: '',xxl: ''}}
                          />
                        </CardBody>
                    
                        <CardFooter>
                          <Link to={`/blogDetails/${blog.title}`}>
                          <Button variant='solid' bgColor='#213576' colorScheme='#213576' mt='-1.5rem'>
                            Read more
                          </Button>
                          </Link>
                        </CardFooter>
                      </Stack>
                    </Card>
                  })}
              </Box>
              )} 
        </Box>
        </>
    )
}
export default DisplayBlogs