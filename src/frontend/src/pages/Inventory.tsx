import { useState } from "react";
import ItemsTable from "../components/ItemsTable";
import { items } from "../test-data";

export default function ItemsOverview(){
    const [rowData] = useState(items);

    return (
        <ItemsTable
            data={rowData}
            />
    )
}