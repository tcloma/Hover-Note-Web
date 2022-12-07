// Hooks and interfaces
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IDirData } from '../interfaces'
// Libraries
import MarkdownPreview from '@uiw/react-markdown-preview';
import MarkdownEditor from '../components/MarkdownEditor';
import { Box, Divider, Flex } from '@chakra-ui/react';
import BreadCrumbWrapper from '../components/BreadCrumbWrapper';

type Props = {
   noteData: IDirData,
   dirName: string,
   setDirName: Dispatch<SetStateAction<string>>,
   processFiles(): any,
   setCurrentNoteId: Dispatch<SetStateAction<number>>,
}

const NotePage = ({ noteData = { id: 1, name: 'test', content: 'test' }, dirName, setDirName, processFiles, setCurrentNoteId }: Props) => {
   const [editorValue, setEditorValue] = useState<string>('# Hello!')
   const { id, name, content } = noteData

   useEffect(() => {
      setEditorValue(content)
   }, [])

   return (
      <>
         <BreadCrumbWrapper
            directory={dirName}
            noteName={name}
            setDirName={setDirName}
            processFiles={processFiles}
            name={name}
            editorValue={editorValue}
            setCurrentNoteId={setCurrentNoteId}
            noteId={id}
         />
         <Flex minH='100vh' h='fit-content' justify='center' gap='1em' align='flex-start' bgColor='gray.800' pt='100px'>
            <Box w='50%' fontSize='1.5em'>
               <MarkdownEditor
                  value={editorValue}
                  onChange={setEditorValue}
               />
            </Box>
            <Divider orientation='vertical' h='container.md' />
            <Box w='45%' pl='1em' pt='1em'>
               <MarkdownPreview
                  source={editorValue}
                  style={{
                     backgroundColor: 'transparent',
                     height: '100%',
                     fontSize: '16px'
                  }}
               />
            </Box>
         </Flex>
      </>
   )
}

export default NotePage