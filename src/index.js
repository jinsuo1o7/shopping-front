import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Cart from "./pages/Cart";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import ProductNew from "./pages/ProductNew";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: "/", element: <Home /> },
      { path: "/products", element: <ProductsPage /> },
      {
        path: "/products/new",
        element: (
          <ProtectedRoute requireAdmin>
            <ProductNew />
          </ProtectedRoute>
        ),
      },
      { path: "/products/:id", element: <ProductDetail /> },
      {
        path: "/carts",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
