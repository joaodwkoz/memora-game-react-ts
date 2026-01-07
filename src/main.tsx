import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { Game } from './pages/Game';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>
    },
    {
        path: "daily",
        element: 
        <Game></Game>
    }
]);

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)