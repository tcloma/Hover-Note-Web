// Hooks and interfaces
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAwaitPoll } from '../functions'
import { IDirData } from '../interfaces'

// Dependencies
import MarkdownEditor from '../components/MarkdownEditor';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { Box, Flex } from '@chakra-ui/react';


type Props = {
   isSticky: Dispatch<SetStateAction<boolean>>,
   previewNote: boolean,
   setWindowId: Dispatch<SetStateAction<number>>
   setWindowName: Dispatch<SetStateAction<string>>,
   setWindowData: any
}

interface INoteData {
   winId: number,
   data: IDirData
}

const StickyNote = ({ isSticky, previewNote, setWindowId, setWindowName, setWindowData }: Props) => {
   // Local state
   // const defaultObj = { winId: 1, content: { id: 1, name: 'Loading', content: 'Loading...' } }
   const [editorValue, setEditorValue] = useState('# Hello!')
   const [noteData, setNoteData] = useState<INoteData>()

   // Shorthand definitions
   const stickyNoteApi = window.electron.stickyNoteApi
   isSticky(true)

   useEffect(() => {
      stickyNoteApi.initData()
      useAwaitPoll(stickyNoteApi.getChildData, setNoteData)
   }, [])

   useEffect(() => {
      setWindowId(noteData?.winId)
      setWindowName(noteData?.data?.name)
      setEditorValue(noteData?.data?.content)
   }, [noteData])

   useEffect(() => {
      setWindowData(editorValue)
   }, [editorValue])

   return (
      <Flex minH='100vh' h='fit-content' justify='center' w='100vw' pt='50px' bg='gray.800'>
         {previewNote ?
            <MarkdownPreview
               source={editorValue}
               style={{
                  backgroundColor: 'transparent',
                  height: '100%',
                  width: '85%',
                  fontSize: '1em',
               }}
               rehypeRewrite={(node, index, parent) => {
                  if (node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
                     parent.children = [parent.children[1]];
                  }
               }}
            />
            :
            <Box w='90%' fontSize='lg'>
               <MarkdownEditor
                  value={editorValue}
                  onChange={setEditorValue}
               />
            </Box>

         }
      </Flex>
   )
}

export default StickyNote