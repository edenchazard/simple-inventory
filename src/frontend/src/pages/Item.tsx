import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useAPI, UserContext } from "../hooks";
import { Stock } from "../interfaces";
import AddAdjustmentForm from "../components/AddAdjustmentForm";
import ChartyBoy from "../components/ChartyBoy";

function sign(value: number): string{
    return (value > 0 ? "+"+value : ""+value)
}

function formatGMT(input: Date|string){
    //return new Date(input).toString();
    return new Date(input).toLocaleString('en-gb');
}

export default function Item(){
    const
        params = useParams(),
        id = parseInt(params.itemId),
        [stock, loaded, error]: [Stock, boolean, any] = useAPI(`/stock/${id}`),
        user = useContext(UserContext);

    if(loaded){
        return (
            <div>
                <section>
                    <h1>{stock.name}</h1>
                    <span>id#{stock.stockID} in the category '{stock.category.label}'</span>
                </section>
                {
                    user.permissions.canAddAdjustments &&
                    <AddAdjustmentForm
                        id={id}
                        onSuccessfulSubmit={() => alert('success')}
                        onError={() => alert('error') } />
                }
                <section>
                    <h3>Notes</h3>
                    {
                        stock.notes.map((note) => 
                            <div className="flex items-start">
                                <div className="mr-5">{note.date_time}</div>
                                <p>
                                    {note.description}
                                </p>
                            </div>
                        )
                    }
                </section>
                <section>
                    <h3>History</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Date Time</th>
                                <th>Agent</th>
                                <th>Quantity</th>
                                <th>Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                stock.changes.map((change, index) =>
                                    <tr key={index}>
                                        <td>{formatGMT(change.date_time)}</td>
                                        <td>{change.agent.first_name} {change.agent.last_name}</td>
                                        <td>{change.quantity}</td>
                                        <td>{sign(change.adjust)}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </section>
                <section>
                    <ChartyBoy stockID={id} />
                </section>
            </div>
        );
    }
    else{
        return <div>Loading...</div>;
    }
}