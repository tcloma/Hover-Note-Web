import React, { Dispatch, SetStateAction } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Toolbar from '../components/Toolbar'

type Props = {}

// Make a reference to page to conditionally render stlying and tooblar

const splitDirName = ['a', 'b', 'c']

const BreadCrumbWrapper = ({}: Props) => {
	return (
		<>
			<Breadcrumb
				spacing='8px'
				w='100%'
				p='10px'
				bgColor='gray.800'
				color='whiteAlpha.900'
				zIndex='overlay'
				pos='fixed'
				top='50px'
				left='1em'
				separator={<FontAwesomeIcon icon={faChevronRight} />}
			>
				{splitDirName.map((name, index) => {
					const lastItem = index + 1 === splitDirName.length
					const lastDir = index + 1 === splitDirName.length - 1
					return (
						<BreadcrumbItem key={index + 1}>
							<BreadcrumbLink
								href='#'
								color={lastItem ? 'teal.300' : 'whiteAlpha.900'}
							>
								{name}
							</BreadcrumbLink>
						</BreadcrumbItem>
					)
				})}
			</Breadcrumb>
			<Toolbar />
		</>
	)
}

export default BreadCrumbWrapper
