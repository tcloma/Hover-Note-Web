// Hooks and types/interfaces
import {
	Routes,
	Route,
	BrowserRouter,
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { IDirData } from '../interfaces'
import { useAwaitPoll } from '../functions'
import { ChakraProvider } from '@chakra-ui/react'

// Components and pages
import LandingPage from '../pages/LandingPage'
import HomePage from '../pages/HomePage'
import NotePage from '../pages/NotePage'
import StickyNote from '../pages/StickyNote'
import Layout from './Layout'

const App = () => {
	// Global state definitions
	const [dirName, setDirName] = useState<string>('')
	const [dirFiles, setDirFiles] = useState<IDirData[]>([])
	const [dirFolders, setDirFolders] = useState<Array<string[]>>([])
	const [currentNoteId, setCurrentNoteId] = useState<number>(0)

	// Create state for value of sticky note to be passed down to sticky note title

	// Shorthand definitions
	const currentNote = dirFiles[0]?.find((file) => file.id === currentNoteId)!

	const router = createBrowserRouter([
		{
			path: '/',
			element: <LandingPage />,
		},
		{
			path: '/home',
			element: <HomePage />,
		},
		{
			path: '/note/:id',
			element: <NotePage />,
		},
	])

	return (
		<ChakraProvider resetCSS={true}>
			<Layout>
				<RouterProvider router={router} />
			</Layout>
		</ChakraProvider>
	)
}

export default App
