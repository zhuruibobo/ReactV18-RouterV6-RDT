import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { HashRouter, Routes, Route, Navigate} from 'react-router-dom';

import Login from '@/views/login'
import Layout from '@/components/layout'
import Dashboard from '@/views/dashboard';

import '@/styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index path="dashboard" element={<Dashboard/>}></Route>
      </Route>
      <Route path="login" element={<Login/>}></Route>
      <Route path="*" element={<Navigate to="/login" replace/>}></Route>
    </Routes>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
