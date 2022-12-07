import React, { useRef, useState } from 'react'
import { Button, HStack, useToast, useDisclosure, useDisclosure as useMe, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, FormControl, Box, Input } from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faCopy, faTrash, faPlus, faPaperPlane, faStar } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'


type Props = {
   name: string | undefined,
   editorValue: string | undefined,
   isHome: boolean,
   processFiles: any,
   directory: string,
   setDirName: any,
   noteId: number,
   setCurrentNoteId: any,
   setDirFiles: any,
   dirFiles: any
}

const Toolbar = ({ name, editorValue, isHome, processFiles, directory, setDirName, setCurrentNoteId, noteId, setDirFiles, dirFiles }: Props) => {
   const [formValue, setFormValue] = useState('')
   const initialRef = React.useRef(null)
   const finalRef = React.useRef(null)
   const navigate = useNavigate()
   const toast = useToast()

   const splitDirName = name ? [...directory.split('\\'), name] : directory.split('\\')
   const { isOpen, onOpen, onClose } = useDisclosure()
   const { isOpen: openMe, onOpen: imOpen, onClose: closeMe } = useMe()

   const directoryApi = window.electron.directoryApi
   const filesApi = window.electron.filesApi
   const windowAPi = window.electron.windowApi

   const handleDeleteClick = () => {
      filesApi.deleteFile(name)
      const breadCrumbBreakPoint = splitDirName.slice(0, splitDirName.indexOf(name)).join('\\')
      console.log('New dir: ', breadCrumbBreakPoint)
      directoryApi.setNewDirectory(breadCrumbBreakPoint)
      setDirName(breadCrumbBreakPoint)
      processFiles()
      navigate('/home')
      toast({
         position: 'bottom-right',
         status: 'warning',
         title: 'File deleted',
         isClosable: true
      })
   }

   const handleNewFileClick = () => {
      filesApi.createFile(formValue)
      setDirFiles([[...dirFiles, {
         id: dirFiles.length + 1,
         name: `${formValue}.md`,
         content: '# Hello File!'
      }]])
      closeMe()
      toast({
         position: 'bottom-right',
         status: 'success',
         title: 'File created!',
         isClosable: true
      })
   }

   const handleWriteFile = () => {
      filesApi.writeFile(name, editorValue)
      toast({
         position: 'bottom-right',
         status: 'success',
         title: 'File saved.',
         isClosable: true
      })
   }

   const handlePopupClick = () => {
      windowAPi.newWindow(noteId)
   }

   return (
      <>
         {/* Delete Modal */}
         <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent bgColor='gray.800' color='whiteAlpha.900'>
               <ModalHeader>Confirm Deletion</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  Are you sure you want to delete the file?
               </ModalBody>

               <ModalFooter>
                  <Button onClick={handleDeleteClick} colorScheme='red' mr={3} >
                     Delete
                  </Button>
                  <Button onClick={onClose} variant='ghost' >
                     Cancel
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
         {/* New file modal */}
         <Modal
            isOpen={openMe}
            onClose={closeMe}
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isCentered
         >
            <ModalOverlay />
            <ModalContent bgColor='gray.800' color='whiteAlpha.900'>
               <ModalHeader>Create a new file</ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                  <FormControl>
                     <Input
                        value={formValue}
                        onChange={(e) => setFormValue(e.target.value)}
                        variant='flushed'
                        ref={initialRef}
                        placeholder='File name'
                     />
                  </FormControl>
               </ModalBody>

               <ModalFooter>
                  <Button onClick={handleNewFileClick} colorScheme='purple' mr={3}>
                     Save
                  </Button>
                  <Button onClick={closeMe} _hover={{ 'color': 'teal' }} variant='ghost'>
                     Cancel
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
         <HStack
            top='50px' right='0'
            pos='fixed' zIndex='overlay'
            color='whiteAlpha.900'
         >
            {isHome ?
               <Box borderRadius='full' backgroundColor='teal.500'>
                  <Button onClick={imOpen} _hover={{ 'backgroundColor': 'whiteAlpha.900', color: 'teal' }} variant='ghost' fontSize='3xl'>
                     <FontAwesomeIcon icon={faPlus} />
                  </Button>
               </Box>

               :
               <>
                  <Button onClick={handlePopupClick} _hover={{ 'backgroundColor': 'teal.500' }} variant='ghost' title='hover'>
                     <FontAwesomeIcon icon={faPaperPlane} />
                  </Button>
                  <Button onClick={handleWriteFile} _hover={{ 'backgroundColor': 'teal.500' }} variant='ghost' title='save' >
                     <FontAwesomeIcon icon={faSave} />
                  </Button>
                  <Button onClick={onOpen} _hover={{ 'backgroundColor': 'red.500' }} variant='ghost' title='delete'>
                     <FontAwesomeIcon icon={faTrash} />
                  </Button>
               </>
            }
         </HStack>
      </>
   )
}

export default Toolbar