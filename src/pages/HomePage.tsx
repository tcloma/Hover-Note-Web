// Hooks and dependencies
import React, { SetStateAction, Dispatch } from "react"
import { IDirData } from '../interfaces'
// Libraries and components
import { Flex, Button, Text, Wrap, WrapItem, border } from "@chakra-ui/react"
import BreadCrumbWrapper from "../components/BreadCrumbWrapper"
import Note from "../components/Note"

type Props = {
   dirName: string
   dirFiles: IDirData[],
   dirFolders: string[],
   setCurrentNoteId: Dispatch<SetStateAction<number>>,
   setDirName: Dispatch<SetStateAction<string>>,
   hasInitDir: boolean,
   processFiles: any,
   setDirFiles: any

}

const HomePage = ({ dirName, dirFiles, dirFolders, setCurrentNoteId, setDirName, hasInitDir, processFiles, setDirFiles }: Props) => {
   const splitDirName = hasInitDir ? dirName.split('/') : dirName.toString().split('\\')
   const directoryApi = window.electron.directoryApi

   const handleFolderButtonClick = (folder: string) => {
      const newDirName = [...splitDirName, folder].join('\\')
      directoryApi.setNewDirectory(newDirName)
      setDirName(newDirName)
   }

   const uniqueObjArray = [...new Map(dirFiles.map((item) => [item["name"], item])).values()];

   const NoteCards = () => {
      return (
         <>
            {uniqueObjArray.map((item, index) => {
               return (
                  <WrapItem key={item.id}>
                     <Note
                        id={item.id}
                        title={item.name}
                        content={item.content}
                        setCurrentNoteId={setCurrentNoteId}
                        setDirFiles={setDirFiles}
                        dirFiles={uniqueObjArray}
                     />
                  </WrapItem>
               )
            })}
         </>
      )
   }

   return (
      <>
         <BreadCrumbWrapper directory={dirName} setDirName={setDirName} hasInitDir={hasInitDir} processFiles={processFiles} setDirFiles={setDirFiles} dirFiles={dirFiles} />
         <Flex minH='100vh' h='100%' justify='center' align='center' flexFlow='column' bg='gray.800' pt='150px'>
            <Wrap pos='fixed' top='90px' pl='1.5em' zIndex='overlay' pb='2' w='100%' bg='gray.800' boxShadow='md'>
               {[... new Set(dirFolders)].map((folder, index) => {
                  return (
                     <Button variant='outline' color='whiteAlpha.900' key={index + 1}
                        _hover={{ 'backgroundColor': 'teal.500', 'borderColor': 'teal.500' }}
                        // _focus={{ 'backgroundColor': 'purple.500', 'borderColor': 'teal.500' }}
                        onClick={() => handleFolderButtonClick(folder)}
                     >
                        {folder}
                     </Button>
                  )
               })}
            </Wrap>
            {dirFiles.length === 0 ?
               <Text fontSize='5xl' color='whiteAlpha.900'> This directory has no supported files </Text>
               :
               <Wrap p='1em' w='95%' spacing='5em' justify='center'>
                  <NoteCards />
               </Wrap>
            }
         </Flex>
      </>
   )
}

export default HomePage