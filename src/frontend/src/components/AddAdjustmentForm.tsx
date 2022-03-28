import { useState } from "react";
import { fetchAPI } from "../functions";

export default function AddAdjustmentForm({id, onSuccessfulSubmit, onError }){
    const [adjust, setAdjust] = useState(0);
    
    function handleSubmit(e: React.FormEvent<HTMLInputElement>): void {
        // stop submit
        e.preventDefault();

        (async() =>{
            try{
                const response = await fetchAPI(`/stock/${id}/adjustments/add`, {
                    method: 'POST',
                    headers: {"Content-type": "application/json; charset=UTF-8"},
                    body: JSON.stringify({
                        adjustment: adjust
                    })
                });

                if(!response.ok){
                    onError();
                    return;
                }

                onSuccessfulSubmit();
            }
            catch(error){
                onError();
            }
        })();
    }
    
    return (
        <form method='POST'>
            <input
                className="text-black"
                type="number"
                value={adjust}
                onChange={(e) => setAdjust(parseInt(e.target.value))} />
            <input type='submit'
                onClick={handleSubmit}
                disabled={adjust === 0}
                value="add" />
        </form>
    );
};