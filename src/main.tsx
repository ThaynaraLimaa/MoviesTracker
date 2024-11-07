import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import NotFound from './pages/notFound/NotFound.tsx'
import Home from './pages/Home/Home.tsx'
import MovieForm from './pages/movieForm/MovieForm.tsx'
import MovieDetails from './pages/movieDetails/MovieDetails.tsx'
import EditMovie from './pages/movieForm/EditMovie.tsx'

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/addMovie', element: <MovieForm /> },
      { path: '/editMovie/:id', element: <EditMovie /> },
      { path: '/movie/:id', element: <MovieDetails /> }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
