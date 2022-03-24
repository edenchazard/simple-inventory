import ItemsTable from "../components/ItemsTable";
import { items } from "../test-data";

// todo
const stocks = items.filter(stock => stock.quantity < stock.min);

export default function Dashboard(){
    return (
        <section>
            <h1>Low stocks</h1>
            <ItemsTable
                data={stocks}
            />
        </section>
    );
}