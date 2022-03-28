import { useEffect, useState, createContext } from "react";
import { fetchAPI } from "./functions";
import { LoggedInUser } from "./interfaces";

export function useAPI(endpoint: string): [any, boolean, any]{
    const [data, setData] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() =>{
        (async () =>{
            try {
                const response = await fetchAPI(endpoint);
                if(!response.ok){
                    setError("non 200 OK response received.");
                    return;
                }
                const json = await response.json();
                console.log(json);
                setData(json);
                setLoaded(true);
            }
            catch (error) {
                setError("error");
            }
        })();
    }, [endpoint]);

    return [data, loaded, error];
}

export const UserContext = createContext<LoggedInUser>(null); // todo change default
