import Titlebar from './Titlebar'

type Props = {
	children: React.ReactNode
}

const Layout = ({ children }: Props) => {
	return (
		<>
			<Titlebar />
			<main>{children}</main>
		</>
	)
}
export default Layout
