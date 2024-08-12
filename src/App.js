import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu';
import RemiseDeCleForm from './components/RemiseDeCleForm';
import RemiseDeCleTable from './components/RemiseDeCleTable';

function App() {
    return (
        <div className="App">
            <Menu />
            <Routes>
                <Route path="/" element={<RemiseDeCleTable />} />
                <Route path="/create" element={<RemiseDeCleForm />} />
            </Routes>
        </div>
    );
}

export default App;
