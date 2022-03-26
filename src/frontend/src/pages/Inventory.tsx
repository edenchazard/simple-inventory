import ItemsTable from "../components/ItemsTable";
import { useAPI } from "../hooks";

export default function ItemsOverview(){
    const [stocks, loaded, error] = useAPI("/stocks");

    if(loaded){
        return (
            <ItemsTable data={stocks} />
        )
    }
    else{
        return <div>Loading...</div>;
    }
}