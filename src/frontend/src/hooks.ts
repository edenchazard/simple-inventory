import { useEffect, useState } from "react";

const base = "/api";

export function useAPI(endpoint: string){
    const [data, setData] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() =>{
        (async () =>{
            try {
                const response = await fetch(base + endpoint);
                const json = await response.json();
                console.log(json);
                setData(json);
                setLoaded(true);
            }
            catch (error) {
                setError(true);
            }
        })();
    }, [endpoint]);

    return [data, loaded, error];
}