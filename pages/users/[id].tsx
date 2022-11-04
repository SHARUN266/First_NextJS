import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
  export const getStaticPaths=async()=>{
    // Fetch data from external API
  const res = await fetch(`https://api.github.com/users`)
  const data = await res.json()
  const paths=data.map((elem:any)=>{
      return {
        params:{id:elem.id.toString()}
      }
  })
  return {
    paths,
    fallback:false
  }
  }
  export async function getStaticProps(context:any) {
     const id=context.params.id
    // Fetch data from external API
    const res = await fetch(`https://api.github.com/users/${id}`)
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
  }
  export default function SocialProfileWithImage({data}:any) {
    
    const router =useRouter()
    const {id}=router.query;
    console.log(data)
    
    return (
      <Center py={6}>
        <Box
          maxW={'270px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>
          <Image
            h={'120px'}
            w={'full'}
            src={
              'https://random.imagecdn.app/500/150'
            }
            objectFit={'cover'}
          />
          <Flex justify={'center'} mt={-12}>
            <Avatar
              size={'xl'}
              src={
                data.avatar_url

              }
             
              css={{
                border: '2px solid white',
              }}
            />
          </Flex>
  
          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
               {data.name}
              </Heading>
              <Text color={'gray.500'}>Frontend Developer</Text>
            </Stack>
  
            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{data.following}k</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Following
                </Text>
              </Stack>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{data.followers}k</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Followers
                </Text>
              </Stack>
            </Stack>
            <Link href="/">
            <Button
              w={'full'}
              mt={8}
              bg={useColorModeValue('#151f21', 'gray.900')}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}>
              Back
            </Button>
            </Link>
           
          </Box>
        </Box>
      </Center>
    );
  }
 
  