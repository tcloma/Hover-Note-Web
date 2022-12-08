// Hooks
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Dependencies / libraries
import MarkdownPreview from '@uiw/react-markdown-preview'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faPlus,
	faEllipsisVertical,
	faCopy,
	faTrash,
	faRemoveFormat,
	faRedo,
	faStar,
	faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'
import {
	Box,
	Button,
	Code,
	Container,
	Divider,
	Flex,
	Spacer,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	IconButton,
	useToast,
	Modal,
	ModalOverlay,
	ModalHeader,
	ModalBody,
	ModalContent,
	ModalCloseButton,
	FormControl,
	Input,
	ModalFooter,
	useDisclosure,
} from '@chakra-ui/react'

type Props = {
	id: number
	title: string
	content: string
}

const Note = ({ id, title, content }: Props) => {
	// Local references
	const [formValue, setFormValue] = useState<string>('')
	const initialRef = React.useRef(null)
	const finalRef = React.useRef(null)

	// Shorthand definitions
	const { isOpen, onOpen, onClose } = useDisclosure()
	const toast = useToast()

	return (
		<Container
			h='25vw'
			w='25vw'
			pos='relative'
			border='3px'
			borderColor='gray.500'
			borderStyle='solid'
			borderRadius='lg'
			overflow='scroll'
		>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
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
						<Button colorScheme='purple' mr={3}>
							Save
						</Button>
						<Button
							variant='ghost'
							_hover={{ color: 'teal' }}
							onClick={onClose}
						>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Flex
				pos='sticky'
				backgroundColor='gray.800'
				top='-1em'
				pt='1em'
				pb='.1em'
				zIndex='docked'
				align='center'
			>
				<Code
					maxW='70%'
					color='whiteAlpha.900'
					backgroundColor='purple.500'
					fontSize='xl'
					noOfLines={1}
					_hover={{ noOfLines: 'max' }}
					transitionDuration='2s'
				>
					{' '}
					{title}
				</Code>
				<Spacer />
				<Button
					variant='ghost'
					color='whiteAlpha.900'
					fontSize='xl'
					minW='2.5vw'
					_hover={{ color: 'teal.400', backgroundColor: 'gray.900' }}
					_active={{ backgroundColor: 'gray.700' }}
				>
					<FontAwesomeIcon icon={faPaperPlane} />
				</Button>
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label='Options'
						icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
						variant='ghost'
						color='whiteAlpha.900'
						minW='2.5vw'
						_hover={{ color: 'teal.500', backgroundColor: 'gray.900' }}
						_active={{ color: 'teal.500', backgroundColor: 'gray.900' }}
					/>
					<MenuList
						backgroundColor='gray.800'
						color='whiteAlpha.900'
						border='2px'
						borderColor='teal.200'
					>
						<MenuItem
							_focus={{ backgroundColor: 'gray.700' }}
							_hover={{ backgroundColor: 'gray.700' }}
							icon={<FontAwesomeIcon icon={faRedo} />}
							onClick={onOpen}
						>
							Rename
						</MenuItem>
						<MenuItem
							_focus={{ backgroundColor: 'red.700' }}
							_hover={{ backgroundColor: 'red.700' }}
							icon={<FontAwesomeIcon icon={faTrash} />}
						>
							Delete
						</MenuItem>
					</MenuList>
				</Menu>
			</Flex>

			<Box pos='sticky' top='2.5em' zIndex='docked'>
				<Divider />
			</Box>
			<Box pt='1.5em' pl='1' pr='1' onClick={() => notePageRoute()}>
				<MarkdownPreview
					source={content}
					style={{
						backgroundColor: 'transparent',
						height: '100%',
					}}
					rehypeRewrite={(node, index, parent) => {
						if (
							node.tagName === 'a' &&
							parent &&
							/^h(1|2|3|4|5|6)/.test(parent.tagName)
						) {
							parent.children = [parent.children[1]]
						}
					}}
				/>
			</Box>
		</Container>
	)
}

export default Note
