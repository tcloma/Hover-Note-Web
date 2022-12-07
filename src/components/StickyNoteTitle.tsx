// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPencil, faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from 'react';
import { Flex, Spacer, HStack, Button, Heading, useToast, Box } from "@chakra-ui/react";

type Props = {
   previewNote: boolean,
   setPreviewNote: Dispatch<SetStateAction<boolean>>,
   windowId: number | undefined,
   windowName: string,
   windowData: string,
}

const StickyNoteTitle = ({ previewNote, setPreviewNote, windowId, windowName, windowData }: Props) => {
   const titleBar = window.electron.titleBarApi
   const filesApi = window.electron.filesApi

   const toast = useToast()

   console.log(windowData)

   return (
      <Flex
         h='40px' w='100%'
         bg='gray.900' color='whiteAlpha.900'
         align='center' pl='1em' pr='1em'
         pos='fixed' zIndex='sticky'
         sx={{
            'WebkitUserSelect': 'none',
            'WebkitAppRegion': 'drag',
         }}
      >
         <Heading fontSize='lg' color='teal.400'> {windowName}</Heading>
         <Spacer />
         <HStack>
            <Button
               onClick={() => {
                  setPreviewNote(!previewNote)
                  if (!previewNote) {
                     filesApi.writeFile(windowName, windowData)
                     toast({
                        position: 'bottom-right',
                        status: 'success',
                        isClosable: true,
                        render: () => (
                           <Box
                              backgroundColor='green.300'
                              color='whiteAlpha.900'
                              p='.5em'
                              fontSize='lg'
                              w='10vw'
                              textAlign='center'
                              borderRadius='lg'
                              ml='70vw'
                           >
                              <FontAwesomeIcon icon={faCheckCircle} />
                           </Box>
                        )
                     })
                  }
               }}
               _hover={{ bg: 'gray.500' }}
               variant='ghost'
               title={previewNote ? 'Edit' : 'Confirm'}
               sx={{
                  'WebkitAppRegion': 'no-drag'
               }}
            >
               {previewNote ?
                  <FontAwesomeIcon icon={faPencil} />
                  :
                  <FontAwesomeIcon icon={faCheck} />
               }
            </Button>
            <Button
               onClick={() => titleBar.quit(windowId)}
               _hover={{ bg: 'red.500' }}
               variant='ghost'
               title='Quit'
               sx={{
                  'WebkitAppRegion': 'no-drag'
               }}
            >
               <FontAwesomeIcon icon={faXmark} />
            </Button>
         </HStack>
      </Flex>
   )
}

export default StickyNoteTitle