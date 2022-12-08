import {
   Button,
   Flex,
   FormControl,
   Heading,
   Highlight,
   Input,
   Text,
} from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAwaitPoll } from '../functions';

type Props = {
   dirName: string;
   setDirName: Dispatch<SetStateAction<string>>;
   hasInitDir: boolean;
};

const LandingPage = ({ dirName, setDirName, hasInitDir }: Props) => {
   // Local state
   const [showDir, setShowDir] = useState<boolean>(false);

   // Shorthand definitions
   const navigate = useNavigate();
   // const dialogApi = window.electron.dialogApi

   const handleSubmit = (e: React.FormEvent): void => {
      e.preventDefault();
      navigate('/home');
   };

   const handleContinueClick = (): void => {
      setShowDir(!showDir);
      if (hasInitDir) {
         navigate('/home');
      }
   };

   const handleBrowseClick = (): void => {
      dialogApi.openDialog();
      useAwaitPoll(dialogApi.getPath, setDirName);
   };

   return (
      <Flex
         h='100vh'
         minW='60vw'
         justify='center'
         align='center'
         bg='gray.800'
         color='whiteAlpha.900'
      >
         <Flex direction='column' alignItems='center'>
            <Heading fontSize='7xl'>
               <Highlight query={['Hover']} styles={{ color: 'teal.300' }}>
                  Welcome to Hover
               </Highlight>
            </Heading>
            {showDir ? (
               <FormControl>
                  <Input
                     value={dirName}
                     onChange={(e) => setDirName(e.target.value)}
                     placeholder='Select a file directory: '
                     variant='flushed'
                     color='gray.400'
                     h='10vh'
                     fontSize='2xl'
                     mb='1em'
                  />
                  <Button
                     colorScheme='purple'
                     variant='solid'
                     onClick={handleBrowseClick}
                     w='48%'
                     h='8vh'
                     mr='4%'
                  >
                     Browse
                  </Button>
                  <Button
                     onClick={handleSubmit}
                     variant='outline'
                     colorScheme='purple'
                     w='48%'
                     h='8vh'
                  >
                     Confirm
                  </Button>
               </FormControl>
            ) : (
               <Text
                  color='gray.400'
                  onClick={handleContinueClick}
                  fontSize='xl'
               >
                  {' '}
                  Click to continue{' '}
               </Text>
            )}
         </Flex>
      </Flex>
   );
};

export default LandingPage;
