import {
	Button,
	Flex,
	FormControl,
	Heading,
	Highlight,
	Input,
	Text,
} from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAwaitPoll } from '../functions'

type Props = {}

const LandingPage = () => {
	// Local state
	const [showDir, setShowDir] = useState<boolean>(false)

	// Shorthand definitions
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
							w='48%'
							h='8vh'
							mr='4%'
						>
							Browse
						</Button>
						<Link to={'/home'}>
							<Button variant='outline' colorScheme='purple' w='48%' h='8vh'>
								Confirm
							</Button>
						</Link>
					</FormControl>
				) : (
					<Text color='gray.400' onClick={() => setShowDir(true)} fontSize='xl'>
						Click to continue
					</Text>
				)}
			</Flex>
		</Flex>
	)
}

export default LandingPage
