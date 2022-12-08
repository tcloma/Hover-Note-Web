// Hooks
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faPaperPlane,
   faWindowMaximize,
   faWindowRestore,
} from '@fortawesome/free-regular-svg-icons';
import {
   faWindowMinimize,
   faXmark,
   faBars,
} from '@fortawesome/free-solid-svg-icons';
import {
   Flex,
   HStack,
   Spacer,
   Button,
   Box,
   Drawer,
   DrawerOverlay,
   DrawerContent,
   DrawerHeader,
   DrawerBody,
   useDisclosure,
} from '@chakra-ui/react';

const Titlebar = () => {
   // Local state definitions
   const [windowMaximize, setWindowMaximize] = useState(true);

   // Local API definitions
   const navigate = useNavigate();
   // const titleBar = window.electron.titleBarApi

   return (
      <>
         <Flex
            h='50px'
            w='100%'
            bg='gray.900'
            color='whiteAlpha.900'
            align='center'
            pl='1em'
            pr='1em'
            pos='fixed'
            zIndex='sticky'
            sx={{
               WebkitUserSelect: 'none',
               WebkitAppRegion: 'drag',
            }}
         >
            <Box
               fontSize='xl'
               color='teal.100'
               sx={{ WebkitAppRegion: 'no-drag' }}
               _hover={{
                  color: 'teal.500',
                  fontSize: '2xl',
               }}
               transitionDuration='1s'
            >
               <FontAwesomeIcon icon={faPaperPlane} />
            </Box>
            <Spacer />
            <HStack h='100%' sx={{ WebkitAppRegion: 'no-drag' }}>
               <Button
                  onClick={() => console.log('btn')}
                  _hover={{ bg: 'gray.500' }}
                  variant='ghost'
                  title='Minimize'
               >
                  <FontAwesomeIcon icon={faWindowMinimize} />
               </Button>
               <Button
                  onClick={() => console.log('btn')}
                  _hover={{ bg: 'gray.500' }}
                  variant='ghost'
                  title={windowMaximize ? 'Restore' : 'Maximize'}
               >
                  {windowMaximize ? (
                     <FontAwesomeIcon icon={faWindowRestore} />
                  ) : (
                     <FontAwesomeIcon icon={faWindowMaximize} />
                  )}
               </Button>
               <Button
                  onClick={() => console.log('btn')}
                  _hover={{ bg: 'red.500' }}
                  variant='ghost'
                  title='Quit'
               >
                  <FontAwesomeIcon icon={faXmark} />
               </Button>
            </HStack>
         </Flex>
      </>
   );
};

export default Titlebar;
