// Hooks and dependencies
import React, { useEffect, useState } from 'react'
import { IDirData } from '../interfaces'
// Libraries and components
import { Flex, Button, Text, Wrap, WrapItem, border } from '@chakra-ui/react'
import BreadCrumbWrapper from '../components/BreadCrumbWrapper'
import Note from '../components/Note'
import { getNoteData } from '../api/notesApi'

type Props = {}

type NoteData = {
	id: number
	title: string
	content: string
}

const HomePage = ({}: Props) => {
	const uniqueObjArray = [1, 2, 3]
	const dirFolders = [1, 2, 3]
	const dirFiles = [1, 2]

	const [notes, setNotes] = useState<NoteData[]>([])

	useEffect(() => {
		getNoteData().then((data) => setNotes(data))
	}, [])

	const NoteCards = () => {
		return (
			<>
				{notes.map((item, index) => {
					return (
						<WrapItem key={item.id}>
							<Note id={item.id} title={item.title} content={item.content} />
						</WrapItem>
					)
				})}
			</>
		)
	}

	return (
		<>
			<BreadCrumbWrapper />
			<Flex
				minH='100vh'
				h='100%'
				justify='center'
				align='center'
				flexFlow='column'
				bg='gray.800'
				pt='150px'
			>
				<Wrap
					pos='fixed'
					top='90px'
					pl='1.5em'
					zIndex='overlay'
					pb='2'
					w='100%'
					bg='gray.800'
					boxShadow='md'
				>
					{[...new Set(dirFolders)].map((folder, index) => {
						return (
							<Button
								variant='outline'
								color='whiteAlpha.900'
								key={index + 1}
								_hover={{
									backgroundColor: 'teal.500',
									borderColor: 'teal.500',
								}}
							>
								{folder}
							</Button>
						)
					})}
				</Wrap>
				<Wrap p='1em' w='95%' spacing='5em' justify='center'>
					<NoteCards />
				</Wrap>
			</Flex>
		</>
	)
}

export default HomePage
