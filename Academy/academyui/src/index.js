import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from "react-redux"
import { store } from './redux/store'
import routes from './routes';
import "./index.css";
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);