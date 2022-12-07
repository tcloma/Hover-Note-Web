// Hooks and types/interfaces
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { IDirData } from '../interfaces';
import { useAwaitPoll } from '../functions';
import { ChakraProvider } from '@chakra-ui/react'

// Components and pages
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import NotePage from '../pages/NotePage';
import StickyNote from '../pages/StickyNote';
import Layout from './Layout';

const App = () => {
   // Global state definitions
   const [dirName, setDirName] = useState<string>('')
   const [dirFiles, setDirFiles] = useState<IDirData[]>([])
   const [dirFolders, setDirFolders] = useState<Array<string[]>>([])
   const [currentNoteId, setCurrentNoteId] = useState<number>(0)
   const [hasInitDir, setHasInitDir] = useState<boolean>(false)
   const [initialRender, setInitialRender] = useState<boolean>(true)
   const [isStickyNote, setIsStickyNote] = useState<boolean>(false)
   const [previewNote, setPreviewNote] = useState<boolean>(true)
   const [windowId, setWindowId] = useState(0)
   const [windowName, setWindowName] = useState('')
   const [windowData, setWindowData] = useState('')
   // Create state for value of sticky note to be passed down to sticky note title

   // Shorthand definitions
   const filesApi = window.electron.filesApi
   const currentNote = dirFiles[0]?.find(file => file.id === currentNoteId)!
   const initialDirectory = filesApi.checkInitialDirectory()

   const processFiles = () => {
      console.log('caleld process')
      filesApi.processDirectory()
      useAwaitPoll(filesApi.getFiles, setDirFiles)
      useAwaitPoll(filesApi.getFolders, setDirFolders)
   }

   // Fetching data from Electron
   useEffect(() => {
      if (initialRender) {
         setInitialRender(false)
      } else {
         console.log('called')
         processFiles()
      }
   }, [dirName])

   useEffect(() => {
      if (initialDirectory) {
         setHasInitDir(true)
         setDirName(initialDirectory)
         processFiles()
      }
   }, [])

   // Files received from electron
   console.log('Directory Name: ', dirName)
   console.log('Directory Files: ', dirFiles[0])
   console.log('Directory Folders: ', dirFolders[0])

   return (
      <BrowserRouter>
         <ChakraProvider>
            <Layout
               stickyNote={isStickyNote}
               previewNote={previewNote}
               setPreviewNote={setPreviewNote}
               windowId={windowId}
               windowName={windowName}
               windowData={windowData}
            >
               <Routes>
                  <Route path='/' element={
                     <LandingPage
                        dirName={dirName}
                        hasInitDir={hasInitDir}
                        setDirName={setDirName}
                     />}
                  />
                  <Route path='/home' element={
                     <HomePage
                        dirName={dirName}
                        dirFiles={dirFiles[0]}
                        dirFolders={dirFolders[0]}
                        setDirName={setDirName}
                        setCurrentNoteId={setCurrentNoteId}
                        hasInitDir={hasInitDir}
                        processFiles={processFiles}
                        setDirFiles={setDirFiles}
                     />}
                  />
                  <Route path='/note/:id' element={
                     <NotePage
                        dirName={dirName}
                        noteData={currentNote}
                        setDirName={setDirName}
                        processFiles={processFiles}
                        setCurrentNoteId={setCurrentNoteId}
                     />}
                  />
                  <Route path='/sticky/:id' element={
                     <StickyNote
                        previewNote={previewNote}
                        isSticky={setIsStickyNote}
                        setWindowId={setWindowId}
                        setWindowName={setWindowName}
                        setWindowData={setWindowData}
                     />}
                  />
               </Routes>
            </Layout>
         </ChakraProvider>
      </BrowserRouter>
   );
}

export default App;