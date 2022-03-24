import './App.css';
import { useState } from 'react';
import { BrowserRouter } from "react-router-dom";

// components
import { Header } from './components/ui/ui';
import Router from './components/Router';

import { user } from './test-data';


export default function App() {
    const [loggedIn] = useState(user);

    return (
        <div>
            <BrowserRouter>
                <Header user={loggedIn}/>
                <main className='p-5'>
                    <Router />
                </main>
            </BrowserRouter>
        </div>
    );
}