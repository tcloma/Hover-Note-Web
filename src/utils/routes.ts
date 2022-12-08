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

export default router