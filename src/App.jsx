import HomePage from "./pages/homePage.jsx";
import NotFound from "./pages/not-found.jsx";
import LoginPage from "./pages/sign/loginPage.jsx";
import SignUpPage from "./pages/sign/signupPage.jsx";
import SearchPage from "./pages/searchPage.jsx";
import MovieCategoryPage from "./pages/movie/movieCategoryPage.jsx";
import MoviesPage from "./pages/movie/moviesPage_InfinityScroll.jsx";
import MoviePage from "./pages/movie/moviePage.jsx";

import RootLayout from "./layout/root-layout.jsx";
import Movieslayout from "./layout/movies-layout.jsx";

import "./App.css";
import "./font.css";

import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";
import ScrollToTop from "./scroll-to-top.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LogContextProvider } from "./context/logContext.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient()

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          <RootLayout />
        </>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "sign-up",
          element: <SignUpPage />,
        },
        {
          path: "search",
          element: <SearchPage />,
        },
        {
          path: "movie-category",
          element: <Movieslayout />,
          children: [
            {
              index: true,
              element: <MovieCategoryPage />,
            },
            {
              path: ":category",
              element: <MoviesPage />,
            },
          ],
        },
        {
          path: "moviePage/:movieId",
          element: <MoviePage />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <LogContextProvider>
        <RouterProvider router={router} />
      </LogContextProvider>

      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
