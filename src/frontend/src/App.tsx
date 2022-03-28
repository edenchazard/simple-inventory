import { BrowserRouter } from "react-router-dom";
import { useAPI, UserContext } from './hooks';
import './App.css';
import { Header } from './components/ui/ui';
import Router from './components/Router';

export default function App() {
    const [user, loaded, error] = useAPI(`/user`);

    if(loaded){
        return (
            <div>
                <UserContext.Provider value={user}>
                    <BrowserRouter>
                        <Header user={user}/>
                        <main className='p-5'>
                            <Router />
                        </main>
                    </BrowserRouter>     
                </UserContext.Provider>
            </div>
        )
    }
    else{
        return <div>Loading...</div>;
    }
}