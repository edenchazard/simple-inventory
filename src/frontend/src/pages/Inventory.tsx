import { useEffect, useState } from "react";
import { Api } from "../api";
import ItemsTable from "../components/ItemsTable";

export default function ItemsOverview(){
    const [stocks, setStocks] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.fetchStocks();
                let json = await response.json();
                setStocks(json);
                setLoaded(true);
                console.log(json);
            }
            catch (error) {
                console.log("error", error);
            }
        };
    
        fetchData();
    }, []);

    if(loaded){
        return (
            <ItemsTable data={stocks} />
        )
    }
    else{
        return <div>Loading...</div>;
    }
}