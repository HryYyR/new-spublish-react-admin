import './App.css';
import { Button } from 'antd'
import { BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom'

import { routers } from './route';

function App() {
  return (
    <RouterProvider router={routers}>
    </RouterProvider>
  );
}

export default App;
